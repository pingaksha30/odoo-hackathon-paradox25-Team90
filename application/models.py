from .database import db
from flask_security import UserMixin, RoleMixin


class User(db.Model, UserMixin):
    #required for flask security
    id= db.Column(db.Integer, primary_key=True)
    email= db.Column(db.String, unique= True, nullable= False)
    username=db.Column(db.String, unique= True, nullable= False)
    password= db.Column(db.String, nullable= False)
    fs_uniquifier = db.Column(db.String, unique= True, nullable= False)
    active= db.Column(db.Boolean, nullable = False)
    address=db.Column(db.String, nullable=True)
    pincode=db.Column(db.Integer, nullable=True)




    roles=db.relationship('Role', backref = 'bearer', secondary = 'users_roles')


class Role(db.Model, RoleMixin):
    id= db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, unique = True, nullable = False)
    description = db.Column(db.String)

class UsersRoles(db.Model):
    id= db.Column(db.Integer, primary_key=True)
    user_id= db.Column(db.Integer, db.ForeignKey('user.id'))
    role_id= db.Column(db.Integer, db.ForeignKey('role.id'))
 

