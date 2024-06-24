document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    let currentInput = '';
    let previousInput = '';
    let operation = null;
    let isOperatorClicked = false;

    const buttons = document.querySelectorAll('.button');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const buttonId = button.id;
            const buttonText = button.textContent;

            if (buttonId === 'clear') {
                currentInput = '';
                previousInput = '';
                operation = null;
                display.textContent = '0';
                isOperatorClicked = false;
            } else if (buttonId === 'equals') {
                if (operation && previousInput !== '' && currentInput !== '') {
                    currentInput = operate(previousInput, currentInput, operation);
                    display.textContent = currentInput;
                    previousInput = '';
                    operation = null;
                    isOperatorClicked = false;
                }
            } else if (['add', 'subtract', 'multiply', 'divide'].includes(buttonId)) {
                if (currentInput !== '') {
                    if (previousInput !== '') {
                        currentInput = operate(previousInput, currentInput, operation);
                        display.textContent = currentInput;
                    }
                    previousInput = currentInput;
                    currentInput = '';
                    operation = buttonId;
                    isOperatorClicked = true;
                    display.textContent += ` ${buttonText} `;
                }
            } else {
                if (isOperatorClicked) {
                    currentInput = buttonText;
                    isOperatorClicked = false;
                } else {
                    currentInput += buttonText;
                }
                display.textContent += buttonText;
            }
        });
    });

    function operate(a, b, op) {
        a = parseFloat(a);
        b = parseFloat(b);
        switch (op) {
            case 'add':
                return (a + b).toString();
            case 'subtract':
                return (a - b).toString();
            case 'multiply':
                return (a * b).toString();
            case 'divide':
                return (a / b).toString();
            default:
                return b;
        }
    }
});