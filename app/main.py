from flask import Flask
from .blueprints.auth import auth_blueprint

app = Flask(__name__)

app.register_blueprint(auth_blueprint)
 

if __name__ == "__main__":
    # Only for debugging while developing
    app.run(host='0.0.0.0', debug=True, port=80)
