const fs = require("fs");
const path = require("path");

const filePathData = path.join(__dirname, "data.txt");
const fileSeedStatePath = path.join(__dirname, "seeds", "states.sql");

const data = fs.readFileSync(filePathData, "utf8");

const dataArray = data.split("\n");

const states = [];
let stateCount = 0;
let stateLastId = 1;

function generateInsertStateSql(id, name) {
  const sql = `INSERT INTO states (id, name) VALUES (${id}, '${name}');`;
  fs.appendFileSync(fileSeedStatePath, sql + "\n");
}

for (let i = 0; i < dataArray.length; i++) {
  const value = dataArray[i];

  const [cep, cityAndState, neighborhood, street] = value.split("\t");
  const [city, state] = cityAndState.split("/");

  let currentStateId = ++stateCount;

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

  console.log(city);
}
