from flask import Flask , render_template, Session
from .blueprints.admin import admin_blueprint
from .blueprints.auth import auth_blueprint
from .blueprints.bookmark  import bookmark_blueprint

app = Flask(__name__)
sess = Session()
app.secret_key = 'emequatrou'
app.config['SESSION_TYPE'] = 'filesystem'

@app.errorhandler(401)
def page_not_found(e):
    return render_template('401.html'), 401

@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404

@app.errorhandler(500)
def page_not_found(e):
    return render_template('500.html'), 500

app.register_blueprint(admin_blueprint)
app.register_blueprint(auth_blueprint)
app.register_blueprint(bookmark_blueprint)
 

if __name__ == "__main__":
    
    sess.init_app(app)

    # Only for debugging while developing
    app.run(host='0.0.0.0', debug=True, port=80)
