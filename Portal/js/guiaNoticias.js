const intro = introJs();

intro.setOptions({
  steps: [
    {
      intro:  "En esta sección se encuentran las noticias sobre MySweetMoon."
    },
    {
      element: "#pas1",
      intro: "Noticias recientes."
    },
    {
      element: "#pas2",
      intro: "Noticias anteriores."
    }
  ]
})

intro.start();
