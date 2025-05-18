from flask_restful import Api, Resource, reqparse
from .models import *
from flask_security import auth_required, roles_required, current_user, roles_accepted
from .utils import roles_list
api=Api()

parser= reqparse.RequestParser()