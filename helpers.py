from flask import redirect, render_template, request, session
from functools import wraps
import requests
import random

def login_required(f):
    """Send the page back to login if the user is not logged in"""

    @wraps(f)
    def decorated_function(*args, **kwargs):
        if session.get("user_id") is None:
            return redirect("/login")
        return f(*args, **kwargs)

    return decorated_function