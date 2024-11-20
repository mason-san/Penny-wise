// for all the category names to send to app.py
let budgetCategories = []; 

//setting up local storage
localStorage.getItem('budgetDiv', '');
localStorage.getItem('expenseLiIndex', ''); 

//autofocus on budget tab. 
document.querySelector('#addBudget').onclick = function(){
    setTimeout(function(){
        document.querySelector('#floatingInput').focus();
    },100);
    console.log('hi world');
}

//autofocus on expense tab. 
document.querySelector('#Expense').onclick = function(){
    setTimeout(function(){
        document.querySelector('#floatingInput1').focus();
    },100);
}

//index of li 
var indexLi = 0;  

//amount of each category. 
let amount = 0; 
let amount25 = 0; 
let amount50 = 0; 
let amount75 = 0; 

document.querySelector('#addCategory').onclick = function(event){
    let categoryInput = document.querySelector('#floatingInput');
    //when input of category is empty
    if (categoryInput.value== ''){
        let errorDiv = document.createElement('div'); 
        errorDiv.textContent = 'This Field Is Required'; 
        errorDiv.setAttribute('style','border-radius: 12px; background-color: red; color: white; padding: 10px; text-align: center;')
        categoryInput.parentNode.insertBefore(errorDiv,categoryInput.nextSibling);
        event.preventDefault();
        return 
    }
    //Creating that div. 
    const div = document.createElement("div");
    div.classList.toggle('tab'); 
    const div1 = document.createElement("div"); 
    div.appendChild(div1);
    div1.classList.toggle('font'); 
    div1.innerHTML = document.querySelector('#floatingInput').value;
    //adding a unique identifier so that budgetCategories can take when reloading the page
    div1.setAttribute('id','budget-categories-label');
    //adding to the budget-category array
    budgetCategories.push(document.querySelector('#floatingInput').value); 
    const div2 = document.createElement("div"); 
    const attributes = {
     "class" : "progress",
     role : "progressbar", 
     "aria-label": "Success example", 
     "aria-valuenow" : "0", 
     "aria-valuemin" : "0", 
     "aria-valuemax" : "100", 
     "style" : "width: 60%; height: 80%; display: flex; justify-content: space-between; position: relative;"
    }
    for (const key in attributes){
     div2.setAttribute(key, attributes[key]);
    } 
    div.classList.toggle('budget'); 
    console.log('success');
    const div3 = document.createElement('div'); 
    const attributes1 = {
     "class" : `progress-bar bg-success tab-${indexLi}`, 
     "style" : `width:0%; font-size: 23px;`
    }
    for (const keys in attributes1){
     div3.setAttribute(keys, attributes1[keys]); 
    }
    div3.innerHTML = ''; 
    const span1 = document.createElement('span'); 
    span1.innerHTML = document.querySelector('.category-amount').value; 
    span1.setAttribute('style','color: black; font-size: 20px; position: absolute; right: 5px;');      
    div2.appendChild(div3);
    div2.appendChild(span1); 
    div.appendChild(div2);  

    //saving and available for use when reloaded
    //setting on local storage the parent div
    localStorage.setItem("divStructure",JSON.stringify(div.outerHTML)); 

    //checking if the div is right from local storage
    let budgetDiv = localStorage.getItem("divStructure");
    console.log('the div is ', budgetDiv);

    if (document.querySelector('#addBudget') != null){
     document.querySelector('.budget-btn').setAttribute('class','budget-btn clicked');
     document.querySelector('.budg').setAttribute('class', 'budg clicked');
    }
    document.querySelector('.budget-island').appendChild(div); 
    
    //Update the dropdown menu
    const dropdown = document.querySelector('.expense-budget');
    dropdown.innerHTML= ''; //clear existing items 

    //the expense amount of user. 
    var expense_amount = 0; 

    budgetCategories.forEach((category , key) => {
        const li = document.createElement('li');
        li.innerHTML = `<button  class="dropdown-item" >${category}</button>`;
        li.setAttribute('style','padding: 10px; font-size: 14px; border-radius: 12px;');
        li.setAttribute('onclick', `ExpenseAdder(${expense_amount}, ${key})`);
        li.setAttribute('class',`li-${key}`);
        dropdown.appendChild(li);
        console.log('Success on budget_categories being in here');
    });
    amount = document.querySelector('.category-amount').value;
    amount25 = (25 / 100) * amount; 
    amount50 = (50 / 100) * amount; 
    amount75 = (75 / 100) * amount;
   //updating index of list.  
    indexLi += 1; 
}
//tryna get the localstorage data
let budgetDiv = JSON.parse(localStorage.getItem('divStructure')); 
let temporaryContainer = document.createElement('div');
temporaryContainer.innerHTML = budgetDiv;
//checking if the temporary container has any children left. 
while (temporaryContainer.firstChild){
    document.querySelector('.budget-island').appendChild(temporaryContainer.firstChild);
}

