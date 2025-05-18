# 

from .database import db
from .models import *
from flask import current_app as app, jsonify, request, render_template
from flask_security import auth_required, roles_required, roles_accepted, current_user, login_user
from werkzeug.security import check_password_hash, generate_password_hash
from .utils import roles_list

# Home route
@app.route('/', methods=['GET'])
def home():
    return render_template('index.html')

# Admin Dashboard
@app.route("/api/admin_dashboard")
@auth_required('token')
@roles_required('admin')
def admin_home():
    return "<h1>This is admin</h1>"

# Unified User Dashboard
@app.route('/api/user_dashboard')
@auth_required("token")
@roles_accepted("customer", "service_proffesional", "admin")
def user_dashboard():
    user = current_user
    return jsonify({
        "username": user.username,
        "email": user.email,
        "password": user.password,
        "roles": roles_list(user.roles),
        "id": user.id,
    })

# Login API
@app.route('/api/login', methods=['POST'])
def user_login():
    body = request.get_json()
    email = body.get('email')
    password = body.get('password')

    if not email:
        return jsonify({"message": "Email is required"}), 400

    user = app.security.datastore.find_user(email=email)

    if user:
        if check_password_hash(user.password, password):
            login_user(user)
            return jsonify({
                "id": user.id,
                "username": user.username,
                "auth-token": user.get_auth_token(),
                "roles": roles_list(user.roles)
            })
        else:
            return jsonify({"message": "Incorrect Password"}), 400
    else:
        return jsonify({"message": "User Not Found!"}), 404

# Registration API
@app.route('/api/register', methods=['POST'])
def create_user(role=None):
    credentials = request.get_json()
    
    if not app.security.datastore.find_user(email=credentials["email"]):
        app.security.datastore.create_user(
            email=credentials["email"],
            username=credentials["username"],
            password=generate_password_hash(credentials["password"]),
            address=credentials["address"],
            pincode=credentials["pincode"],
            roles=["customer"]
        )
        db.session.commit()
        return jsonify({"message": "User created successfully"}), 201

    return jsonify({"message": "User already exists"}), 400

# Category API (fixed route)
@app.route('/api/category')
def category():
    category_list = Category.query.all()
    result = []

    for cat in category_list:
        result.append({
            "name": cat.name,
            "description": cat.description
        })

    return jsonify(result)

@app.route('/api/getcart')
def getcart():
    cart_list = Cart.query.filter_by(user_id=current_user.id).all()

    result = []

    for cart in cart_list:
        result.append({
                "product_id": cart.product_id,
                "user_id": cart.user_id,
                "price": cart.price,
                "name": cart.product.name,
                "category": cart.product.category,
                "description": cart.product.description
            })

    return jsonify(result)

@app.route('/api/getusers')
def getusers():
    user_list = User.query.all()

    result = []

    for user in user_list:
        result.append({
                "id": user.id,
                "username": user.username,
                "email": user.email,
                "address": user.address,
                "pincode": user.pincode
            })

    return jsonify(result)