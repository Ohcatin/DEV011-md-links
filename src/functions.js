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

const findLinks = (contenido, rutaArchivo) => {
    const tokens = md.parse(contenido, {});
  
    const links = [];
  
    tokens.forEach((token, index) => {
      if (token.type === 'link_open') {
        // Encontramos un enlace
        const linkHref = tokens[index + 1].content;
        const linkText = tokens[index + 2].content;
  
        links.push({
          href: linkHref,
          text: linkText,
          file: rutaArchivo,
        });
      }
    });
  
    return links;
};
  module.exports = {
    isAbsolutePath, 
    convertAbsolutePath, 
    verifyExistence, 
    isArchiveMarkdown, 
    readFiles, 
    findLinks,
  }
