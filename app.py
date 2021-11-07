# Import necessary libraries for Flask
from flask import Flask, render_template, redirect
from flask_pymongo import PyMongo
import pandas as pd

# Create an instance of the Flask app
app = Flask(__name__)

# Set variables
textheader = "Meteorites and Fireballs"

# Read CSVs into dictionaries
# meteorite_data = pd.read_csv("Resources/Meteorite_Landings_Years.csv")
# fireball_data = pd.read_csv("Resources/Fireball_Data_Years.csv")
meteorite_count = pd.read_csv("Resources/Meteorites_Count.csv")

# Setup mongo connection
app.config["MONGO_URI"] = "mongodb://localhost:27017/meteorite_app"
mongo = PyMongo(app)

# Populate mongo database
# meteorite_dict = mongo.db.meteorite_dict
# fireball_dict = mongo.db.fireball_dict
meteorite_count_dict = mongo.db.meteorite_count_dict
# meteorite_dict.delete_many({})
# fireball_dict.delete_many({})
meteorite_count_dict.delete_many({})
# meteorite_dict.insert_many(meteorite_data.to_dict('records'))
# fireball_dict.insert_many(fireball_data.to_dict('records'))
meteorite_count_dict.insert_many(meteorite_count.to_dict('records'))

# Pull data from mongo database for use
meteorites = []
fireballs = []

m_years = []
m_count = []
cur = meteorite_count_dict.find()
for i in cur:
    m_years.append(i["year"])
    m_count.append(i["count"])

# Route that renders index.html template
@app.route("/")
def echo():
    return render_template("index.html", textheader=textheader, meteorites=meteorites, fireballs=fireballs)

# Route for data
@app.route("/data")
def data():
    return render_template("data.html", textheader=textheader, meteorites=meteorites, fireballs=fireballs, m_years=m_years, m_count=m_count)

# Route for map
@app.route("/map")
def maproute():
    return render_template("map.html", textheader=textheader, meteorites=meteorites, fireballs=fireballs)


if __name__ == "__main__":
    app.run(debug=True)