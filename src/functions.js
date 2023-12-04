const path = require('path');
const fs = require('fs').promises; 
const MarkdownIt = require('markdown-it');

const md = new MarkdownIt();

const isAbsolutePath = (route) => path.isAbsolute(route)


const convertAbsolutePath = (rutaRelativa) => path.resolve(rutaRelativa);

const verifyExistence = (ruta) => fs.access(ruta)
  .then(() => true)
  .catch(() => false);

const isArchiveMarkdown = (ruta) => {
  const extensionesMarkdown = ['.md', '.mkd', '.mdwn', '.mdown', '.mdtxt', '.mdtext', '.markdown', '.text'];
  const extension = path.extname(ruta).toLowerCase();
  return extensionesMarkdown.includes(extension);
};

const readFiles = (ruta) => fs.readFile(ruta, 'utf-8');

function findLinks(content, filePath) {
  return new Promise((resolve, reject) => {
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

     resolve(links);
  });
}
  module.exports = {
    isAbsolutePath, 
    convertAbsolutePath, 
    verifyExistence, 
    isArchiveMarkdown, 
    readFiles, 
    findLinks,
  }
