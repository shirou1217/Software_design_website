// Todo 3 : Write some function to handle the pass value from HTML
//console.log("Fighting!");
// Global variable to record whether to reset calculator
var resetCalculator = true;

// Function to handle appending characters to the screen
function appendToScreen(value) {
    var screen = document.getElementById('screen');
    if (value === 'C') {
        screen.value = '0'; // Reset to 0 when 'C' is pressed
        resetCalculator = true;
    } 
    // Check if the input is a number and the current value is '0'
    // else if (('+-*/'.includes(value)) && screen.value.slice(-1) === '0') {
    //     // Display only the number without appending '0'
    //     screen.value = screen.value.slice(0, -1) + value;
    // }
    // Check if the last character is '0' and the second to last character is an operator
    // else if (value !== '0' && screen.value.slice(-1) === '0' && ('+-*/'.includes(screen.value.slice(-2, -1)))) {
    //     screen.value = screen.value.slice(0, -1) + value; // Replace '0' with the input number
    // }
    
    else if (value === '=') {
        calculate(); // Start calculation when '=' is pressed
    } else {
        if (value !== '0' && screen.value.slice(-1) === '0' && ('+-*/'.includes(screen.value.slice(-2, -1)))) {
            //screen.value = screen.value.slice(0, -1) + value; // Replace '0' with the input number
            if(screen.value==='0'){
                screen.value ='0'+screen.value.slice(-1);
            }
            else {
                screen.value = screen.value.slice(0, -1);
            }
            
        }
        if (screen.value === '0') {
            // Replace '0' with the input number
           resetCalculator = true;
       }
        if (resetCalculator) {
            screen.value = '';
            resetCalculator = false;
        }
        screen.value += value;
    }
}

// Function to clear the screen
function clearScreen() {
    document.getElementById('screen').value = '0';
}

// Function to calculate the expression
function calculate() {
    try {
        var expression = document.getElementById('screen').value;
        // Check for leading zeros in numbers
        if (/(\D|^)0+\d/.test(expression)) {
            throw new Error('error');
        }

        var result = eval(expression);
        document.getElementById('screen').value = result;
        resetCalculator = true;
    } catch (error) {
        if (error instanceof SyntaxError || error instanceof ReferenceError) {
            document.getElementById('screen').value = 'error';
            resetCalculator = true;
        } else {
           // Print the error message to the console
           console.error(error.message);
           document.getElementById('screen').value = 'error';
           resetCalculator = true;
        }
    }
}

// Event listener for keydown event
document.addEventListener('keydown', function(event) {
    var key = event.key;
    var validKeys = ['0','1','2','3','4','5','6','7','8','9','+','-','*','/','(',')','.','Enter','Backspace','Escape'];
    if (validKeys.includes(key)) {
        event.preventDefault();
        if (key === 'Enter') {
            calculate();
        } else if (key === 'Backspace') {
            var screen = document.getElementById('screen');
            if (screen.value.length === 1) {
                screen.value = '0'; // Display '0' if the screen is empty
            } else {
                screen.value = screen.value.slice(0, -1);
            }
        } else if (key === 'Escape') {
            clearScreen();
        } else {
            appendToScreen(key);
        }
    }
});
