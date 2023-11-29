const mdLinks = require("./index.js");

  mdLinks('archivos/prueba.md')
  .then((links) => {
    console.log(links);
  })
  .catch((error) => {
    console.error(error);
  });