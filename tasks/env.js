const fs = require("fs-extra");
const glob = require("glob");

const currentEnv = process.argv[2] ? process.argv[2] : "local";

glob(`env/${currentEnv}/**/*.*`, {}, function(er, files) {
  console.log(
    `Running ${currentEnv} environment setup by copying ${files.length} files...`
  );
  for (const file of files) {
    fs.copySync(
      file,
      file
        .split("/")
        .filter((part, index) => index > 1)
        .join("/")
    );
  }
});
