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

    document.getElementById("amount").value = "";
}
