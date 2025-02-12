
const balanceEl = document.getElementById("balance");
const lifetimeIncomeEl = document.getElementById("lifetime-income");
const transactionContainer = document.getElementById("transaction-container");
const activityInput = document.getElementById("activity");
const amountInput = document.getElementById("amount");
const addIncomeButton = document.getElementById("add-income");
const addCostButton = document.getElementById("add-cost");
const toggleTransitionBtn = document.getElementById("toggle-transition-btn");
const transitionSection = document.querySelector(".add-transition");

let balance = 0;
let lifetimeIncome = 0;


function updateUI() {
    balanceEl.textContent = `৳${balance.toFixed(2)}`;
    lifetimeIncomeEl.textContent = `৳${lifetimeIncome.toFixed(2)}`;
}

function addTransaction(activity, amount, type) {
    const transaction = document.createElement("div");
    transaction.classList.add("transaction");
    const details = document.createElement("div");
    details.innerHTML = `
        <p>${activity}</p>
        <p class="${type === "income" ? "income" : "cost"}">৳${amount.toFixed(2)}</p>
    `;

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delbtn");
    deleteButton.textContent = "X";
    deleteButton.addEventListener("click", () => {
        if (type === "income") {
            balance -= amount;
            lifetimeIncome -= amount;
        } else {
            balance += amount;
        }
        transaction.remove();
        updateUI();
    });

    transaction.appendChild(details);
    transaction.appendChild(deleteButton);
    transactionContainer.prepend(transaction);
}


toggleTransitionBtn.addEventListener("click", () => {
    transitionSection.classList.toggle("visible");
    transitionSection.classList.toggle("hidden");
    toggleTransitionBtn.classList.toggle("rotate");
});


addIncomeButton.addEventListener("click", () => {
    const activity = activityInput.value.trim();
    const amount = parseFloat(amountInput.value);

    if (!activity || isNaN(amount) || amount <= 0) {
        alert("Please enter a valid activity and amount.");
        return;
    }

    balance += amount;
    lifetimeIncome += amount;
    addTransaction(activity, amount, "income");

    activityInput.value = "";
    amountInput.value = "";
    updateUI();
});

addCostButton.addEventListener("click", () => {
    const activity = activityInput.value.trim();
    const amount = parseFloat(amountInput.value);

    if (!activity || isNaN(amount) || amount <= 0 || balance - amount < 0) {
        alert("Insufficient balance!");
        return;
    }

    balance -= amount;
    addTransaction(activity, amount, "cost");

    activityInput.value = "";
    amountInput.value = "";
    updateUI();
});
updateUI();
