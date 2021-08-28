from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class Movie(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(30), nullable=False)
    description = db.Column(db.Text, nullable=False)
    date = db.Column(db.Date, nullable=False)
    all_rates_count = db.Column(db.Integer, default=0, nullable=False)
    all_rates_total = db.Column(db.Float, default=0, nullable=False)
    img_path = db.Column(db.String, nullable=False)
    rates = db.relationship('Rate', backref='movie_rate', lazy=True, cascade="all, delete-orphan")
    comments = db.relationship('Comment', backref='movie_comments', lazy=True, cascade="all, delete-orphan")

    def insert(self):
        db.session.add(self)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def format_output(self):
        if self.all_rates_count == 0:
            rate = 0
        else:
            rate = self.all_rates_total/self.all_rates_count
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'date': str(self.date),
            'rate': rate,
            'rateCount': self.all_rates_count,
            'imgPath': self.img_path
        }


class Rate(db.Model):
    movie_id = db.Column(db.Integer, db.ForeignKey('movie.id'), nullable=False, primary_key=True)
    user_id = db.Column(db.String, nullable=False, primary_key=True)
    rate = db.Column(db.Float, default=0, nullable=False)

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def format_output(self):
        return {
            self.movie_id: self.rate
        }


class Comment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(30), nullable=False)
    user_id = db.Column(db.String, nullable=False)
    comment = db.Column(db.Text, nullable=False)
    date = db.Column(db.DateTime, nullable=False)
    movie_id = db.Column(db.Integer, db.ForeignKey('movie.id'), nullable=False)

    def insert(self):
        db.session.add(self)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def format_output(self):
        return {
            'id': self.id,
            'name': self.name,
            'comment': self.comment,
            'date': str(self.date)
        }
