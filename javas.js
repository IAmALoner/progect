'use strict';
let money, time;
function start() {
    money=+prompt("Ваш бюджет на месяц?", '');
    time = prompt("Введите дату в формате YYYY-MM-DD", '');
    while (isNaN(money) || money=="" || money==null) {
        money=+prompt("Ваш бюджет на месяц?", '');
    }
}
start();
let appData = {
    budget: money,
    timeData: time,
    expenses: {},
    optionalExpenses: {},
    income: [],
    savings: true,
    chooseExpenses: function() {
        for (let i = 0; i<2; i++) {
            let a = prompt("Введите обязательную статью расходов в этом месяце", ''),
                b = prompt("Во сколько обойдется?", '');
            if (typeof(a)==='string' && typeof(a) != null && typeof(b) != null && a!='' && b!='' && a.length <50) {
                appData.expenses[a]=b;
            } else {
                i--;
            }
        };
    },
    detectDayBudget: function() {
        appData.moneyPerDay = (appData.budget / 30).toFixed();
        alert('Ежедневный бюджет:' + appData.moneyPerDay + 'руб');
    },
    detectLevel: function() {
        if (appData.moneyPerDay <100) {
            console.log('Минимальный уровень достатка');
        } else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 200) {
           console.log("Средний уровень достатка");
        } else if (appData.moneyPerDay> 2000) {
            console.log("Высокий уровень достатка");
        } else {
           console.log("Произошла ошибка!");
        }
    },
    checkSavings: function() {
        if (appData.savings == true) {
            let save = +prompt('Какова сумма накоплений?', ''),
                percent = +prompt('Под какой процент?', '');
            appData.monthIncome = save/100/12*percent;
            alert('Доход в месяц с вашего депозита: ' + appData.monthIncome)
        }
    },
    chooseOptExpenses: function() {
        for (let i=0; i<3; i++) {
            let questionOptExpenses = prompt('Статья необязательных расходов?', '');
            appData.optionalExpenses[i] = questionOptExpenses;
        }
    },
    chooseIncome: function() {
        for (let i=0; i<1; i++) {
            let items = prompt("Что принесет дополнительный доход? (Укажите через запятую)", "");
            if (typeof(items)==='string' && typeof(items) != null && items!='') {
                appData.income = items.split(', ');
                appData.income.push(prompt('Мейби еще чет?)'));
                appData.income.sort();
            } else {
                i--
            }
        }
        appData.income.forEach(function(item,i) {
            alert('Способы доп. заработка: ' + (i+1) + '-' + item);
        });
    }
};
for (let i in appData) {
    console.log('Наша программа вклчает в себя:' + i + ' - ' + appData[i]);
};