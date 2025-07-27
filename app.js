const form = document.getElementById("budget-form");
const categorySelect = document.querySelector("#category");
const expenseList = document.getElementById("expense-list");
const budgetAmountForm = document.getElementById("budget-amount-form");
const netAmountInput = document.getElementById("net-amount");
const remainingBalanceSpan = document.getElementById("remaining-balance");

let totalBudget = 0;
let remainingBalance = 0;

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

// Handle Adding Expense & Subtracting from Balance
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

    // Create a new list item with delete button
    const li = document.createElement("li");
    li.innerHTML = `
        ${description} - ₹${amount} <span>(${category})</span>
        <button class="delete-btn">Delete</button>
    `;

    expenseList.appendChild(li);

    // Subtract expense from remaining balance
    remainingBalance -= amount;
    remainingBalanceSpan.textContent = remainingBalance;

    form.reset();
});

// Delete expense and update remaining balance
expenseList.addEventListener("click", function(e) {
    if (e.target.classList.contains("delete-btn")) {
        const li = e.target.parentElement;
        const amountText = li.textContent.match(/₹(\d+)/);
        if (amountText) {
            const amount = parseInt(amountText[1]);
            remainingBalance += amount;
            remainingBalanceSpan.textContent = remainingBalance;
        }
        li.remove();
    }
});
