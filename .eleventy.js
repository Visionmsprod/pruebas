module.exports = function(eleventyConfig) {
  
  // --- FILTRO PERSONALIZADO PARA EL COTIZADOR ---
  // Esta función le enseña a Eleventy qué significa "filterby" para que el cotizador funcione.
  eleventyConfig.addFilter("filterby", (collection, key, value) => {
    if (!collection) {
      return [];
    }
    return collection.filter(item => {
      const data = item.data;
      if (data && data[key] !== undefined) {
        return data[key] === value;
      }
      return false;
    });
  });

  // --- COLECCIÓN PERSONALIZADA PARA EL PORTAFOLIO ---
  eleventyConfig.addCollection("portafolio", function(collectionApi) {
    return collectionApi.getFilteredByTag("portafolio");
  });

  // --- COLECCIÓN PERSONALIZADA PARA LOS SERVICIOS DEL COTIZADOR ---
  eleventyConfig.addCollection("servicios_cotizador", function(collectionApi) {
    return collectionApi.getFilteredByTag("servicios_cotizador");
  });
  
  // --- COPIAR ARCHIVOS ESTÁTICOS ---
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy("src/admin");
  eleventyConfig.addPassthroughCopy({"src/_redirects": "_redirects"});
  eleventyConfig.addPassthroughCopy("src/logo1.png");
  eleventyConfig.addPassthroughCopy("src/luisk.jpg");
  eleventyConfig.addPassthroughCopy("src/favicon.png");
  eleventyConfig.addPassthroughCopy("src/vmsrojo.png");

  // --- CONFIGURACIÓN DE DIRECTORIOS DE ELEVENTY ---
  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site"
    },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  };
};
