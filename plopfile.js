module.exports = function(plop) {
  plop.setGenerator("model", {
    description: "define data structure and relationships",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "The name of the new model"
      }
    ],
    actions: [
      {
        type: "add",
        path: "src/models/{{pascalCase name}}.ts",
        templateFile: "templates/model.hbs"
      }
    ]
  });
};
