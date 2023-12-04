const {
  isAbsolutePath,
  convertAbsolutePath,
  verifyExistence,
  isArchiveMarkdown,
  readFiles,
  findLinks,
} = require("./functions");

const mdLinks = (ruta) => {
  const rutaAbsoluta = convertAbsolutePath(ruta);

  return new Promise((resolve, reject) => {
    verifyExistence(rutaAbsoluta)
      .then((existe) => {
        if (!existe) {
          reject(new Error('La ruta no existe.'));
        }

        if (!isArchiveMarkdown(rutaAbsoluta)) {
          reject(new Error('El archivo no es Markdown.'));
        }

        return readFiles(rutaAbsoluta);
      })
      .then((contenido) => {
        console.log('Contenido del archivo:', contenido);
        const links = findLinks(contenido, rutaAbsoluta);
        resolve(links);
      })
      .catch(reject);
  });
};

module.exports = mdLinks;