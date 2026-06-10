let income = 0;
let totalExpense = 0;

document.getElementById("income").addEventListener("input", function () {

    income = Number(this.value);

    document.getElementById("totalIncome").innerText = income;

    document.getElementById("remainingBudget").innerText =
        income - totalExpense;
});

function addExpense() {

    let category = document.getElementById("category").value;

    let amount = Number(document.getElementById("amount").value);

    if (category === "" || amount <= 0) {
        alert("Please enter valid expense details");
        return;
    }

    totalExpense += amount;

    document.getElementById("totalExpense").innerText =
        totalExpense;

    document.getElementById("remainingBudget").innerText =
        income - totalExpense;

    // Budget Prediction
    let prediction = Math.round(totalExpense * 1.1);

    document.getElementById("prediction").innerText =
        prediction;

    // Add expense to table
    let row = `
        <tr>
            <td>${category}</td>
            <td>₹${amount}</td>
        </tr>
    `;

    document.getElementById("expenseTable").innerHTML += row;

    // Clear inputs
    document.getElementById("category").value = "";
    document.getElementById("amount").value = "";
}
