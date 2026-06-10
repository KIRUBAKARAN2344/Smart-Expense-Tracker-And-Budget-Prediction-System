let income = 0;
let totalExpense = 0;
let transactionCount = 0;

let expenses = [];

let expenseData = {
    Food: 0,
    Transport: 0,
    Shopping: 0,
    Entertainment: 0,
    Education: 0,
    Medical: 0
};

// Pie Chart
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

// Health Score
function updateHealthScore() {

    if (income > 0) {

        let score =
            Math.round(((income - totalExpense) / income) * 100);

        if (score < 0) {
            score = 0;
        }

        document.getElementById("healthScore").innerText = score;
    }
}

// AI Suggestion
function updateAISuggestion() {

    let suggestion = "Budget is under control.";

    if (income > 0) {

        let percentage =
            (totalExpense / income) * 100;

        if (percentage > 80) {

            suggestion =
                "⚠ Warning: You have spent more than 80% of your income.";

        } else if (percentage > 60) {

            suggestion =
                "⚠ Moderate spending detected. Consider reducing expenses.";

        } else {

            suggestion =
                "✅ Excellent! Your spending is well managed.";
        }
    }

    document.getElementById("aiSuggestion").innerText =
        suggestion;
}

// Risk Level
function updateRiskLevel() {

    let risk = "LOW";

    if (income > 0) {

        let percentage =
            (totalExpense / income) * 100;

        if (percentage > 80) {

            risk = "HIGH";

        } else if (percentage > 50) {

            risk = "MEDIUM";
        }
    }

    document.getElementById("riskLevel").innerText =
        risk;
}

// Statistics
function updateStatistics() {

    document.getElementById("transactionCount").innerText =
        transactionCount;

    if (expenses.length > 0) {

        let average =
            totalExpense / expenses.length;

        let highest =
            Math.max(...expenses);

        let lowest =
            Math.min(...expenses);

        document.getElementById("averageExpense").innerText =
            average.toFixed(2);

        document.getElementById("highestExpense").innerText =
            highest;

        document.getElementById("lowestExpense").innerText =
            lowest;
    }
}

// Income Input
document.getElementById("income").addEventListener("input", function () {

    income = Number(this.value);

    document.getElementById("totalIncome").innerText =
        income;

    document.getElementById("remainingBudget").innerText =
        income - totalExpense;

    updateHealthScore();
    updateAISuggestion();
    updateRiskLevel();
});

// Add Expense
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

    transactionCount++;

    expenses.push(amount);

    expenseData[category] += amount;

    expenseChart.data.datasets[0].data =
        Object.values(expenseData);

    expenseChart.update();

    document.getElementById("totalExpense").innerText =
        totalExpense;

    document.getElementById("remainingBudget").innerText =
        income - totalExpense;

    updateHealthScore();
    updateAISuggestion();
    updateRiskLevel();
    updateStatistics();

    let row = `
        <tr>
            <td>${category}</td>
            <td>₹${amount}</td>
        </tr>
    `;

    document.getElementById("expenseTable").innerHTML += row;

    document.getElementById("amount").value = "";
}

// Download CSV Report
function downloadReport() {

    let csv =
        "Category,Amount\n";

    let rows =
        document.querySelectorAll("#expenseTable tr");

    rows.forEach(row => {

        let cols = row.querySelectorAll("td");

        if (cols.length > 0) {

            csv +=
                cols[0].innerText + "," +
                cols[1].innerText.replace("₹", "") +
                "\n";
        }
    });

    let blob =
        new Blob([csv], { type: "text/csv" });

    let link =
        document.createElement("a");

    link.href =
        URL.createObjectURL(blob);

    link.download =
        "expense_report.csv";

    link.click();
}

// AI Prediction
fetch("/predict")
    .then(response => response.json())
    .then(data => {

        document.getElementById("prediction").innerText =
            data.predicted_expense.toFixed(2);

    })
    .catch(error => {

        console.log("Prediction Error:", error);

    });
