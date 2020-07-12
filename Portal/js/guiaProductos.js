const intro = introJs();

intro.setOptions({
  steps: [
    {
      intro:  "En esta sección tenemos un buscador para encontrar los productos que
      desees."
    },
    {
      element: "#pas1",
      intro: "Puedes ingresar un producto que desees comprar y te aparece su información importante."
    }
  ]
})

intro.start();
