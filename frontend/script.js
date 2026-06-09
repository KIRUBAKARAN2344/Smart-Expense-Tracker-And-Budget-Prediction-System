let income = 0;
let totalExpense = 0;

document.getElementById("income").addEventListener("change", function () {
    income = Number(this.value);

    document.getElementById("totalIncome").innerText = income;

    document.getElementById("remainingBudget").innerText =
        income - totalExpense;
});

function addExpense() {

let amount =
    Number(document.getElementById("amount").value);

totalExpense += amount;

document.getElementById("totalExpense").innerText =
    totalExpense;

document.getElementById("remainingBudget").innerText =
    income - totalExpense;

let predictedExpense =
    Math.round(totalExpense * 1.10);

document.getElementById("prediction").innerText =
    "₹" + predictedExpense;

document.getElementById("amount").value = "";

}
