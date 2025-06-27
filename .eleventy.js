module.exports = function(eleventyConfig) {
  
  // --- COLECCIÓN PERSONALIZADA PARA EL PORTAFOLIO ---
  // Ahora le decimos a Eleventy que cree la colección "portafolio"
  // usando TODOS los archivos que encuentre dentro de la carpeta "src/portafolio/".
  // Esto elimina la necesidad de usar 'tags: portafolio' en cada archivo.
  eleventyConfig.addCollection("portafolio", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/portafolio/**/*.md").sort((a, b) => {
      return b.date - a.date; // Ordena por fecha, del más nuevo al más antiguo
    });
  });

  // --- COLECCIÓN PERSONALIZADA PARA LOS SERVICIOS DEL COTIZADOR ---
  // Hacemos lo mismo para los servicios.
  eleventyConfig.addCollection("servicios_cotizador", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/servicios/**/*.md");
  });

  // --- FILTRO PERSONALIZADO PARA EL COTIZADOR ---
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

  // --- COPIAR ARCHIVOS ESTÁTICOS (Sin cambios) ---
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy("src/admin");
  eleventyConfig.addPassthroughCopy({"src/_redirects": "_redirects"});
  eleventyConfig.addPassthroughCopy("src/logo1.png");
  eleventyConfig.addPassthroughCopy("src/luisk.jpg");
  eleventyConfig.addPassthroughCopy("src/favicon.png");
  eleventyConfig.addPassthroughCopy("src/vmsrojo.png");

  // --- CONFIGURACIÓN DE ELEVENTY (Sin cambios) ---
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
