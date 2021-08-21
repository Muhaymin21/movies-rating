import os
import sys

from flask import Flask, jsonify, request, abort
from auth import AuthError, requires_auth
from flask_migrate import Migrate
from db_models import *
from sqlalchemy import exc

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


@app.route('/api/movies/create', methods=['POST'])
@requires_auth("write:movie")
def create_movie(payload):
    name = request.form.get('name')
    description = request.form.get('description')
    date = request.form.get('date')
    img_path = request.form.get('imgPath')
    if not name or not description or not date or not img_path:
        abort(400)
    try:
        new_movie = Movie(
            name=name,
            description=description,
            date=date,
            rate=0,
            img_path=img_path,
        )
        new_movie.insert()
        return jsonify({
            "success": True,
            "id": new_movie.id
        })
    except exc.SQLAlchemyError:
        db.session.rollback()
        print(sys.exc_info())
        abort(500)
    finally:
        db.session.close()


@app.route('/api/movies/<int:movie_id>', methods=['DELETE'])
@requires_auth("write:movie")
def delete_movie(movie_id):
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
            return jsonify({
                "success": False,
                "error": "This movie does not exist",
                "id": movie_id
            })
    except:
        db.session.rollback()
        print(sys.exc_info())
        abort(500)
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

@app.errorhandler(404)
def not_found(error):
    print(error)
    return jsonify({
        "success": False,
        "error": 404,
        "message": "resource not found"
    }), 404


@app.errorhandler(500)
def server_error(error):
    print(error)
    return jsonify({
        "success": False,
        "error": 500,
        "message": "The server failed to process the request"
    }), 500


@app.errorhandler(400)
def bad_request(error):
    print(error)
    return jsonify({
        "success": False,
        "error": 400,
        "message": "Bad request"
    }), 400


@app.errorhandler(AuthError)
def auth_erros(error):
    return jsonify(error.error), error.status_code


if __name__ == '__main__':
    app.run()
