const intro = introJs();

intro.setOptions({
  steps: [
    {
      intro:  "En esta sección se encuentran las formas de contactarnos."
    },
    {
      element: "#pas1",
      intro: "Nuestra información de contacto."
    },
    {
      element: "#pas2",
      intro: "También nos puedes enviar un mensaje."
    }
  ]
})

intro.start();
