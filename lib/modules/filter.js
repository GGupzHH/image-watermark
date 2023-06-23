const fs = require("fs");
const xlsx = require("node-xlsx");
const moment = require("moment");

const xlsxPath = "/assets/新建文件夹/工  作簿1.xlsx";
const imagePath = "/assets/新建文件夹/4.基础拆模";

// Handle xlsx cell date
const handleMoment = date => {
  return moment(date)
    .add(1, "day")
    .format("YYMMDD");
};

// Read excel file
let xlsxData = xlsx
  .parse(process.cwd() + xlsxPath, {
    cellDates: true
  })[0]
  .data.filter((row, index) => index >= 2)
  .map(row => {
    return {
      name: row[1],
      time: handleMoment(row[6])
    };
  });
// 3D130-230501-N19号塔A腿-基础混凝土工程

// Get image file path
const getImagePath = () => {
  fs.readdir(process.cwd() + imagePath, function(_err, file) {
    file.map((imageFile, fileIndex) => handleImagesName(imageFile, fileIndex));
  });
};

// Edit iamge file name
const handleImagesName = (fileName, fileIndex) => {
  const filstPath = process.cwd() + imagePath + "/";
  fs.rename(
    filstPath + fileName,
    filstPath +
      `3D130-${xlsxData[fileIndex].time}-${xlsxData[fileIndex].name}号塔A腿-基础拆模工程.jpg`,
    error => {
      console.log(error);
    }
  );
};

getImagePath();
// Let tableData = [];

// console.log(xlsxData);
console.log(xlsxData);

module.exports = {};