//checking if the div is not empty  
if (budgetDiv != null){
    //setting the add button to the top of the bar
    document.querySelector('.budget-btn').setAttribute('class','budget-btn clicked');
    document.querySelector('.budg').setAttribute('class', 'budg clicked');
    //Update the dropdown menu
    const dropdown = document.querySelector('.expense-budget');
    dropdown.innerHTML= ''; //clear existing items 
 
    //the expense amount of user. 
    var expense_amount = 0; 
    
    //populating budgetCategories array
    let Label = document.getElementById('budget-categories-label').textContent; 
    budgetCategories.push(Label);

    budgetCategories.forEach((category , key) => {
        const li = document.createElement('li');
        //getting the tabnumber of budget category 

        li.innerHTML = `<button  class="dropdown-item" >${category}</button>`;
        li.setAttribute('style','padding: 10px; font-size: 14px; border-radius: 12px;');
        li.setAttribute('onclick', `ExpenseAdder(${expense_amount}, ${key})`);
        li.setAttribute('class',`li-${key}`);
        dropdown.appendChild(li);
        console.log('Success on budget_categories being in here');
    });
    amount = document.querySelector('.category-amount').value;
    amount25 = (25 / 100) * amount; 
    amount50 = (50 / 100) * amount; 
    amount75 = (75 / 100) * amount;

    //updating index of list.  
    indexLi += 1; 

    //Creating a clear button 
    
}


let btn=document.querySelector('#btn');
let sidebar = document.querySelector('.sidebar');
btn.onclick= function(){
    sidebar.classList.toggle('active');
};

let type = document.querySelectorAll('td:nth-child(3)');
type.forEach(element => {
    if (element.innerHTML == "Income"){
        element.style.backgroundColor = "green";  
        element.style.borderRadius = "12px"; 
    } else if (element.innerHTML == "Expense"){
        element.style.backgroundColor = "red"; 
        element.style.borderRadius = "12px"; 
    };
});


document.querySelector('#addBudget').addEventListener('mouseover', function(){
    document.querySelector('.budg').style.opacity='1'; 
})
document.querySelector('#addBudget').addEventListener('mouseout',function(){
    document.querySelector('.budg').style.opacity = '0 '; 
})
//Writing table data to data1.csv
let table = document.querySelector('div table'); 
let rows = table.rows;
let data = [];  
for (let i = 0; i < rows.length; i++){
    let row = []; 
    for (let j = 0 ; j < rows[i].cells.length; j++){
        row.push(rows[i].cells[j].innerHTML);
    }
    data.push(row);
}
fetch('/data', {
    method: 'POST', 
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
})
.then(response => response.json())
.then(result => {
    console.log("Success", result); 
})
.catch(error => {
    console.error('Error:',error); 
})

//calculating the expense amount
function ExpenseAdder(expense, indexLi){
    //update expense to the user-entered value
    expense += parseFloat(document.querySelector('#floatingInput2').value); 

    //update expense_amount
    expense_amount = expense;

    //update the button onclick function call  
    document.querySelector(`.li-${indexLi}`).setAttribute('onclick',`ExpenseAdder(${expense_amount}, ${indexLi})`);

    //selecting the correct div
    let div = document.querySelector(`.tab-${indexLi}`); 

    //outerDiv to change 
    let outerDiv = document.querySelector('.tab'); 

    //checking if the spending has gone above 25%
    if (expense == amount25){
        div.setAttribute('style', 'width: 25%; font-size: 23px;');
        div.innerHTML = '25%'; 
        localStorage.setItem('divStructure', JSON.stringify(outerDiv.outerHTML)); 
    }
    //checking if the spending has gone above 50%
    else if(expense == amount50){
        div.setAttribute('style','width: 50%; font-size: 23px;'); 
        div.innerHTML = '50%'; 
        localStorage.setItem('divStructure', JSON.stringify(outerDiv.outerHTML)); 
    }

    //checkinf if the spending has gone above 75% 
    else if (expense == amount75){
        div.setAttribute('style', 'width: 75%; font-size: 23px;'); 
        div.innerHTML = "75%"; 
        localStorage.setItem('divStructure', JSON.stringify(outerDiv.outerHTML)); 
    }

    else if (expense == expense){
        div.setAttribute('style','width:100%; font-size: 23px;'); 
        div.innerHTML = "100%"; 
        localStorage.setItem('divStructure', JSON.stringify(outerDiv.outerHTML)); 
    }
}
//updating budget div of budget tab
//when the '+' button is clicked 
document.querySelector('.budget-btn').onclick = function(){
    //selecting the input tag
    let categoryAmount = document.querySelector('.category-amount'); 
    categoryAmount.addEventListener('input',function(event){
        let inputBudget= event.target.value; 
        let currentBalance = parseInt(document.querySelector('#balanceValue').innerHTML);
        //changing the value at balance div 
        if ((currentBalance - inputBudget) < 0){
            console.log('less than 0'); 
        }
        else{
            document.querySelector('.balance').innerHTML = `${currentBalance - inputBudget}`; 
        }
    })
}

//check when modal thingy is closed 
document.querySelector('.close01').addEventListener('click', function(){
    document.querySelector('.balance').innerHTML = parseInt(document.querySelector('#balanceValue').innerHTML);    
})

//Deleting Local storage when logout button on sidebar is clicked
document.querySelector('#Logout').onclick = localStorage.clear();  
