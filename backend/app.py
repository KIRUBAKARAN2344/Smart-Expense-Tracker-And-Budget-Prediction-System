from flask import Flask, jsonify, send_from_directory
import pandas as pd
from sklearn.linear_model import LinearRegression

app = Flask(__name__)

@app.route("/")
def home():
    return send_from_directory("../frontend", "index.html")

@app.route("/style.css")
def style():
    return send_from_directory("../frontend", "style.css")

@app.route("/script.js")
def script():
    return send_from_directory("../frontend", "script.js")

@app.route("/predict")
def predict():

    data = pd.read_csv("datasets/expenses.csv")

    X = data[["Month"]]
    y = data["Expense"]

    model = LinearRegression()
    model.fit(X, y)

    next_month = data["Month"].max() + 1

    prediction = model.predict([[next_month]])

    return jsonify({
        "predicted_expense": round(float(prediction[0]), 2),
        "forecast_month": int(next_month)
    })

if __name__ == "__main__":
    app.run(debug=True)
