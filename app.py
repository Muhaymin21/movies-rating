from flask import Flask, jsonify
from auth import AuthError, requires_auth
from flask_migrate import Migrate
from db_models import *


app = Flask(__name__, static_folder='build/', static_url_path='/')
app.config.from_object('config')
db.init_app(app)
migrate = Migrate(app, db)


@app.route('/api/movies')
def hello_world():
    movies = [movie.format_output() for movie in Movie.query.order_by(Movie.id).all()]
    return jsonify({
        "success": True,
        "movies": movies
    })


@app.route('/api/protected/rate')
@requires_auth("rate:movies")
def hello_world_protected_with_permission(payload):
    return jsonify(payload)


@app.route('/api/protected')
@requires_auth()
def hello_world_protected():
    return jsonify({
        "success": True,
        "message": "Hello, Protected!"
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
def not_found(error):
    print(error)
    return jsonify({
        "success": False,
        "error": 500,
        "message": "The server failed to process the request"
    }), 500


@app.errorhandler(AuthError)
def auth_erros(error):
    return jsonify(error.error), error.status_code


if __name__ == '__main__':
    app.run()
