const execcmd = require("child_process");
const util = require("util");
const fs = require("fs");
const moment = require("moment");

const goalPath = "/assets/新建文件夹/4.基础拆模";
const resultPath = "/assets/新建文件夹/result";

// Get image file path
const getImagePath = () => {
  fs.readdir(process.cwd() + goalPath, function(_err, file) {
    // eslint-disable-next-line no-return-await
    file.map(async imageFile => await imagesWatermark(imageFile));
  });
};

// Handle image file name keys
const handleImageNameKeys = imageFile => {
  const strArr = imageFile.split("-");
  return {
    name: strArr[2],
    time: moment("20" + strArr[1]).format("YYYY年MM月DD日")
  };
};

// Set imgae watermark
async function imagesWatermark(imageFile) {
  const exec = util.promisify(execcmd.exec);
  const fileNameKeys = handleImageNameKeys(imageFile);
  const goalImagePath = process.cwd() + goalPath + "/" + imageFile;
  const resultImagePath = process.cwd() + resultPath + "/" + imageFile;
  var cmdstr =
    "ffmpeg -i " +
    goalImagePath +
    // eslint-disable-next-line no-template-curly-in-string
    ' -vf "' +
    "drawtext=fontfile=./text.ttf: x=80:y=H-th-280:text=工程名称\\\\\\:凉州区330千伏九墩:fontsize=40:fontcolor=black," +
    "drawtext=fontfile=./text.ttf: x=80:y=H-th-240:text=滩3号升压站送出线路工程:fontsize=40:fontcolor=black," +
    "drawtext=fontfile=./text.ttf: x=80:y=H-th-160:text=施工部位\\\\\\:" +
    fileNameKeys.name +
    "拆模:fontsize=40:fontcolor=black," +
    "drawtext=fontfile=./text.ttf: x=80:y=H-th-80:text=日期\\\\\\:" +
    fileNameKeys.time +
    // eslint-disable-next-line no-template-curly-in-string
    ':fontsize=40:fontcolor=black" ' +
    resultImagePath;
  console.log(cmdstr);
  await exec(cmdstr);
  // 工程名称:凉州区3滩3号升压站送出线路工 // 施工部位:GA53钢筋工程A腿 // 日期:2023年03月22日
}

function app() {
  getImagePath();
}

app();
