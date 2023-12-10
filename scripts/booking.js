/********* create variables *********/
// useful variables might be: the cost per day, the number of days selected, and elements on the screen that will be clicked or will need to be modified. 
// Do any of these variables need to be initialized when the page is loaded? 
// When do they need to be reset or updated?


const costPerFullday = 35;
const costPerHalfday = 20; 
let selectedDays = new Set();
let totalCost = 0; 
let isFullDay = true; 

let calculateCost = document.getElementById("calculated-cost");
let daySelected = document.querySelectorAll(".day-selector li");
let fullButton = document.getElementById("full");
let halfButton = document.getElementById("half");
let clearButton = document.getElementById("clear-button");



/********* colour change days of week *********/
// when the day buttons are clicked, we will apply the "clicked" class to that element, and update any other relevant variables. Then, we can recalculate the total cost.
// added challenge: don't update the dayCounter if the same day is clicked more than once. hint: .classList.contains() might be helpful here!
daySelected.forEach(function(button)  {
    button.addEventListener("click",function(){
        if (!selectedDays.has(this.id)){
            selectedDays.add(this.id);
            this.classList.add("clicked");
            updateCost();
        }
    });
});



/********* clear days *********/
// when the clear-button is clicked, the "clicked" class is removed from all days, any other relevant variables are reset, and the calculated cost is set to 0.
clearButton.addEventListener("click",function() {
    selectedDays.clear();
    totalCost = 0;
    calculateCost.textContent = totalCost;
    daySelected.forEach(function(button) {
        button.classList.remove("clicked");
    });
    fullButton.classList.add("clicked");
    halfButton.classList.remove("clicked");
    isFullDay = true;
});





/********* change rate *********/
// when the half-day button is clicked, set the daily rate to $20, add the "clicked" class to the "half" element, remove it from the "full" element, and recalculate the total cost.
halfButton.addEventListener("click",function(){
    if(isFullDay){
        isFullDay = false;
        halfButton.classList.add("clicked");
        fullButton.classList.remove("clicked");
        updateCost();
    }
    
});



// when the full-day button is clicked, the daily rate is set back to $35, the clicked class is added to "full" and removed from "half", and the total cost is recalculated.
fullButton.addEventListener("click",function(){
    if(isFullDay){
        isFullDay = true;
        fullButton.classList.add("clicked");
        halfButton.classList.remove("clicked");
        updateCost();
    }
});




/********* calculate *********/
// when a calculation is needed, set the innerHTML of the calculated-cost element to the appropriate value
function updateCost(){
    totalCost = selectedDays.size * (isFullDay ? costPerFullday : costPerHalfday);
    calculateCost.textContent = totalCost; 
}

