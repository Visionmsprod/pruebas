module.exports = function(eleventyConfig) {
  
  // --- FILTROS PERSONALIZADOS ---

  // 1. Filtro para el cotizador (filterby)
  eleventyConfig.addFilter("filterby", (collection, key, value) => {
    if (!collection) {
      return [];
    }
    return collection.filter(item => {
        const data = item.data;
        if(data && data[key] !== undefined) {
            return data[key] === value;
        }
        return false;
    });
  });

  // 2. Filtro para formatear precios (number_format) - ¡LA SOLUCIÓN!
  eleventyConfig.addFilter("number_format", (number) => {
    return new Intl.NumberFormat('es-CO').format(number);
  });


  // --- COLECCIONES PERSONALIZADAS ---

  // 1. Colección para el Portafolio
  eleventyConfig.addCollection("portafolio", function(collectionApi) {
    return collectionApi.getFilteredByTag("portafolio").sort((a, b) => b.date - a.date);
  });

  // 2. Colección para los Servicios del Cotizador
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


  // --- CONFIGURACIÓN DE DIRECTORIOS ---
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
