import json
from flask import Flask , request, session , render_template , Blueprint, redirect , url_for
from ..util.myRequest import MyRequest

bookmark_blueprint = Blueprint('bookmark', __name__)

@bookmark_blueprint.route("/bookmark/create", methods=["GET","POST"])
def create():
    if request.method == "GET":
        return redirect(url_for('auth.index'))

    info = request.form

    bookmark = {
        'owner':info['bookmark-owner'],
        'name':info['bookmark-name'],
        'url':info['bookmark-url']
    }
    res = MyRequest.post('/v1/bookmarks', bookmark)

    if res.status_code != 201:
        error = res.json()['message']
        return redirect(url_for('auth.index', error=error)) 

    return redirect(url_for('auth.index')) 
    
@bookmark_blueprint.route("/bookmark/delete/<id>", methods=["GET","POST"])
def delete(id):

    res = MyRequest.delete('/v1/bookmarks/'+id)

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

    res = MyRequest.put('/v1/bookmarks/'+id , bookmark)
    
    if res.status_code != 200:
        error = res.json()['message']
        return redirect(url_for('auth.index', error=error)) 

    return redirect(url_for('auth.index'))
    