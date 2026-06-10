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
    updateAISuggestion();
});

function updateAISuggestion() {

    let suggestion = "Budget is under control.";

    if (income > 0) {

        let spendingPercentage =
            (totalExpense / income) * 100;

        if (spendingPercentage > 80) {

            suggestion =
            "⚠ Warning: You have spent more than 80% of your income.";

        }
        else if (spendingPercentage > 60) {

            suggestion =
            "⚠ Moderate spending detected. Consider reducing expenses.";

        }
        else {

            suggestion =
            "✅ Excellent! Your spending is well managed.";

        }
    }

    document.getElementById("aiSuggestion").innerText =
        suggestion;
}// Add Expense Function
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
    expenseData[category] += amount;

expenseChart.data.datasets[0].data =
    Object.values(expenseData);

expenseChart.update();

    document.getElementById("totalExpense").innerText =
        totalExpense;

    document.getElementById("remainingBudget").innerText =
        income - totalExpense;

    // Update Health Score
    updateHealthScore();
    updateAISuggestion();

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
const ctx = document.getElementById("expenseChart");

const expenseChart = new Chart(ctx, {
    type: "pie",
    data: {
        labels: Object.keys(expenseData),
        datasets: [{
            data: Object.values(expenseData)
        }]
    }
});
