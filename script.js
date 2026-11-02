
const form = document.getElementById("transaction-form");
const descriptionInput = document.getElementById("description");
const amountInput = document.getElementById("amount");
const typeInput = document.getElementById("type");

const balanceDisplay = document.getElementById("balance");
const incomeDisplay = document.getElementById("income");
const expenseDisplay = document.getElementById("expense");
const transactionList = document.getElementById("transaction-list");

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

function updateDisplay() {
    let totalIncome = 0;
    let totalExpense = 0;

    transactionList.innerHTML = "";

    if (transactions.length === 0) {
        transactionList.innerHTML =
            '<li class="empty-message">No transactions yet.</li>';
    }

    transactions.forEach((transaction, index) => {
        if (transaction.type === "income") {
            totalIncome += transaction.amount;
        } else {
            totalExpense += transaction.amount;
        }

        const li = document.createElement("li");

        li.innerHTML = `
            <span>${transaction.description}</span>
            <span style="color: ${transaction.type === "income" ? "green" : "red"}">
                ${transaction.type === "income" ? "+" : "-"}₹${transaction.amount.toFixed(2)}
            </span>
            <button type="button" class="delete-btn" data-index="${index}"
                style="width:auto;padding:7px 10px;background:#dc5555;">
                Delete
            </button>
        `;

        transactionList.appendChild(li);
    });

    const balance = totalIncome - totalExpense;

    balanceDisplay.textContent = `₹${balance.toFixed(2)}`;
    incomeDisplay.textContent = `₹${totalIncome.toFixed(2)}`;
    expenseDisplay.textContent = `₹${totalExpense.toFixed(2)}`;

    localStorage.setItem("transactions", JSON.stringify(transactions));
}

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const description = descriptionInput.value.trim();
    const amount = Number(amountInput.value);
    const type = typeInput.value;

    if (description === "" || !Number.isFinite(amount) || amount <= 0) {
        alert("Please enter a valid description and amount.");
        return;
    }

    const transaction = {
        description: description,
        amount: amount,
        type: type
    };

    transactions.push(transaction);

    updateDisplay();

    form.reset();
});

transactionList.addEventListener("click", function(event) {
    if (event.target.classList.contains("delete-btn")) {
        const index = Number(event.target.dataset.index);

        transactions.splice(index, 1);

        updateDisplay();
    }
});

updateDisplay();
