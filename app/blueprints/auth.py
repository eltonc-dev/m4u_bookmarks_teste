from ..util.myRequest import MyRequest
import json
import requests
from flask import Flask , request, session , render_template , Blueprint, redirect , url_for

auth_blueprint = Blueprint('auth', __name__)

@auth_blueprint.route("/", methods=["GET"])
def index():
    if session.get('logged_user') is None:
        return redirect(url_for('auth.login')) 

    user = json.loads(session['logged_user'])

    # listando os bookmarks do usuário
    #res = requests.get('http://api:3000/api/v1/users/'+user['_id']+'/bookmarks')

    res = MyRequest.get('/v1/users/'+user['_id']+'/bookmarks')
    if res.status_code == 200:
        bookmarkList = res.json()
    else:
        bookmarkList = json.loads('[]')

    return render_template('home.html' , user=user , bookmarkList=bookmarkList )

@auth_blueprint.route("/login", methods=["GET"])
def login():
    message = request.args.get('m')
    return render_template('sign.html', message=message)


@auth_blueprint.route("/sign/in", methods=["GET", "POST"])
def signIn():
    if request.method == "GET":
        return redirect(url_for('.index'))

    info = request.form
    user = {
        'email':info['user-email'],
        'password':info['user-password']
    }

    #res = requests.post('http://api:3000/api/sign/in', data=user)    

    res = MyRequest.post('/sign/in', user)
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
    #res = requests.post('http://api:3000/api/sign/up', data=user)
    res = MyRequest.post('/sign/up',user)
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
