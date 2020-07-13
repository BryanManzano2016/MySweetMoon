const intro = introJs();

intro.setOptions({
  steps: [
    {
      intro:  "En esta sección se encuentran algunas de las tortas más frecuentes que vendemos, y una aplicación para crear tu propia torta."
    },
    {
      element: "#pas1",
      intro: "Las  opciones disponibles para personalizar tu torta."
    },
    {
      element: "#pas2",
      intro: "Dar clic para poner las opciones predeterminadas."
    },
    {
      element: "#pas3",
      intro: "Dar clic para comprar tu torta personalizada."
    },
    {
      element: "#pas4",
      intro: "Algunas de las tortas más vendidas..."
    },
    {
      element: "#pas5",
      intro: "...Y sus respectivos botones para comprar."
    }
  ]
})

intro.start();
