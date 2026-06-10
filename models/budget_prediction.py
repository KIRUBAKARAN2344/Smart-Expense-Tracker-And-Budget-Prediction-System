import pandas as pd
from sklearn.linear_model import LinearRegression

# Load dataset
data = pd.read_csv("datasets/expenses.csv")

# Input (Month)
X = data[["Month"]]

# Output (Expense)
y = data["Expense"]

# Train Model
model = LinearRegression()
model.fit(X, y)

# Predict next month
next_month = [[11]]

prediction = model.predict(next_month)

print("Predicted Expense for Month 11:", prediction[0])
