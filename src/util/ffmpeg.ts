import ffmpeg from "fluent-ffmpeg";
import ffmpegPath from "@ffmpeg-installer/ffmpeg";

ffmpeg.setFfmpegPath(ffmpegPath.path);

const convertToWebp = async (inputPath: string, outputPath: string) => {
  return new Promise((resolve, reject) => {
    ffmpeg(inputPath)
      .toFormat("webp")
      .on("end", () => {
        resolve("success");
      })
      .on("error", (err) => {
        reject(`failure: ${err}`);
      })
      .save(outputPath);
  });
};

export { convertToWebp };
