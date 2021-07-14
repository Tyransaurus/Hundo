//Wrapper function/method - a function that calls other functions
function getNumbers() {
    //access the webpage and get the values from the inputs
    let startNumber = document.getElementById("startValue").value;
    let endNumber = document.getElementById("endValue").value;

    //checks to make sure both values are integers
    let newStart = parseInt(startNumber);
    let newEnd = parseInt(endNumber);

    //setting up boolean and an empty string for error codes
    let errorState = false;
    let errorMsg = "";

    //this becomes true if the two values are not numbers
    if (isNaN(newStart) || isNaN(newEnd)) {
        errorState = true;
        errorMsg += "Please use numbers<hr/>"
    }

    //this becomes true if the end value is less than the sart value
    if (newStart > newEnd) {
        errorState = true;
        errorMsg += "Start value must be less than end value<hr/>"
    }

    //this becomes true if any value is higher than 10,000 or less than -10000 
    //this sets an upper and lower bound for the loops
    if (newStart > 10000 || newStart < -10000 || newEnd > 10000 || newEnd < -10000) {
        errorState = true;
        errorMsg += "-10,000 and 10,000 are the limits<hr/>"
    }

    //if any of the previous becomes true, a SweetAlert will fire and exit the function
    if (errorState) {
        Swal.fire(
            'Something went wrong',
            `${errorMsg}`,
            'error'
        )
        return;
    }

    //take the start and end values as the bounds for a "for" loop
    //that will create an array and return it
    let numbers = generateNumbers(newStart, newEnd)

    //take the array that was returned and pass it to a function that will display it
    displayNumbers(numbers);
}

//function that takes the values and put them into an array list
function generateNumbers(startValue, endValue) {
    let numbers = [];

    //loop over every number from startValue to endValue
    for (let index = startValue; index <= endValue; index++) {
        numbers.push(index);
    }

    return numbers;
}

// this function exists to display the results to the user
function displayNumbers(numbers) {
    
    //this is create a class to be able to use css if it's even and an empty string
    // so we can send it out to the site
    let className = "even";
    let templateRows = "";

    //this goes through all the numbers in the array
    for (let index = 0; index < numbers.length; index++) {
        let number = numbers[index];

        //this assigns the even class to any numbers that is divisible
        // by 2 with no remainder
        if (number % 2 == 0) {
            className = "even";
        
        // otherwise it will assign an odd class to the number instead
        } else {
            className = "odd";
        }
        //this is to send out the number and class as values of templateRows
        templateRows = templateRows + `<tr><td class="${className}">${number}</td></tr>`;
    }
    //this is to send the values to the webpage
    document.getElementById("output").innerHTML = templateRows;
}