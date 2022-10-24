const currentNumber = document.querySelector('.currentNumber');

const previousNumber = document.querySelector('.previousNumber p');

const mathSign = document.querySelector('.mathSign');

const numbersButtons = document.querySelectorAll('.number');

const operatorsButtons = document.querySelectorAll('.operator');

const equalsButton = document.querySelector('.equals');
const clearButton = document.querySelector('.clear');
const calculatorHistory = document.querySelector('.history');
const clearHistoryButton = document.querySelector('#clrHistoryButton');
let result = ''


function displayNumber() {
    if (this.textContent === '.' && currentNumber.innerHTML === '') {
        currentNumber.innerHTML = '0.';
    } else {
        currentNumber.innerHTML = currentNumber.innerHTML + this.textContent;
    }
}


function operate() {
    const unaryMinus = currentNumber.innerHTML === '' && previousNumber.innerHTML === '' && this.textContent === ('-')
    if (unaryMinus) {
        currentNumber.innerHTML = '-';
        return
    } else if (currentNumber.innerHTML === '') {
        return;
    }
    if (mathSign.innerHTML !== '') {
        showResult()
    }

    previousNumber.innerHTML = currentNumber.innerHTML;
    mathSign.innerHTML = this.textContent;
    currentNumber.innerHTML = ''

}


function showResult() {
    if (previousNumber.innerHTML === '' || currentNumber.innerHTML === '') return;
    const a = parseFloat(currentNumber.innerHTML);
    const b = parseFloat(previousNumber.innerHTML);
    const operator = mathSign.innerHTML

    switch (operator) {
        case '+':
            result = a + b;
            break;
        case '-':
            result = b - a;
            break;
        case 'x':
            result = a * b;
            break;
        case '/':
            result = b / a;
            break;
        case '2^':
            result = b ** a;
            break;
    }

    addToHistory();

    currentNumber.innerHTML = result;
    previousNumber.innerHTML = ''
    mathSign.innerHTML = '';
}

function addToHistory() {

    clearHistoryButton.id = '';
    newHistoryItem = document.createElement('li');
    newHistoryItem.innerHTML = `${previousNumber.innerHTML} ${mathSign.innerHTML} ${currentNumber.innerHTML} = ${result}`
    calculatorHistory.appendChild(newHistoryItem);
}

function clear() {
    currentNumber.innerHTML = '';
    previousNumber.innerHTML = '';
    mathSign.innerHTML = '';
}

function clearHistory() {
    calculatorHistory.innerHTML = ''
    clearHistoryButton.id = 'clrHistoryButton'
}


// nasluchwanie na buttony //
numbersButtons.forEach((button) => {
    button.addEventListener('click', displayNumber);
})


operatorsButtons.forEach((button) => {
    button.addEventListener('click', operate);
})

equalsButton.addEventListener('click', showResult);

clearButton.addEventListener('click', clear);

clearHistoryButton.addEventListener('click', clearHistory);