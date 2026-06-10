let income = 0;
let totalExpense = 0;
let expenseData = {
    Food: 0,
    Transport: 0,
    Shopping: 0,
    Entertainment: 0,
    Education: 0,
    Medical: 0
};

// Update Health Score
function updateHealthScore() {

    if (income > 0) {

        let score = Math.round(
            ((income - totalExpense) / income) * 100
        );

        if (score < 0) {
            score = 0;
        }

        document.getElementById("healthScore").innerText =
            score;
    }
}

// Income Update
document.getElementById("income").addEventListener("input", function () {

    income = Number(this.value);

    document.getElementById("totalIncome").innerText =
        income;

    document.getElementById("remainingBudget").innerText =
        income - totalExpense;

    updateHealthScore();
});

// Add Expense Function
function addExpense() {

    let category =
        document.getElementById("category").value;

    let amount =
        Number(document.getElementById("amount").value);

    if (amount <= 0) {
        alert("Please enter valid expense details");
        return;
    }

    totalExpense += amount;

    document.getElementById("totalExpense").innerText =
        totalExpense;

    document.getElementById("remainingBudget").innerText =
        income - totalExpense;

    // Update Health Score
    updateHealthScore();

    // Add Expense to Table
    let row = `
        <tr>
            <td>${category}</td>
            <td>₹${amount}</td>
        </tr>
    `;

    document.getElementById("expenseTable").innerHTML += row;

    document.getElementById("amount").value = "";
}

// Load AI Prediction From Flask
fetch("/predict")
    .then(response => response.json())
    .then(data => {

        document.getElementById("prediction").innerText =
            data.predicted_expense.toFixed(2);

    })
    .catch(error => {

        console.log("Prediction Error:", error);

    });
