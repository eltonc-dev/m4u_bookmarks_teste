from flask import Flask , render_template, Session
from .blueprints.auth import auth_blueprint

app = Flask(__name__)
sess = Session()
app.secret_key = 'emequatrou'
app.config['SESSION_TYPE'] = 'filesystem'

@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404

@app.errorhandler(500)
def page_not_found(e):
    return render_template('500.html'), 500

app.register_blueprint(auth_blueprint)
 

if __name__ == "__main__":
    
    sess.init_app(app)

    # Only for debugging while developing
    app.run(host='0.0.0.0', debug=True, port=80)
