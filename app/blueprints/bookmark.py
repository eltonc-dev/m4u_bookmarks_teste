import requests
import json
from flask import Flask , request, session , render_template , Blueprint, redirect , url_for

bookmark_blueprint = Blueprint('bookmark', __name__)

@bookmark_blueprint.route("/bookmark/create", methods=["GET","POST"])
def create():
    if request.method == "GET":
        return redirect(url_for('auth.index'))

    info = request.form
    print(info)
    bookmark = {
        'owner':info['bookmark-owner'],
        'name':info['bookmark-name'],
        'url':info['bookmark-url']
    }

    print(bookmark)
    res = requests.post('http://api:3000/api/v1/bookmarks', data=bookmark)

    print(res)
    if res.status_code != 201:
        error = res.json()['message']
        return redirect(url_for('auth.index', error=error)) 

    return redirect(url_for('auth.index')) 
    
@bookmark_blueprint.route("/bookmark/delete/<id>", methods=["GET","POST"])
def delete(id):

    res = requests.delete('http://api:3000/api/v1/bookmarks/'+id)

    print(res)
    if res.status_code != 200:
        error = res.json()['message']
        return redirect(url_for('auth.index', error=error)) 

    return redirect(url_for('auth.index'))

@bookmark_blueprint.route("/bookmark/edit/<id>", methods=["GET","POST"])
def edit(id):
    
    if request.method == "GET":
        return redirect(url_for('auth.index'))
    
    info = request.form
    bookmark = {
        'owner':info['bookmark-owner'],
        'name':info['bookmark-name'],
        'url':info['bookmark-url']
    }

    res = requests.put('http://api:3000/api/v1/bookmarks/'+id , data=bookmark)

    print(res)
    if res.status_code != 200:
        error = res.json()['message']
        return redirect(url_for('auth.index', error=error)) 

    return redirect(url_for('auth.index'),data=u"algo")
    