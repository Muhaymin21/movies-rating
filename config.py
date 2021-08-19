import os
ENV = os.environ.get("ENV", default="development")
DEBUG = True
SQLALCHEMY_DATABASE_URI = os.environ.get("DATABASE_URL", "postgresql://postgres:m121312@localhost:5432/capstone")
SQLALCHEMY_TRACK_MODIFICATIONS = False
