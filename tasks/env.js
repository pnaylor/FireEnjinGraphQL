const fs = require("fs-extra");
const globby = require("globby");

const currentEnv = process.argv[2] ? process.argv[2] : "local";

(async () => {
  const files = await globby(`env/${currentEnv}/**/*.*`);
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
})();
