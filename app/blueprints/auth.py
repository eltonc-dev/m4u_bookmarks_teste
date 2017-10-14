import requests
import json
from flask import Flask , request, session , render_template , Blueprint, redirect , url_for

auth_blueprint = Blueprint('auth', __name__)

@auth_blueprint.route("/", methods=["GET"])
def index():
    if session.get('logged_user') is None:
        return render_template('sign.html')

    user = json.loads(session['logged_user'])
        
    return render_template('home.html' , user=user )

@auth_blueprint.route("/sign/in", methods=["GET", "POST"])
def signIn():
    if request.method == "GET":
        return redirect(url_for('.index'))

    info = request.form
    user = {
        'email':info['user-email'],
        'password':info['user-password']
    }

    res = requests.post('http://api:3000/api/sign/in', data=user)
    if res.status_code == 200:
        loggedUser = res.json()
        if loggedUser['token'] is not None:
            session['logged_user'] = res.text
            return redirect(url_for('.index'))
    else:
        info = res.json()['message']
    
    return render_template('sign.html', signInError=info)

@auth_blueprint.route("/sign/up", methods=["GET", "POST"])
def signUp():
    if request.method == "GET":
        return redirect(url_for('.index'))  

    info = request.form
    user = {
        'name':info['user-name'],
        'email':info['user-email'],
        'password':info['user-password']
    }
    res = requests.post('http://api:3000/api/sign/up', data=user)
    if res.status_code == 201:
        loggedUser = res.json()
        if loggedUser['token'] is not None:
            session['logged_user'] = res.text
            return redirect(url_for('.index'))
    else:
        info = res.json()['message']

    return render_template('sign.html', signUpError=info)


@auth_blueprint.route("/sign/out", methods=["GET", "POST"])
def signOut():
    session.clear()
    return redirect(url_for('.index'))
