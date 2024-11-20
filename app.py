from cs50 import SQL
from flask import Flask,redirect, render_template, request, session, url_for, send_file
from flask_session import Session
from werkzeug.security import check_password_hash, generate_password_hash
import datetime
import csv

from helpers import login_required

#Configure application
app = Flask(__name__)

#Configure session to use filesystem(instead of signed cookies)
app.config["SESSION_PERMANENT"] = True
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

#Configure CS50 Library to use SQLite database.sc
db = SQL("sqlite:///pennywise.db")

#Disabling cache to get latest data
@app.after_request
def after_request(response):
    """Ensure responses aren't cached"""
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    response.headers["Expires"] = 0
    response.headers["Pragma"] = "no-cache"
    return response

@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == 'POST': 
        rows = db.execute('SELECT * FROM register1 where USERNAME = ?',
                   request.form.get('username'))
        
        #Checking if username exists or not and password correct or not
        if len(rows) != 1:
            return render_template('login.html', var = 1)
        
        if not check_password_hash(rows[0]['password'],request.form.get('password')): 
            return render_template('login.html', var = 2, username = request.form.get('username'))
        
        session['user_id'] = rows[0]['user_id']

        return redirect('/')

    return render_template('login.html', var = 0)

@app.route('/register', methods=["POST", "GET"])
def register():
    if request.method == 'POST': 
        db.execute('INSERT INTO register1(username, password) VALUES (?, ?)',
                   request.form.get('Username'), generate_password_hash(request.form.get('password')))
        
        rows = db.execute('SELECT * FROM register1 WHERE username = ?', request.form.get('Username'))

        #Logging user in 
        session["user_id"] = rows[0]["user_id"]

        return redirect("/")

    return render_template('register.html')

#Budget categories 
budget_categories_list = []

@app.route("/") 
@login_required
def index():
    rows = db.execute('SELECT * FROM account5'); 
    account = db.execute('SELECT * FROM register1 WHERE user_id = ?', session['user_id'])
    return render_template('index.html', account = rows, balance = account[0]['balance'],budget_categories = budget_categories_list)

#Formatting date and time to day-month-year hour:minute
formatted_datetime = datetime.datetime.now().strftime("%d-%m-%Y %H:%M")

@app.route("/income", methods=['GET', 'POST'])
def income():
    if request.method == 'POST':
        description = request.form.get('Description')
        amount = int(request.form.get('Amount'))

        db.execute('INSERT INTO account5 (description, amount, type, date_time) VALUES (?, ?, ?, ?)',
                    description, amount,"Income", formatted_datetime)
        db.execute('UPDATE register1 SET balance = balance + ? WHERE user_id = ?', amount, session['user_id'])
        return redirect(url_for('index'))
    return render_template('income.html')

@app.route("/expense", methods=['GET', 'POST'])
def expense(): 
    if request.method == 'POST': 
        description = request.form.get('Description')
        amount = int(request.form.get('Amount'))
        db.execute('INSERT INTO account5 (description, amount, type, date_time) VALUES (?, ?, ?, ?)', 
                    description, amount, "Expense", formatted_datetime)
        db.execute('UPDATE register1 SET balance = balance - ? WHERE user_id = ?',
                   amount, session['user_id'])
        return redirect(url_for('index'))
    return render_template('expense.html')

@app.route('/clear')
def clear(): 
    db.execute('DELETE FROM ACCOUNT5')
    db.execute('UPDATE register SET balance = 0 WHERE user_id = ?',
               session['user_id'])
    return redirect(url_for('index'))

@app.route('/data', methods=['GET','POST'])
def data(): 
    data = request.get_json()
    with open('data1.csv', 'w') as file: 
        csv_writer = csv.writer(file)
        csv_writer.writerows(data)

@app.route('/export', methods=['GET','POST'])
def export():
    path='data1.csv'
    return send_file(
        path, 
        as_attachment=True,
        download_name='data1.csv',
        mimetype='text/csv')

@app.route('/logout')
def logout(): 
    session.clear()
    db.execute('DELETE FROM ACCOUNT5')
    
    return redirect(url_for('login'))


if __name__  == "__main__": 
    app.run(debug=True)
