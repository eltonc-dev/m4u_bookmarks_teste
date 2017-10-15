from ..util.myRequest import MyRequest
import json
from flask import Flask , request, session , render_template , Blueprint, redirect , url_for

admin_blueprint = Blueprint('admin', __name__)

@admin_blueprint.route("/admin", methods=["GET"])
def index():
    if session.get('logged_user') is None: 
        return redirect(url_for('auth.index'))
    else:
        userList = json.loads('[]') 
        user = json.loads(session['logged_user'])
        if user['admin'] == 'false':
            return redirect(url_for('auth.index'))
        else:
            res = MyRequest.get('/v1/users')
            if res.status_code == 200:
                userList = res.json()
    
    return render_template('admin.html' , user=user,  userList=userList )

@admin_blueprint.route("/admin/find", methods=["POST"])
def find():
    info = request.form

    if info.get('mybookemark-user', None) is None:
        return redirect(url_for('admin.index',error="Selecione um usuário"))
    else:
        res = MyRequest.get('/v1/users')
        if res.status_code == 200:
            userList = res.json()
        else:
            userList = json.loads('[]')

        res = MyRequest.get('/v1/users/'+info.get('mybookemark-user',None))
        if res.status_code == 200:
            userSelected = res.json()

        user = json.loads(session['logged_user'])
        res = MyRequest.get('/v1/users/'+info.get('mybookemark-user',None)+'/bookmarks')
        if res.status_code == 200:
            bookmarkList = res.json()
        else:
            bookmarkList = json.loads('[]')
        
    return render_template('admin.html' , user=user, userSelected=userSelected , userList=userList , bookmarkList=bookmarkList )
        
