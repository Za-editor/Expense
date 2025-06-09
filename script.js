const incomeForm = document.querySelector("#income-form");
const incomeInput = document.querySelector("#income-description");
const incomeAmountInput = document.querySelector("#income-amount");
const expenseForm = document.querySelector("#expense-form");
const expenseInput = document.querySelector("#expense-description");
const amountInput = document.querySelector("#expense-amount");
const categoryInput = document.querySelector("#expense-category");
const transactionList = document.querySelector("#transaction-history");
const totalExpense = document.querySelector("#total-expenses");
const totalIncome = document.querySelector("#total-income");
const balance = document.querySelector("#balance");
const clearAllBtn = document.querySelector("#clear");

expenseForm.addEventListener("click", function (event) {
  event.preventDefault();

  const description = expenseInput.value.trim();
  const amount = parseFloat(amountInput.value.trim());
  const category = categoryInput.value;
  const type = "Income";

  if (description === "" || isNaN(amount) || amount <= 0) {
    alert("Please enter a valid expense description and amount.");
    return;
  }

  addTransaction(description, amount, type, category);
  showNotification("Transaction added successfully!");
  updateSummary();
  clearInputs();
});

incomeForm.addEventListener("click", function (event) {
  event.preventDefault();

  const description = incomeInput.value.trim();
  const amount = parseFloat(incomeAmountInput.value.trim());
  const category = "Income";
  const type = "Income";

  if (description === "" || isNaN(amount) || amount <= 0) {
    alert("Please enter a valid income description and amount.");
    return;
  }

  addTransaction(description, amount, type, category);
  showNotification("Transaction added successfully!");
  updateSummary();
  clearInputs();
});

function addTransaction(description, amount, type, category) {
  const transactionRow = document.createElement("tr");

  transactionRow.innerHTML = `
    <td>${description}</td>
    <td>${category}</td>
    <td>${amount.toFixed(2)}</td>
    <td>${type}</td>
    <td><button class="delete-btn"><i class="fas fa-trash"></i></button></td>
`;

  transactionList.appendChild(transactionRow);

  transactionRow
    .querySelector(".delete-btn")
    .addEventListener("click", function () {
      transactionRow.remove();
      updateSummary();
    });
}

function updateSummary() {
  let totalExpenses = 0;
  let totalIncomes = 0;

  const transactions = transactionList.querySelectorAll("tr");

  transactions.forEach(function (transaction) {
    const amount = parseFloat(transaction.children[2].textContent);
    const category = transaction.children[1].textContent;

    if (category === "Income") {
      totalIncomes += amount;
    } else {
      totalExpenses += amount;
    }
  });

  totalExpense.textContent = totalExpenses.toFixed(2);
  totalIncome.textContent = totalIncomes.toFixed(2);
  balance.textContent = (totalIncomes - totalExpenses).toFixed(2);

  // Apply positive/negative class
  if (balance >= 0) {
    balance.classList.remove("negative");
    balance.classList.add("positive");
  } else {
    balance.classList.remove("positive");
    balance.classList.add("negative");
  }
}

function clearInputs() {
  expenseInput.value = "";
  amountInput.value = "";
  categoryInput.value = "Expense";
  incomeInput.value = "";
  incomeForm.value = "";
}

function showNotification(message) {
  const notification = document.querySelector("#notification");
  notification.textContent = message;
  notification.classList.remove("hidden");

  setTimeout(function () {
    notification.classList.add("hidden");
  }, 2000);
}

window.addEventListener("load", function () {
  expenseInput.focus();
});

clearAllBtn.addEventListener("click", function () {
  transactionList.innerHTML = "";
  totalExpense.textContent = "0.00";
  totalIncome.textContent = "0.00";
  balance.textContent = "0.00";
  balance.classList.remove("positive", "negative");
  showNotification("All transactions cleared!");
});
