module.exports = function(eleventyConfig) {
  
  // --- COLECCIÓN PERSONALIZADA PARA EL PORTAFOLIO ---
  eleventyConfig.addCollection("portafolio", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/portafolio/**/*.md").sort((a, b) => {
      return b.date - a.date; 
    });
  });

  // --- COLECCIÓN PERSONALIZADA PARA LOS SERVICIOS DEL COTIZADOR ---
  eleventyConfig.addCollection("servicios_cotizador", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/servicios/**/*.md");
  });

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
    // Si el número no es válido, devuelve 0 o un string vacío
    if (isNaN(number)) {
      return 'N/A';
    }
    return new Intl.NumberFormat('es-CO').format(number);
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
