let expenses = [];
let chart;

// Load data
window.onload = function () {
  let saved = localStorage.getItem("expenses");

  if (saved) {
    expenses = JSON.parse(saved);
  }

  renderExpenses();
  renderChart();
};

function addExpense() {
  let amount = Number(document.getElementById("amount").value);
  let note = document.getElementById("note").value;
  let category = document.getElementById("category").value;

  if (!amount || note === "") return;

  expenses.push({ amount, note, category });

  saveData();
  renderExpenses();
  renderChart();

  document.getElementById("amount").value = "";
  document.getElementById("note").value = "";
}

function renderExpenses() {
  let list = document.getElementById("list");
  list.innerHTML = "";

  let filter = document.getElementById("filter").value;

  let total = 0;

  expenses.forEach((expense, index) => {
    if (filter !== "All" && expense.category !== filter) return;

    total += expense.amount;

    let li = document.createElement("li");

    let text = document.createElement("span");
    text.textContent =
      expense.amount + " Tsh - " + expense.note + " (" + expense.category + ")";

    let btn = document.createElement("button");
    btn.textContent = "Delete";

    btn.onclick = function () {
      expenses.splice(index, 1);
      saveData();
      renderExpenses();
      renderChart();
    };

    li.appendChild(text);
    li.appendChild(btn);

    list.appendChild(li);
  });

  document.getElementById("total").textContent =
    "Total: " + total + " Tsh";
}

function renderChart() {
  let categories = {};

  expenses.forEach(item => {
    if (!categories[item.category]) {
      categories[item.category] = 0;
    }
    categories[item.category] += item.amount;
  });

  let labels = Object.keys(categories);
  let data = Object.values(categories);

  if (chart) chart.destroy();

  chart = new Chart(document.getElementById("myChart"), {
    type: "pie",
    data: {
      labels: labels,
      datasets: [
        {
          data: data
        }
      ]
    }
  });
}

function saveData() {
  localStorage.setItem("expenses", JSON.stringify(expenses));
}