from sklearn.linear_model import LinearRegression
import numpy as np

months = np.array([1, 2, 3, 4, 5, 6]).reshape(-1, 1)
expenses = np.array([10000, 12000, 15000, 17000, 18000, 20000])

model = LinearRegression()
model.fit(months, expenses)

next_month = np.array([[7]])
prediction = model.predict(next_month)

print("Predicted Expense for Next Month: ₹", int(prediction[0]))
