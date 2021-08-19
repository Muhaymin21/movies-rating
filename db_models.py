from flask_sqlalchemy import SQLAlchemy

# ----------------------------------------------------------------------------#
# Models.
# ----------------------------------------------------------------------------#
db = SQLAlchemy()


# class Table(db.Model):
#     def insert(self):
#         db.session.add(self)
#         db.session.commit()
#
#     def delete(self):
#         db.session.delete(self)
#         db.session.commit()


class Movie(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(30), nullable=False)
    description = db.Column(db.Text, nullable=False)
    date = db.Column(db.String(30), nullable=False)
    rate = db.Column(db.Integer, default=0, nullable=False)
    img_path = db.Column(db.String, nullable=False)
    rates = db.relationship('Rate', backref='movie_rate', lazy=True, cascade="all, delete-orphan")

    def format_output(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'date': self.date,
            'rate': self.rate,
            'img_path': self.img_path
        }


class Rate(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.String, nullable=False)
    rate = db.Column(db.Integer, default=0, nullable=False)
    comment = db.Column(db.Text, nullable=True)
    date = db.Column(db.DateTime, nullable=False)
    movie_id = db.Column(db.Integer, db.ForeignKey('movie.id'), nullable=False)
