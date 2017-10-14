import requests
from flask import Flask , request, session , render_template , Blueprint, redirect , url_for

auth_blueprint = Blueprint('auth', __name__)

@auth_blueprint.route("/", methods=["GET"])
def index():
    if session.get('logged_user') is None:
        return render_template('sign.html')
    return render_template('home.html')

@auth_blueprint.route("/sign/in", methods=["POST"])
def signIn():
    #return render_template('sign.html', signInError="Erro")
    return redirect(url_for('.index', signInError="Erro"))

@auth_blueprint.route("/sign/up", methods=["POST"])
def signUp():
    info = request.form
    user = {
        'name':info['user-name'],
        'email':info['user-email'],
        'password':info['user-password']
    }
    print(user)
    res = requests.post('http://api:3000/api/sign/up', data=user)
    print(res.json())
    
    if res.status_code == 201:
        loggedUser = res.json()
        print(res.content.token)
        if loggedUser.token is not None:
            session['logged_user'] = loggedUser
            return redirect(url_for('.index'))

    return render_template('sign.html', error=info)