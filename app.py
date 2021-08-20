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
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route('/api/movies')
# @requires_auth("write:movie")
def get_movies():
    movies = [movie.format_output() for movie in Movie.query.order_by(Movie.id).all()]
    return jsonify({
        "success": True,
        "movies": movies
    })


@app.route('/api/movies/create', methods=['POST'])
# @requires_auth("write:movie")
def create_movie():
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
    except exc.SQLAlchemyError:
        db.session.rollback()
        print(sys.exc_info())
        abort(500)
    finally:
        db.session.close()
        return jsonify({
            "success": True
        })


@app.route('/')
def index():
    return app.send_static_file('index.html')


@app.route('/<path:path>')
def static_file(path):
    return app.send_static_file(path)


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
