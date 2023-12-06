const path = require('path');
const fs = require('fs').promises; 
const axios = require("axios");

const convertAbsolutePath = (route) => (path.isAbsolute(route) ? route : path.resolve(route));

const verifyExistence = (ruta) => {
  console.log('Verificando ruta:', ruta);
  return fs.access(ruta)
    .then(() => true)
    .catch(() => false);
};

const isArchiveMarkdown = (ruta) => {
  const extensionesMarkdown = ['.md', '.mkd', '.mdwn', '.mdown', '.mdtxt', '.mdtext', '.markdown', '.text'];
  const extension = path.extname(ruta).toLowerCase();
  return extensionesMarkdown.includes(extension);
};

const readFiles = (ruta) => fs.readFile(ruta, 'utf-8');

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

  module.exports = {
    convertAbsolutePath, 
    verifyExistence, 
    isArchiveMarkdown, 
    readFiles, 
    findLinks,
    validateLinks,
  }
