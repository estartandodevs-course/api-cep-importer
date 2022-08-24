const fs = require("fs");
const path = require("path");

const filePathData = path.join(__dirname, "data.txt");

const data = fs.readFileSync(filePathData, "utf8");

const dataArray = data.split("\n");

for (let i = 0; i < dataArray.length; i++) {
  const value = dataArray[i];

  const [cep, cityAndState, neighborhood, street] = value.split("\t");
  const [city, state] = cityAndState.split("/");

  console.log(city, state, neighborhood, street);
}
