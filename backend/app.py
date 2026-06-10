from flask import Flask, jsonify, send_from_directory
import pandas as pd
from sklearn.linear_model import LinearRegression
import os

app = Flask(__name__)

# Home Page
@app.route("/")
def home():
    return send_from_directory("../frontend", "index.html")

# CSS File
@app.route("/style.css")
def style():
    return send_from_directory("../frontend", "style.css")

# JavaScript File
@app.route("/script.js")
def script():
    return send_from_directory("../frontend", "script.js")

# AI Prediction API
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
