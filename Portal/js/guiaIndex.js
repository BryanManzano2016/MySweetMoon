const intro = introJs();

intro.setOptions({
  steps: [
    {
      intro:  "Bienvenidos a la página web de MySweetMoon. Hagamos un recorrido."
    },
    {
      element: "#ftco-nav",
      intro: "Aquí se encuentran las varias secciones de la página web."
    }
    ,
    {
      element: "#pas1",
      intro: "Haciendo clic aquí puedes ir a la sección para crear tu propia torta."
    },
    {
      element: "#pas2",
      intro: "Haciendo clic aquí te diriges a las distintas formas de contactos."
    },
    {
      element: "#foot",
      intro: "Aquí se encuentran algunos accesos rápidos a varias secciones de la página."
    }
  ]
})

intro.start();
