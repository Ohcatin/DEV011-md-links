const path = require('path');
const fs = require('fs').promises; 
const axios = require("axios");
const fsS = require('fs');
// funcion para convertir en absoluta si es relativa o dejar como absoluta
const convertAbsolutePath = (route) => (path.isAbsolute(route) ? route : path.resolve(route));
// funcion para verificar si la ruta existe
const verifyExistence = (ruta) => {
  return fsS.existsSync(ruta);
};
// funcion para saber si es mk...
const isArchiveMarkdown = (ruta) => {
  const extensionesMarkdown = ['.md', '.mkd', '.mdwn', '.mdown', '.mdtxt', '.mdtext', '.markdown', '.text'];
  const extension = path.extname(ruta).toLowerCase();
  return extensionesMarkdown.includes(extension);
};
// funcion para leer archivo
const readFiles = (ruta) => fs.readFile(ruta, 'utf-8');
// funcion para encontrar links
const findLinks = (content, filePath) => {
  const links = [];
  const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
  let match;

  while ((match = regex.exec(content)) !== null) {
    links.push({
      text: match[1],
      href: match[2],
      file: filePath,
    });
  }
    return links;
};
// funcion para validar link
const validateLinks = (links) => {
  const linkPromises = links.map((link) => {
    return axios
      .get(link.href)
      .then((response) => {
        link.status = response.status;
        link.ok = "ok";
        return link;
      })
      .catch((error) => {
        link.status = error.response ? error.response.status : 404;
        link.ok = "fail";
        return link;
      });
  });
  return Promise.all(linkPromises);
};
//Función para realizar estadísticas de links
const statsLinks = (links) => {
  const totalLinks = links.length;
  const uniqueLinks = new Set(links.map(link => link.href)).size;
  const brokenLinks = links.filter(link => link.ok === 'fail').length;

return { Total: totalLinks, Unique: uniqueLinks, Broken: brokenLinks };
}


  module.exports = {
    convertAbsolutePath, 
    verifyExistence, 
    isArchiveMarkdown, 
    readFiles, 
    findLinks,
    validateLinks,
    statsLinks,
  }
