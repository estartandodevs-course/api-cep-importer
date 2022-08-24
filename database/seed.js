const fs = require("fs");
const path = require("path");

const filePathData = path.join(__dirname, "data.txt");
const fileSeedStatesPath = path.join(__dirname, "seeds", "states.sql");
const fileSeedCitiesPath = path.join(__dirname, "seeds", "cities.sql");
const fileSeedNeighborhoodsPath = path.join(
  __dirname,
  "seeds",
  "neighborhoods.sql"
);

const fileSeedStreetPath = path.join(__dirname, "seeds", "streets.sql");

const data = fs.readFileSync(filePathData, "utf8");

const dataArray = data.split("\n");

const states = [];
let stateLastId = 1;

const cities = [];
let cityLastId = 1;

const neighborhoods = [];
let neighborhoodLastId = 1;

let streetLastId = 1;

function generateInsertStateSql(id, name) {
  const sql = `INSERT INTO states (id, name) VALUES (${id}, '${name}');`;
  fs.appendFileSync(fileSeedStatesPath, sql + "\n");
}

function generateInsertCitySql(id, name, stateId) {
  const sql = `INSERT INTO cities (id, name, state_id) VALUES (${id}, '${name}', ${stateId});`;
  fs.appendFileSync(fileSeedCitiesPath, sql.trim() + "\n");
}

function generateInsertNeighborhoodSql(id, name, cityId) {
  const sql = `INSERT INTO neighborhoods (id, name, city_id) VALUES (${id}, '${name}', ${cityId});`;
  fs.appendFileSync(fileSeedNeighborhoodsPath, sql + "\n");
}

function generateInsertStreetSql(id, name, neighborhoodId) {
  const sql = `INSERT INTO streets (id, name, neighborhood_id) VALUES (${id}, '${name}', ${neighborhoodId});`;
  fs.appendFileSync(fileSeedStreetPath, sql + "\n");
}

for (let i = 0; i < dataArray.length; i++) {
  const value = dataArray[i];

  const [cep, cityAndState, neighborhood, street] = value.split("\t");
  const [city, state] = cityAndState.split("/");

  let currentStateId;
  let currentCityId;
  let currentNeighborhoodId;
  let currentStreetId;

  const stateFound = states.find((item) => item.name === state);
  if (stateFound) {
    currentStateId = stateFound.id;
  }

  if (!stateFound) {
    currentStateId = stateLastId++;
    states.push({
      id: currentStateId,
      name: state,
    });

    generateInsertStateSql(currentStateId, state);
  }

  const cityFound = cities.find((item) => item.name === city);

  if (cityFound) {
    currentCityId = cityFound.id;
  }

  if (!cityFound) {
    currentCityId = cityLastId++;
    cities.push({
      id: currentCityId,
      name: city,
    });

    generateInsertCitySql(currentCityId, city, currentStateId);
  }

  const neighborhoodFound = neighborhoods.find(
    (item) => item.name === neighborhood
  );

  if (neighborhoodFound) {
    currentNeighborhoodId = neighborhoodFound.id;
  }

  if (!neighborhoodFound) {
    currentNeighborhoodId = neighborhoodLastId++;
    neighborhoods.push({
      id: currentNeighborhoodId,
      name: neighborhood,
    });

    generateInsertNeighborhoodSql(
      currentNeighborhoodId,
      neighborhood,
      currentCityId
    );
  }

  currentStreetId = streetLastId++;
  generateInsertStreetSql(currentStreetId, street, currentNeighborhoodId);
}

console.log("Seeds geradas...");
