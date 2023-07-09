'use strict';
let start = document.getElementById('start'),
    incomes = document.getElementsByClassName('budget-value')[0],
    dayBudget = document.getElementsByClassName('daybudget-value')[0],
    lvl = document.getElementsByClassName('level-value')[0],
    expensesV = document.getElementsByClassName('expenses-value')[0],
    mbEpxenses = document.getElementsByClassName('optionalexpenses-value')[0],
    addincome = document.getElementsByClassName('income-value')[0],
    moneyOnMonth = document.getElementsByClassName('monthsavings-value')[0],
    moneyOnYear = document.getElementsByClassName('yearsavings-value')[0],
    chooseEpx = document.getElementsByClassName('expenses-item'),
    expItBtn = document.getElementsByTagName('button')[0],
    optExpBtn = document.getElementsByTagName('button')[1],
    countBtn = document.getElementsByTagName('button')[2],
    optExpIt = document.querySelectorAll('.optionalexpenses-item'),
    chooseInc = document.querySelector('.choose-income'),
    checkSav = document.querySelector('#savings'),
    sumV = document.querySelector('.choose-sum'),
    percentV = document.querySelector('.choose-percent'),
    day = document.querySelector('.day-value'),
    month = document.querySelector('.month-value'),
    year = document.querySelector('.year-value');
let money, time;
expItBtn.disabled = true;
optExpBtn.disabled = true;
countBtn.disabled = true;
start.addEventListener('click', function() {
    time = prompt("Введите дату в формате YYYY-MM-DD", '');
    money=+prompt("Ваш бюджет на месяц?", '');
    while (isNaN(money) || money=="" || money==null) {
        money=+prompt("Ваш бюджет на месяц?", '');
    }
    appData.budget = money;
    appData.timeData = time;
    incomes.textContent = money.toFixed();
    year.value = new Date(Date.parse(time)).getFullYear();
    month.value = new Date(Date.parse(time)).getMonth()+1;
    day.value = new Date(Date.parse(time)).getDate();
    expItBtn.disabled = false;
    optExpBtn.disabled = false;
    countBtn.disabled = false;
});
expItBtn.addEventListener('click', function() {
    let sum=0;
    for (let i = 0; i<chooseEpx.length; i++) {
        let a = chooseEpx[i].value,
            b = chooseEpx[++i].value;
        if (typeof(a)==='string' && typeof(a) != null && typeof(b) != null && a!='' && b!='' && a.length <50) {
            appData.expenses[a]=b;
            sum+= +b;
        } else {
            i--;
        }
        expensesV.textContent = sum;
    };
});
optExpBtn.addEventListener('click', function() {
    for (let i=0; i<optExpIt.length; i++) {
        let questionOptExpenses = optExpIt[i].value;
        appData.optionalExpenses[i] = questionOptExpenses;
        mbEpxenses.textContent += appData.optionalExpenses[i] + ' '; 
    }
});
countBtn.addEventListener('click', function() {
    if (appData.budget != undefined) {
        appData.moneyPerDay = ((appData.budget - +expensesV.textContent) / 30).toFixed();
        dayBudget.textContent = appData.moneyPerDay;
        if (appData.moneyPerDay <=100) {
            lvl.textContent = 'Минимальный уровень достатка';
        } else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
           lvl.textContent = "Средний уровень достатка";
        } else if (appData.moneyPerDay >= 2000) {
            lvl.textContent = "Высокий уровень достатка";
        } else {
           lvl.textContent = "Произошла ошибка!";
        }
    } else {
        dayBudget.textContent = 'Произошла ошибка!'
    }
});
chooseInc.addEventListener('input', function() {
    let items = chooseInc.value;
    appData.income = items.split(', ');
    addincome.textContent = appData.income;
});
checkSav.addEventListener('click', function() {
    if (appData.savings == true) {
        appData.savings = false;
    } else {
        appData.savings = true;
    }
});
sumV.addEventListener('input', function() {
    if (appData.savings == true) {
        let sum = +sumV.value,
            percent = +percentV.value;
        appData.monthIncome = sum/100/12*percent;
        appData.yearIncome = sum/100*percent;
        moneyOnMonth.textContent = appData.monthIncome.toFixed(1);
        moneyOnYear.textContent = appData.yearIncome.toFixed(1);
    }
});
percentV.addEventListener('input', function() {
    if (appData.savings == true) {
        let sum = +sumV.value,
            percent = +percentV.value;
        appData.monthIncome = sum/100/12*percent;
        appData.yearIncome = sum/100*percent;
        moneyOnMonth.textContent = appData.monthIncome.toFixed(1);
        moneyOnYear.textContent = appData.yearIncome.toFixed(1);
    }
});
let appData = {
    budget: money,
    timeData: time,
    expenses: {},
    optionalExpenses: {},
    income: [],
    savings: false,
};