const intro = introJs();

intro.setOptions({
  steps: [
    {
      intro:  "En esta sección hay un poco de información sobre MySweetMoon."
    },
    {
      element: "#pas1",
      intro: "Estadísticas sobre el negocio."
    },
    {
      element: "#pas2",
      intro: "Razones para preferirnos."
    },
    {
      element: "#pas3",
      intro: "Algunas fotos de nuestro instagram."
    }
  ]
})

intro.start();
