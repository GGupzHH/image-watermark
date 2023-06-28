// Const execcmd = require("child_process");
// const util = require("util");
// const moment = require("moment");
const fs = require("fs");

const goalPath = "/assets/10.地脚螺栓隐蔽前（保护帽浇制前）";
const resultPath = "/assets/result";
let currentNum = 8;
const endNum = 76;
let fileList = [];

// Get image file path
const getImagePath = async () => {
  await fs.readdir(process.cwd() + goalPath, function(_err, file) {
    fileList = file;
    for (currentNum; currentNum <= endNum; currentNum++) {
      createFile();
      // DistributeImage();
    }
  });
};
// 3D180-230501-N22号塔地脚螺栓隐蔽前

// Create file
const createFile = async () => {
  const currentName = `3D180-230501-N${currentNum}号塔地脚螺栓隐蔽前`;
  await fs.mkdir(process.cwd() + resultPath + `/${currentName}`, () => {});
  console.log(fileList);
  const currentFiles = fileList.splice(0, 4);
  console.log(currentFiles);
  currentFiles.forEach(async (fileImage, index) => {
    console.log(fileImage, index);
    await imagesWatermark(fileImage, index, currentName);
    // await fs.copyFile(
    //   process.cwd() + goalPath + "/" + fileImage,
    //   process.cwd() +
    //     resultPath +
    //     "/" +
    //     currentName +
    //     "/" +
    //     currentName +
    //     "-" +
    //     index +
    //     ".jpg",
    //   () => {}
    // );
  });

  // Fs.copyFile(
  //   process.cwd() + goalPath + "/" + fileImage,
  //   process.cwd() + resultPath + "/" + index + fileName
  // );
};

// Const distributeImage = () => {
//   fs.readdir(process.cwd() + resultPath, function(_err, file) {
//     console.log(file);
//     file.forEach(fileName => {
//       const currentFiles = fileList.splice(0, 4);
//       console.log(fileName);
//       console.log(currentFiles);
//
//     });
//   });
// };

// Set imgae watermark
async function imagesWatermark(imageFile, index, currentName) {
  const exec = util.promisify(execcmd.exec);
  const fileNameKeys = handleImageNameKeys(imageFile);
  const goalImagePath = process.cwd() + goalPath + "/" + imageFile;
  const resultImagePath = process.cwd() + resultPath + "/" +
  currentName +
  "/" +
  currentName +
  "-" +
  index +
  ".jpg"
  var cmdstr =
    "ffmpeg -i " +
    goalImagePath +
    // eslint-disable-next-line no-template-curly-in-string
    ' -vf "' +
    "drawtext=fontfile=./text.ttf: x=80:y=H-th-280:text=工程名称\\\\\\:凉州区330千伏九墩:fontsize=40:fontcolor=black," +
    "drawtext=fontfile=./text.ttf: x=80:y=H-th-240:text=滩3号升压站送出线路工程:fontsize=40:fontcolor=black," +
    "drawtext=fontfile=./text.ttf: x=80:y=H-th-160:text=施工部位\\\\\\:" +
    fileNameKeys.name +
    "地脚螺栓隐蔽前:fontsize=40:fontcolor=black," +
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
