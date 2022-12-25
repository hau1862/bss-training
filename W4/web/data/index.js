import fs from "fs";

const discountPath = "./discounts.json";
const productPath = "./products.json";
const fileOptions = {
  encoding: "utf-8",
};

function readData(path = "") {
  return JSON.parse(fs.readFileSync(path, fileOptions));
}

function writeData(path = "", data = []) {
  fs.writeFileSync(path, data, fileOptions);
}

function appendData(path = "", newItem = {}) {
  const oldData = readData(path);
  writeData(path, oldData.concat(newItem), fileOptions);
}

export { readData, writeData, appendData, discountPath, productPath };
