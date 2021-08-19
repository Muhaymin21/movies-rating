import json
from functools import wraps
from urllib.request import urlopen

from flask import request
from jose import jwt

AUTH0_DOMAIN = 'dev-yl2ra7dk.us.auth0.com'
ALGORITHMS = ['RS256']
API_AUDIENCE = 'udacity-capstone-api'


class AuthError(Exception):
    def __init__(self, error, status_code):
        self.error = error
        self.status_code = status_code


# Auth Header


def get_token_auth_header():
    auth_header = request.headers.get('Authorization', None)
    if auth_header is None:
        raise AuthError({
            "success": False,
            "error": 401,
            "message": "No authorization header is found"
        }, 401)
    auth_header_parts = auth_header.split(' ')
    if len(auth_header_parts) != 2 or auth_header_parts[0].lower() != "bearer":
        raise AuthError({
            "success": False,
            "error": 401,
            "message": "Wrong authentication method. Bearer token expected"
        }, 401)
    return auth_header_parts[1]


def check_permissions(permission, payload):
    if permission == '':
        return True
    if 'permissions' not in payload:
        raise AuthError({
            'success': False,
            'error': 400,
            'message': 'Bad request: no permissions is included in the token'
        }, 400)
    if permission not in payload['permissions']:
        raise AuthError({
            'success': False,
            'error': 403,
            'message': 'Forbidden, the request without enough permissions'
        }, 403)
    return True


def verify_decode_jwt(token):
    jsonurl = urlopen(f'https://{AUTH0_DOMAIN}/.well-known/jwks.json')
    jwks = json.loads(jsonurl.read())
    unverified_header = jwt.get_unverified_header(token)
    rsa_key = {}
    if 'kid' not in unverified_header:
        raise AuthError({
            "success": False,
            "error": 401,
            "message": "Authorization malformed"
        }, 401)

    for key in jwks['keys']:
        if key['kid'] == unverified_header['kid']:
            rsa_key = {
                'kty': key['kty'],
                'kid': key['kid'],
                'use': key['use'],
                'n': key['n'],
                'e': key['e']
            }

    if rsa_key:
        try:
            payload = jwt.decode(
                token,
                rsa_key,
                algorithms=ALGORITHMS,
                audience=API_AUDIENCE,
                issuer='https://' + AUTH0_DOMAIN + '/'
            )
            return payload

        except jwt.ExpiredSignatureError:
            raise AuthError({
                "success": False,
                "error": 401,
                "message": "Token expierd"
            }, 401)

        except jwt.JWTClaimsError:
            raise AuthError({
                "success": False,
                "error": 401,
                "message": "Incorrect claims. Please, check the audience and issuer."
            }, 401)
        except Exception:
            raise AuthError({
                "success": False,
                "error": 401,
                "message": "Unable to parse authentication token"
            }, 401)
    raise AuthError({
            "success": False,
            "error": 401,
            "message": "Unable to find the appropriate key"
        }, 401)


def requires_auth(permission=''):
    def requires_auth_decorator(f):
        @wraps(f)
        def wrapper(*args, **kwargs):
            token = get_token_auth_header()
            payload = verify_decode_jwt(token)
            check_permissions(permission, payload)
            if permission == '':
                return f(*args, **kwargs)
            else:
                return f(payload, *args, **kwargs)

        return wrapper

    return requires_auth_decorator
