from .database import db
from .models import User, Role
from flask import current_app as app, jsonify, request, render_template
from flask_security import auth_required, roles_required, current_user, roles_accepted, login_user
# from flask_security import hash_password
# from flask_security.utils import hash_password
from werkzeug.security import check_password_hash, generate_password_hash
from .utils import roles_list


@app.route('/', methods = ['GET'])
def home():
    return render_template('index.html')

@app.route("/api/admin_dashboard")
@auth_required('token') #authentication
@roles_required('admin') #RBAC/Authorization
def admin_home():
    return "<h1>This is admin</h1>"

@app.route('/api/user_dashboard')
@auth_required("token")
@roles_accepted("customer","service_proffesional")
def user_home():
    user= current_user
    return jsonify(
        {
            "username": user.username,
            "email":user.email,
            "password": user.password,
            "roles":roles_list(user.roles),
            "service_type":user.service_type,
            "action":user.action,
            "id":user.id,
            "documents":user.documents

        }
    )

@app.route('/api/login', methods=['POST'])
def user_login():
    body=request.get_json()
    email=body['email']
    password=body['password']

    if not email:
        return jsonify({
            "message":"Email is required"
        }),400
    user=app.security.datastore.find_user(email=email)

    if user:
        if check_password_hash(user.password, password):
            # if current_user:
            #     return jsonify({
            #         "message":"You are already logged in"
            #     }), 400
            login_user(user)
            return jsonify({
                "id":user.id,
                "username": user.username,
                "auth-token": user.get_auth_token(),
                "roles":roles_list(user.roles)
            })
        else:
            return jsonify({
                "message":"Incorrect Password"
            }), 400
    else:
        return jsonify({
            "message":"User Not Found!" 
        }), 404


@app.route('/api/register', methods=['POST'])
def create_user(role):
    credentials=request.get_json()
    
    if not app.security.datastore.find_user(email= credentials["email"]):
        app.security.datastore.create_user(email=credentials["email"],
                                            username=credentials["username"],
                                            password=generate_password_hash(credentials["password"]),
                                            address=credentials['address'],
                                            pincode=credentials['pincode'],
                                            roles=['customer'])
        db.session.commit()
        return jsonify(
                {
                    "message":"User created successfully"
                }
            ), 201
    return jsonify(
                {
                    "message":"User already exists"
                }
            ), 400