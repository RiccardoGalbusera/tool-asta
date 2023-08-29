const fs = require("fs");
const csvParser = require("csv-parser");

function convertCsvToTs(path) {
  const results = [];

  fs.createReadStream(`${path}.csv`)
    .pipe(csvParser())
    .on("data", (row) => {
      results.push(row);
    })
    .on("end", () => {
      const parsedData = results;
      const tsCode = `export const data = ${JSON.stringify(
        parsedData,
        null,
        2
      )};`;

      fs.writeFile(`${path}.ts`, tsCode, (err) => {
        if (err) {
          console.error("Error writing TypeScript file:", err);
          return;
        }
        console.log("TypeScript file has been written successfully!");
      });
    });
}

const roles = ["P", "D", "C", "A"];

for (let role of roles) {
  convertCsvToTs(`data/${role}`);
}
