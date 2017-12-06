import requests
import json
from flask import session , abort



class MyRequest: 
    base_url = "http://api:3000/api"
    
    @staticmethod
    def validateAccess(r):
        if r.status_code == 401: # acesso negado
            session.clear()
            abort(401)
        else:
            return r

    @staticmethod
    def getHeaders():
        if session.get('logged_user') is not None:
            try:
                token = json.loads(session['logged_user'])['token']
            except :
                token = ''
        else:
            token = ''

        headers = {
            "authentication" : token
        }

        return headers

    @staticmethod
    def get(resourceId):
        res = requests.get(MyRequest.base_url+resourceId , headers=MyRequest.getHeaders())
        return MyRequest.validateAccess(res)

    @staticmethod
    def post(resourceId , data):
        res = requests.post(MyRequest.base_url+resourceId , data=data , headers=MyRequest.getHeaders() )
        return MyRequest.validateAccess(res)
    
    @staticmethod
    def put(resourceId , data):
        res = requests.put(MyRequest.base_url+resourceId , data=data , headers=MyRequest.getHeaders() )
        return MyRequest.validateAccess(res)

    @staticmethod
    def delete(resourceId ):

        res = requests.delete(MyRequest.base_url+resourceId , headers=MyRequest.getHeaders() )
        return MyRequest.validateAccess(res)