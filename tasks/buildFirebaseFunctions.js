const fs = require("fs-extra");
const globby = require("globby");

async function writeData(filename, data) {
  return new Promise(async (resolve, reject) => {
    fs.ensureFile(filename, err => {
      if (err) {
        console.log("Error ensuring file exists!");
        throw new Error(err);
      }

      fs.writeFile(filename, data, { flag: "wx" }, function(err) {
        if (err) {
          reject();
        }

        fs.writeFile(filename, data);
        resolve({ filename });
      });
    });
  });
}

async function renderIndex(location, importStr, exportStr) {
  return new Promise(async (resolve, reject) => {
    fs.readFile(
      "./templates/firebaseFunctionsIndex.js",
      "utf8",
      async (err, data) => {
        try {
          await writeData(
            location,
            data
              .replace(/{{imports}}/g, importStr)
              .replace(/{{exports}}/g, exportStr)
          );
          resolve();
        } catch (err) {
          reject(err);
        }
      }
    );
  });
}

(async () => {
  let importStr = ``;
  let exportStr = ``;

  const files = await globby(`./src/triggers/**/*.ts`);
  for (const file of files) {
    const pathParts = file.split("/");
    const triggerName = pathParts[pathParts.length - 1].split(".")[0];
    importStr += `const ${triggerName}_1 = require("./triggers/${triggerName}");`;
    exportStr += `${triggerName}: ${triggerName}_1.default,`;
  }
  try {
    await renderIndex("./dist/index.js", importStr, exportStr);
  } catch (error) {
    console.log(error);
  }

  console.log(
    `Rendered Firebase Functions index file with ${files.length} triggers...`
  );
})();
