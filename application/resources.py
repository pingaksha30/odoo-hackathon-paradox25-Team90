from flask_restful import Api, Resource, reqparse
from .models import *
from flask_security import auth_required, roles_accepted, current_user
from .utils import roles_list

api = Api()

# Parser for POST
parser = reqparse.RequestParser()
parser.add_argument('id')
parser.add_argument('name')
parser.add_argument('price')
parser.add_argument('category')
parser.add_argument('description')
parser.add_argument('status')

# GET all products
class ProductList(Resource):
    def get(self):
        products = Products.query.all()
        result = [{
            "id": p.id,
            "name": p.name,
            "price": p.price,
            "category": p.category,
            "description": p.description,
            "listedby": p.listedby,
            "status": p.status,
            "boughtby": p.boughtby
        } for p in products]

        return result if result else {"message": "No products found"}, 200

# POST a new product
class ProductCreate(Resource):
    @auth_required('token')
    @roles_accepted('customer')
    def post(self):
        args = parser.parse_args()
        try:
            product = Products(
                name=args['name'],
                price=args['price'],
                category=args['category'],
                description=args['description'],
                listedby=current_user.id,
                status='available',
                boughtby=None
            )
            db.session.add(product)
            db.session.commit()
            return {"message": "Product created successfully"}, 201
        except Exception as e:
            return {"message": f"Failed to create product: {str(e)}"}, 400
        
    @auth_required('token')
    @roles_accepted('customer', 'admin')
    def put(self):
        args = parser.parse_args()
        try:
            product = Products.query.filter_by(id=args['id']).first()
            cart=Cart(product_id=args['id'],user_id=current_user.id,price=args['price'])
            db.session.add(cart)
            product.status= args['status']
            db.session.commit()
            return {"message": "Product updated successfully"}, 200
            
        except Exception as e:
            return {"message": f"Failed to update product: {str(e)}"}, 400

# Register the endpoints
api.add_resource(ProductList, '/api/get')      # GET
api.add_resource(ProductCreate, '/api/post',
                                '/api/put')  
