class Config():
    DEBUG= False
    SQLALCHEMY_TRACK_MODIFICATION = True

class LocalDevelopmentConfig(Config):
    # configuration
    SQLALCHEMY_DATABASE_URI = "sqlite:///database.db"
    DEBUG = True

    # config for security
    SECRET_KEY="blah-blah-blah" # hash user creds in session
    SECURITY_PASSWORD_HASH = "bcrypt" # mechanism for hashing password
    SECURITY_PASSWORD_SALT = "balh-sort-balh" #helps to hashing the password
    WTF_CSRF_ENABLED = False 
    SECURITY_TOKEN_AUTHENTICATION_HEADER="Authentication-Token"
