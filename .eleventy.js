module.exports = function(eleventyConfig) {
  // Esta línea le dice a Eleventy que copie todos estos archivos/carpetas
  // desde 'src' directamente a la carpeta final del sitio.
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy("src/admin");
  eleventyConfig.addPassthroughCopy("src/animations.css");
  eleventyConfig.addPassthroughCopy("src/logo1.png");
  eleventyConfig.addPassthroughCopy("src/luisk.jpg");
  eleventyConfig.addPassthroughCopy("src/favicon.png");

  // Esta es la configuración corregida.
  // Le dice a Eleventy dónde encontrar todo DENTRO de la carpeta 'src'.
  return {
    dir: {
      input: "src",
      includes: "_includes", // La carpeta de plantillas está en 'src/_includes'
      data: "_data",       // La carpeta de datos está en 'src/_data'
      output: "_site"      // La carpeta donde se generará el sitio final
    },
    // Estas dos líneas son importantes para que los archivos .njk y .html se procesen correctamente.
    templateFormats: ["njk", "md", "html"],
    htmlTemplateEngine: "njk"
  };
};
