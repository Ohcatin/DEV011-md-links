const mdLinks = require("./index.js");

  mdLinks("C:/Users/Catita/Documents/DEV011-md-links/archivos/prueba.md", true)
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error(error.message);
  });