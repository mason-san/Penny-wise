# Expense Calculator
#### Video Demo:   https://youtu.be/I_KcZ48R4og
#### Description:
I have made an expense calculator web-application. Penny-wise is a a modern expense calculator that can help manage your day-to-day finances. 
### Technical specifications 
I have taken heavy inspiration from the problem set 9 question to set-up the web-application which is using flask framework and sqlite3 database. 
now let's go over each features of Penny-wise. 
### 1. User Log-in functions 
I have made two html pages for the logging in and registration of the user.

I have designed the web-application in such a way that the main index page cannot be accessed unless the user is logged in or if it's a new user, the user must be registered.

This was achieved by using the same mechanism from finance problem in the week 9 problem set.

In helpers.py file, a **login_required** function is written which checks if session[user_id] exists or not and if it doesn't exist, sends the user back to login page. This was the same function that was used in finance problem of problem set 09. 

login.html consist of two input tags of password and username, with a login button. 
I have implemented custom error messages for both username section and password section. 

To acieve this, in login app route I have passed flag variable called **var** which in normal case has the value as zero. 

If the user enters a username which is not present in the database, **render_template** function is called on *login.html* where the flag variable is set to 01. some js code is present in *login.html* which checks if the flag variable is 1 (which means username is not found) and displays the error message **username not found**. 

Similarly, if the password is wrong, the **flag** value is set to 2 and a js code is present to make the password input field as red. 

The problem with this approach is that the username get's reset when password is wrong and the page is rendered again. 
So to solve this, I've made use of jinja if condition to check if the flag value is 2 ( incorrect password ) keep the value of the username using the **value** attribute of **input** html tag. 
Otherwhise (username not found or first time loading the page) don't do anything.   

it also has a small section that asks, "Are you new here?" with a button that will direct you to the register page. 

#### Register Page

It's a fairly simple register page with a username section, password and re-enter password. 

There is some JS code to check if the entered password and re-typed password are the same and the input tag get's a green border when they are the same. 

After registering or logging in, all the information gets entered to a table called **register1** where things like username and passwords are stored. 

After successfully storing all the information, the user is directed to the main index page. 

### 2. Main Page

The main index page head tag consist of all the necessary links. 

The first part of the body part is the **sidebar**. 
I've made the __sidebar__ by taking reference from a youtube video to make the sidebar modern and user-friendly. 
The sidebar consist of 4 sections. 

1. <u>Dashboard</u>: Clicking this button will return you back to the main index page. 

2. <u id="export">Export</u>: Upon clicking this option, **export** app route is executed which makes a file called 'data1.csv' and sends the file to the user for download. 
**data1.csv** consist of all the records of income and expense entered by the user in table format. To write html table data into data1.csv, I made use of simple JS and fetch function or AJAX method to send data from index.html to app.py. the app route in app.py was named **data** which took care of writing the data into **data1.csv**. 

3. <u id="set_budget">Set Budget</u>: Upon clicking this option, a small window appears which consist of 3 elements.
    1. The first, small window that shows the balance after setting the monthly budget for a particular category which updates automatically according to the value entered by the user on the amount tag. 
    2. The second is an input tag where the user must enter the name of the category. eg. food, laundry, entertainment, studies.  
    3. The third is an input tag where the user must enter the monthly budget for the category.
4. <u>Logout</u>: The last button is a logout button that will log the user out and return the user back to the login page. 

<h3> Main Div </h3>

The second part of the main page is the **main** div which consist of a top part with "Balance" which displays the current balance the user has. 
To keep the *balance* as a positive value, I've made use of jinja if-else statement. 

<h3>Income-island</h3>

the second container consist of 3 buttons, Income, Expense and Clear 

1. <u>Income</u> - This button loads up **income.html** which consist of normal head tags that body has and the body part consist of a *form* which has two input tags where the user must enter the description of the Income that they recieved and how much they earned as income. 
I've also used JS to make it so that when the user hovers over the input tags, it gives a small window that describes what the user must do.  

2. <u>Clear</u> - This button clears the entire table of values present at the bottom of the table. 

3. <u>Expense</u> - This button opens up a small window with 'Description' , 'Amount' inputs tags and a dropdown menu called 'Category Items' which consist of all the categories that the user adds in the budget tab. 
<br> eg. Lets say the user has a monthly budget of 500 for food. when the user adds expense as 250 (50% of 500) for lunch on a day, the progress bar goes to 50% automatically on the web-application. I made use of JS to achieve this functionality. Using JS I've already calculated 25%, 50% and 75% of the budget value and once the amount hits any of this number, the css of width is changed to 25%, 50% and 75% respectively.

<h4> Budget_Island</h4>
This section has a small + symbol which is an a tag which upon clicking opens the same budget window that <a href="#set_budget">Set Budget</a> opens. 

<h4> Table </h4>
The next and last section of the index.html page is the table. This table has 4 columns -- Description, Amount, Type, Date. 

**Description**: This column displays the description of the income or expense row. 

**Amount**: This column displays the amount for that specific column.  

**Type**: This column displays the type - Either 'income' or 'expense'. 

**Date** : This column displays the Date the record has been written. 

All this information is written to 'data1.csv' which is available for download by the <a href="#export">export button</a>.  