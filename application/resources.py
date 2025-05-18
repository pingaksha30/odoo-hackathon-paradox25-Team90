from flask_restful import Api, Resource, reqparse
from .models import *
from flask_security import auth_required, roles_required, current_user, roles_accepted
from .utils import roles_list
api=Api()

parser= reqparse.RequestParser()

parser.add_argument('name')
parser.add_argument('price')
parser.add_argument('category')
parser.add_argument('description')
parser.add_argument('listedby')
parser.add_argument('status')
parser.add_argument('boughtby')

class TransApi(Resource):
    @auth_required('token')
    @roles_accepted('customer','admin')
    def get(self):
        products=[]
        req_json=[]
        if "admin" in roles_list(current_user.roles):
            products=Products.query.all()
        else:
            products=Products.query.filter_by(listedby=current_user.username).all()
        for product in products:
            this_req={}
            this_req['id']=product.id
            this_req['name']=product.name    
            this_req['price']=product.price
            this_req['category']=product.category
            this_req['description']=product.description
            this_req['listedby']=product.listedby
            this_req['status']=product.status
            this_req['boughtby']=product.boughtby
            req_json.append(this_req)
            
        if req_json:
            return req_json
        else:
            return {"message":"No products found"}, 404