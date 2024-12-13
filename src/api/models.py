from flask_sqlalchemy import SQLAlchemy
from flask import Flask



db = SQLAlchemy()

class Comment(db.Model):
    _tablename_ = 'comments'
    id = db.Column(db.BigInteger, primary_key=True, autoincrement=True)
    text = db.Column(db.String(500))
    user_id = db.Column(db.BigInteger, db.ForeignKey('Users.id'))
    user = db.relationship('User', backref=db.backref('comments', lazy=True))

class Platform(db.Model):
    _tablename_ = 'platforms'
    id = db.Column(db.BigInteger, primary_key=True, autoincrement=True)
    name = db.Column(db.String(500))
    videogame_id = db.Column(db.BigInteger, db.ForeignKey('Videogames.id'))

class Developer(db.Model):
    _tablename_ = 'developers'
    id = db.Column(db.BigInteger, primary_key=True, autoincrement=True)
    name = db.Column(db.String(500))
    videogame_id = db.Column(db.BigInteger, db.ForeignKey('Videogames.id'))

class User(db.Model):
    _tablename_ = 'Users'
    id = db.Column(db.BigInteger, primary_key=True, autoincrement=True)
    username = db.Column(db.String(500), unique=True)
    email = db.Column(db.String(500), unique=True)
    password = db.Column(db.String(500))
    birth_date = db.Column(db.Date, nullable=True)
    creation_date = db.Column(db.TIMESTAMP, default=db.func.current_timestamp())

class Post(db.Model):
    _tablename_ = 'post'
    id = db.Column(db.BigInteger, primary_key=True, autoincrement=True)
    text = db.Column(db.BigInteger)
    like = db.Column(db.BigInteger)
    user_id = db.Column(db.BigInteger, db.ForeignKey('Users.id'))
    comment_id = db.Column(db.BigInteger, db.ForeignKey('comments.id'))

class Favorite(db.Model):
    _tablename_ = 'favorites'
    id = db.Column(db.BigInteger, primary_key=True, autoincrement=True)
    user_id = db.Column(db.BigInteger, db.ForeignKey('Users.id'))
    videogame_id = db.Column(db.BigInteger, db.ForeignKey('Videogames.id'))

class Videogame(db.Model):
    _tablename_ = 'Videogames'
    id = db.Column(db.BigInteger, primary_key=True, autoincrement=True)
    title = db.Column(db.String(500))
    image = db.Column(db.String(500))
    rating = db.Column(db.BigInteger)

class Genre(db.Model):
    _tablename_ = 'genres'
    id = db.Column(db.BigInteger, primary_key=True, autoincrement=True)
    name = db.Column(db.String(500))
    pegi = db.Column(db.String(500))
    description = db.Column(db.String(500))
    videogame_id = db.Column(db.BigInteger, db.ForeignKey('Videogames.id'))

class Tag(db.Model):
    _tablename_ = 'tags'
    id = db.Column(db.BigInteger, primary_key=True, autoincrement=True)
    name = db.Column(db.BigInteger)
    videogame_id = db.Column(db.BigInteger, db.ForeignKey('Videogames.id'))

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            # do not serialize the password, its a security breach
        }