import sys

from flask import Flask, jsonify, request, abort
from flask_migrate import Migrate
from sqlalchemy import exc, and_
from werkzeug.exceptions import NotFound
from auth import AuthError, requires_auth
from db_models import *

app = Flask(__name__, static_folder='build/', static_url_path='/')
app.config.from_object('config')
db.init_app(app)
migrate = Migrate(app, db)


def get_rating_data(body):
    if body is None:
        abort(400, description="Please provide the data as json.")
    if "newRate" not in body:
        abort(400, description="Please insert the new rate.")
    return body.get('newRate')


def check_all_data_posted(body):
    if body is None:
        abort(400, description="Please provide the data as json.")
    if 'name' not in body:
        abort(400, description="Please insert the movie name.")
    if 'description' not in body:
        abort(400, description="Please insert the movie description.")
    if 'date' not in body:
        abort(400, description="Please insert the movie date.")
    if 'image' not in body:
        abort(400, description="Please insert the movie image url.")
    return {
        "name": body.get('name'),
        "description": body.get('description'),
        "date": body.get('date'),
        "img_path": body.get('image')
    }


def paginate(page, selection, movies_per_page):
    start = (page - 1) * movies_per_page
    end = start + movies_per_page
    movies = [movie.format_output() for movie in selection]
    return movies[start:end]


def get_user_id(payload):
    user_id = payload['sub'].split('|')[1]
    if user_id is not None:
        return user_id
    else:
        abort(401, "The server failed to retrieve your ID, please try to sign out then sign in again.")


@app.route('/api/movies')  # get all movies
def get_movies():
    try:
        query = Movie.query.order_by(Movie.id)
        movies_per_page = request.args.get("perPage", 3, type=int)
        movies = paginate(request.args.get('page', 1, type=int), query.all(), movies_per_page)
        return jsonify({
            "success": True,
            "movies": movies,
            "count": query.count()
        })
    except:
        print(sys.exc_info())
        abort(500, description="The server failed to load the movies list, please try again later.")
    finally:
        db.session.close()


# noinspection PyUnusedLocal
@app.route('/api/movies/create', methods=['POST'])  # post new movie
@requires_auth("write:movie")
def create_movie(payload):
    data = check_all_data_posted(request.get_json())
    try:
        new_movie = Movie(
            name=data['name'],
            description=data['description'],
            date=data['date'],
            all_rates_count=0,
            all_rates_total=0,
            img_path=data['img_path'],
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


@app.route('/api/movies/<int:movie_id>')  # GET selected movie
def get_movie(movie_id):
    try:
        movie = Movie.query.filter_by(id=movie_id).one_or_none()
        if movie is not None:
            return jsonify({
                "success": True,
                "movie": movie.format_output()
            })
        else:
            raise NotFound()
    except NotFound:
        raise ResourceNotFound("This movie does not exist.")
    except:
        db.session.rollback()
        print(sys.exc_info())
        abort(500, description="The server failed to get the movie, please try again later.")
    finally:
        db.session.close()


# noinspection PyUnusedLocal
@app.route('/api/movies/<int:movie_id>', methods=['DELETE'])  # Delete movies
@requires_auth("delete:movie")
def delete_movie(payload, movie_id):
    try:
        movie = Movie.query.filter_by(id=movie_id).one_or_none()
        if movie is not None:
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


@app.route('/api/movies/<int:movie_id>', methods=['PATCH'])  # Update movie data (except rate cannot be updated)
@requires_auth("update:movie")
def edit_movie(payload, movie_id):
    data = check_all_data_posted(request.get_json())
    try:
        movie = Movie.query.filter_by(id=movie_id).one_or_none()
        if movie is not None:
            movie.name = data['name']
            movie.description = data['description']
            movie.date = data['date']
            movie.img_path = data['img_path']
            db.session.commit()
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
        abort(500, description="The server failed to edit the movie, please try again later.")
    finally:
        db.session.close()


@app.route('/api/users/rates')
@requires_auth("")  # User id is fetched from the token payload
def get_user_rates(payload):
    user_id = get_user_id(payload)
    # example payload {"sub": "auth0|611fbf35b540dd00l3fca567"}
    body = request.get_json()
    if body is not None:
        rates_id_list = body.get("rates")  # type: list
        if rates_id_list is not None:
            try:
                rates = [
                    rate.format_output() for rate in Rate.query.filter_by(user_id=user_id).all()
                    if rate.movie_id in rates_id_list
                ]
                return jsonify({
                    "success": True,
                    "rates": rates
                })
            except:
                print(sys.exc_info())
                abort(500, description="The server failed to get selected movies rate, please try again later.")
        else:
            abort(400, "Please include the selected movies id list")
    else:
        abort(400, "Please post json contain selected movies id list")


@app.route('/api/movies/<int:movie_id>/rate', methods=['POST'])  # Rating movie the first time
@requires_auth("write:rate")
def rate_movie(payload, movie_id):
    user_id = get_user_id(payload)
    rate = get_rating_data(request.get_json())
    try:
        movie = Movie.query.filter_by(id=movie_id).one_or_none()
        if movie is None:
            raise NotFound()
        new_rate = movie.all_rates_total + rate
        movie.all_rates_total = new_rate
        movie.all_rates_count = movie.all_rates_count + 1
        Rate(
            movie_id=movie_id,
            user_id=user_id,
            rate=rate
        ).insert()
        return jsonify({
            "success": True,
            "movieID": movie_id,
            "rate": rate
        })
    except NotFound:
        raise ResourceNotFound("This movie does not exist.")
    except exc.IntegrityError as error:
        print(error)
        db.session.rollback()
        abort(500, description="This movie is already rated.")
    except:
        print(sys.exc_info())
        db.session.rollback()
        abort(500, description="The server failed to insert the selected movies rate, please try again later.")
    finally:
        db.session.close()


@app.route('/api/movies/<int:movie_id>/rate', methods=['PATCH'])  # Edit rated movie
@requires_auth("write:rate")
def update_rated_movie(payload, movie_id):
    user_id = get_user_id(payload)
    rate = get_rating_data(request.get_json())
    try:
        old_rate = Rate.query.filter(and_(
            Rate.movie_id == movie_id, Rate.user_id == user_id
        )).one_or_none()  # type: Rate
        if old_rate is None:
            raise NotFound()
        movie = Movie.query.filter_by(id=movie_id).one_or_none()
        if movie is None:
            raise NotFound()
        new_rate = movie.all_rates_total + (rate - old_rate.rate)
        old_rate.rate = rate
        movie.all_rates_total = new_rate
        db.session.commit()
        return jsonify({
            "success": True,
            "movieID": movie_id,
            "newRate": rate
        })
    except NotFound:
        raise ResourceNotFound("This movie does not exist or the data have integrity error.")
    except:
        print(sys.exc_info())
        db.session.rollback()
        abort(500, description="The server failed to insert the selected movies rate, please try again later.")
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
