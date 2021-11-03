# Import necessary libraries for Flask
from flask import Flask, render_template, redirect
from flask_pymongo import PyMongo
import pandas as pd

# Create an instance of the Flask app
app = Flask(__name__)

# Set variables
textheader = "Meteorites and Fireballs"

# Read CSVs into dictionaries
meteorite_data = pd.read_csv("Resources/Meteorite_Landings_Years.csv")
fireball_data = pd.read_csv("Resources/Fireball_Data_Years.csv")

# Setup mongo connection
app.config["MONGO_URI"] = "mongodb://localhost:27017/meteorite_app"
mongo = PyMongo(app)

# Populate mongo database
meteorite_dict = mongo.db.meteorite_dict
fireball_dict = mongo.db.fireball_dict
meteorite_dict.delete_many({})
fireball_dict.delete_many({})
meteorite_dict.insert_many(meteorite_data.to_dict('records'))
fireball_dict.insert_many(fireball_data.to_dict('records'))
#meteorite_dict.update({}, meteorite_data, upsert=True)
#fireball_dict.update({}, fireball_data, upsert=True)

# Pull dataframes from mongo database for use
meteorites = pd.DataFrame(list(meteorite_dict.find()))
meteorites = meteorites.to_json(orient='index')
fireballs = pd.DataFrame(list(fireball_dict.find()))
fireballs = fireballs.to_json(orient='index')
# Route that renders index.html template
@app.route("/")
def echo():
    return render_template("index.html", textheader=textheader, meteorites=meteorites, fireballs=fireballs)

# Route for data
@app.route("/data")
def data():
    return render_template("data.html", textheader=textheader, meteorites=meteorites, fireballs=fireballs)

# Route for map
@app.route("/map")
def maproute():
    return render_template("map.html", textheader=textheader, meteorites=meteorites, fireballs=fireballs)


if __name__ == "__main__":
    app.run(debug=True)