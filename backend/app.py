from flask import Flask, jsonify
import pandas as pd
from sklearn.linear_model import LinearRegression

app = Flask(__name__)

@app.route("/")
def home():
    return "Smart Expense Tracker Backend Running"

@app.route("/predict")
def predict():

    data = pd.read_csv("datasets/expenses.csv")

    X = data[["Month"]]
    y = data["Expense"]

    model = LinearRegression()
    model.fit(X, y)

    prediction = model.predict([[11]])

    return jsonify({
        "predicted_expense": round(float(prediction[0]), 2)
    })

if __name__ == "__main__":
    app.run(debug=True)
