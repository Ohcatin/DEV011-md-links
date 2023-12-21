const {
  convertAbsolutePath,
  verifyExistence,
  isArchiveMarkdown,
  readFiles,
  findLinks,
  validateLinks,
  statsLinks,
} = require("./functions");

const mdLinks = (ruta, options = {}) => {
  const { validate = false, stats = false } = options;

  return new Promise((resolve, reject) => {
    const pathIsAbsolute = convertAbsolutePath(ruta);
    console.log('Ruta validada:', pathIsAbsolute);


    // Verifica si es Markdown
    if (!isArchiveMarkdown(pathIsAbsolute)) {
      reject(new Error('El archivo no es Markdown.'));
    }

      readFiles(pathIsAbsolute)
      .then((data) => {
        const links = findLinks(data, pathIsAbsolute);
        if (validate && stats) {
          validateLinks(links)
            .then((validatedLink) => {
              return statsLinks(validatedLink);
            })
            .then((statsResult) => {
              resolve(statsResult);
            })
            .catch((error) => {
              reject(error);
            });
        } else if (validate) {
          validateLinks(links)
            .then((validatedLinks) => {
              resolve(validatedLinks);
            })
            .catch((error) => {
              reject(error);
            });
        } else if (stats) {
          resolve(statsLinks(links));
        } else {
          resolve(links);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};

module.exports = mdLinks;
