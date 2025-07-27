//targeting
//taregt by id

const form = document.getElementById("budget-form")
//console.log(form);
const categorySelect = document.querySelector("#category");
//console.log(categorySelect);
const container = document.getElementsByClassName("container");
//console.log(container); 
const options = document.querySelectorAll(".category-option");
//console.log(options)
const inputTags = document.getElementsByTagName("input");
//console.log(inputTags);
const expenseList = document.getElementById("expense-list");

// Form submit event listener
form.addEventListener("submit", function(e) {
    e.preventDefault(); // prevent form from refreshing the page

    const description = document.getElementById("description").value;
    const amount = document.getElementById("amount").value;
    const category = categorySelect.value;

    if (description === "" || amount === "") {
        alert("Please fill in all fields!");
        return;
    }

    // Create a new list item

    const li = document.createElement("li");
    li.innerHTML = `
        ${description} - ₹${amount} <span>(${category})</span>
    `;

    // Append to expense list
    expenseList.appendChild(li);

    // Clear form inputs
    form.reset();
});
let totalBudget = 0;
let remainingBalance = 0;

const budgetAmountForm = document.getElementById("budget-amount-form");
const netAmountInput = document.getElementById("net-amount");
const remainingBalanceSpan = document.getElementById("remaining-balance");

// Handle Budget Set
budgetAmountForm.addEventListener("submit", function(e) {
    e.preventDefault();
    const netAmount = parseInt(netAmountInput.value);
    if (isNaN(netAmount) || netAmount <= 0) {
        alert("Please enter a valid budget amount.");
        return;
    }
    totalBudget = netAmount;
    remainingBalance = netAmount;
    remainingBalanceSpan.textContent = remainingBalance;
    netAmountInput.value = ""; // Clear input
});

// Update Add Expense Function
form.addEventListener("submit", function(e) {
    e.preventDefault();

    const description = document.getElementById("description").value;
    const amount = parseInt(document.getElementById("amount").value);
    const category = categorySelect.value;

    if (description === "" || isNaN(amount)) {
        alert("Please fill in all fields!");
        return;
    }

    if (amount > remainingBalance) {
        alert("Expense exceeds remaining balance!");
        return;
    }

    // Create a new list item
    const li = document.createElement("li");
    li.innerHTML = `
        ${description} - ₹${amount} <span>(${category})</span>
    `;

    expenseList.appendChild(li);

    // Subtract expense from remaining balance
    remainingBalance -= amount;
    remainingBalanceSpan.textContent = remainingBalance;

    form.reset();
});
