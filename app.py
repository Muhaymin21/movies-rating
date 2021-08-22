import sys

from flask import Flask, jsonify, request, abort
from flask_migrate import Migrate
from werkzeug.exceptions import NotFound

from auth import AuthError, requires_auth
from db_models import *

app = Flask(__name__, static_folder='build/', static_url_path='/')
app.config.from_object('config')
db.init_app(app)
migrate = Migrate(app, db)


def paginate(page, selection, movies_per_page):
    start = (page - 1) * movies_per_page
    end = start + movies_per_page
    movies = [movie.format_output() for movie in selection]
    return movies[start:end]


@app.route('/api/movies')
def get_movies():
    query = Movie.query.order_by(Movie.id)
    movies_per_page = request.args.get("perPage", 3, type=int)
    movies = paginate(request.args.get('page', 1, type=int), query.all(), movies_per_page)
    return jsonify({
        "success": True,
        "movies": movies,
        "count": query.count()
    })


# noinspection PyUnusedLocal
@app.route('/api/movies/create', methods=['POST'])
@requires_auth("write:movie")
def create_movie(payload):
    body = request.get_json()
    if body is None:
        abort(400, description="Please provide the data as json.")
    if "data" not in body:
        abort(400, description="The data should be inside data key.")
    body = body.get('data')
    name = body.get('name')
    description = body.get('description')
    date = body.get('date')
    img_path = body.get('image')

    if name is None:
        abort(400, description="Please insert the movie name.")
    if description is None:
        abort(400, description="Please insert the movie description.")
    if date is None:
        abort(400, description="Please insert the movie date.")
    if img_path is None:
        abort(400, description="Please insert the movie image url.")
    try:
        new_movie = Movie(
            name=name,
            description=description,
            date=date,
            all_rates_count=0,
            all_rates_total=0,
            img_path=img_path,
        )
        new_movie.insert()
        return jsonify({
            "success": True,
            "id": new_movie.id
        })
    except:
        db.session.rollback()
        print(sys.exc_info())
        abort(500, description="The server failed to insert the new movie, please try again later.")
    finally:
        db.session.close()


# noinspection PyUnusedLocal
@app.route('/api/movies/<int:movie_id>', methods=['DELETE'])
@requires_auth("delete:movie")
def delete_movie(payload, movie_id):
    try:
        query = Movie.query.filter_by(id=movie_id)
        if query.count() > 0:
            movie = query.first()
            movie.delete()
            return jsonify({
                "success": True,
                "id": movie_id
            })
        else:
            raise NotFound()
    except NotFound:
        raise ResourceNotFound("This movie does not exist.")
    except:
        db.session.rollback()
        print(sys.exc_info())
        abort(500, description="The server failed to delete the movie, please try again later.")
    finally:
        db.session.close()


# -----------------  start - return react frontend ----------------- #
@app.route('/')
def index():
    return app.send_static_file('index.html')


@app.route('/<path:path>')
def static_file(path):
    return app.send_static_file(path)


# -----------------  end - return react frontend ----------------- #

# -----------------  start - errors handling ----------------- #

class ResourceNotFound(Exception):
    def __init__(self, error):
        self.error = error


@app.errorhandler(ResourceNotFound)
def send_404(error="Not found"):
    return jsonify({
        "success": False,
        "error": 404,
        "message": str(error)
    }), 404


# noinspection PyUnusedLocal
@app.errorhandler(404)
def not_found(error):
    return app.send_static_file('index.html')  # 404 Handled in react (front-end)


@app.errorhandler(500)
def server_error(error):
    return jsonify({
        "success": False,
        "error": 500,
        "message": str(error)
    }), 500


@app.errorhandler(400)
def bad_request(error):
    return jsonify({
        "success": False,
        "error": 400,
        "message": str(error)
    }), 400


@app.errorhandler(AuthError)
def auth_erros(error):
    return jsonify(error.error), error.status_code
# -----------------  end - errors handling ----------------- #


if __name__ == '__main__':
    app.run()
