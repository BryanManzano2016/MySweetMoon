USE mysweetmoondb;

INSERT INTO rols(id, rol) VALUES
(1, "admin"),
(2, "client");

INSERT INTO users(nombre, apellido, clave, correo, rolId ) VALUES
("Jocellyn", "Luna", "client", "jmluna@espol.edu.ec", 2),
("Juan", "Arteaga", "client", "jmluna@espol.edu.ec", 2),
("Karla", "González", "admin", "mysweetmoon@gmail.com", 1);

INSERT INTO contacts(nombre, apellido, celular, correo, fecha, userId, mensaje) VALUES
("Bryan", "Manzano", "0704345267","Bryan@gmail.com","1999-09-07", 3,
"Hola! quería conocer más de sus pasteles y si puede hacer pedidos más grandes y personalizados."),
("David","Guerrero","0984343467","david99@gmail.com","1999-10-10", 3,
"Buenos días, quería felicitarle por el pedido que realicé, fue perfecto el pastel.");

INSERT INTO quotes(nombre, tamano, isModelo, fecha, userId) VALUES
("TORTA DE CUMPLEAÑOS", 25, true, "2020-06-22",3),
("PERSONAL CHOCOLOVER", 10, true, "2020-06-22",3),
("TORTA DE OFICINA", 20, true, "2020-05-22",3),
("", 10, false, "2020-04-22",1),
("", 20, false, "2020-03-22",1),
("", 20, false, "2020-08-22",3);

INSERT INTO ingredients(nombre, precio, tipo, isActive) VALUES
("Naranja", 0.25 ,"Masa", true),
("Chocolate", 0.20 ,"Masa", true),
("Vainilla", 0.30 ,"Masa", true),
("Amaretto", 0.40 ,"Masa", true),
("Manjar", 0.40 ,"Relleno", true),
("Mermelada", 0.30 ,"Relleno", true),
("Brigadeiro", 0.60 ,"Relleno", true),
("Frosting", 0.40 ,"Cubierta", true),
("Butter Cream", 0.40 ,"Cubierta", true),
("Modelo Fondant", 10.0 ,"Toping", true),
("Dulces y Paletas", 2.50 ,"Toping", true),
("10 Porciones", 0 ,"Tamaño", true),
("15 Porciones", 0 ,"Tamaño", true),
("20 Porciones", 0 ,"Tamaño", true);

INSERT INTO quote_ingredients(quoteId, ingredientId) VALUES
(1, 3),
(1, 5),
(1, 8),
(1, 11),
(2, 2),
(2, 6),
(2, 9),
(2, 11),
(3, 4),
(3, 5),
(3, 8),
(3, 11),
(4, 3),
(4, 5),
(4, 8),
(4, 11),
(5, 3),
(5, 5),
(5, 9),
(5, 3),
(6, 4),
(6, 5),
(6, 8),
(6, 11);

INSERT INTO pictures(url, alt, esGaleria) VALUES
("nuevos.jpg",  "Alfajores", true),
("nuevos1.jpg","Bocaditos de Coco", true),
("nuevos2.jpg","Dulces mixtos", true),
("nuevos3.jpg", "2019", true),
("hasta.jpg", "Pastel de Sirena", false),
("volveremos.jpg", "Pastel floral", false),
("volvimos.jpg", "Arreglo de mesa", false),
("pronto.jpg", "Arreglo de mesa", false),
("baja.jpg", "Pastel de Minecraft", false),
("bolitas_chocolate.jpg", "Bocaditos de Chocolate", false),
("alfajor.jpg", "Alfajores", false),
("cookies.jpg", "Galletas", false),
("torta_unicornio.jpg", "torta Unicornio", false),
("dulce_coco1.jpg", "Bocaditos de Coco", false),
("torta_barcelona.jpg", "Torta Barcelona", false);

INSERT INTO news(fecha, titulo, subtitulo, contenido, userId, pictureId) VALUES
("2020-07-09", "¡Nuevos Productos!", "Tenemos nuevos productos para ti y tus familiares ¡Te esperamos!",
"En la sección de productos traemos nueva variedad. Disfruta de la inclusión de nuevos postres, tortas personalizadas y mucho más.

Tenemos diseños mejorados, nunca dejes a lado la calidad de otras compañías.",
3, 1),
("2020-06-25", "Sorpresas próximamente", "El 9 de Julio tendremos sorpresas para ti. No te lo pierdas.",
"Texto aqui",
3, 7);

INSERT INTO products(nombre, caracteristicas, pictureId) VALUES
("Alfajores", "Bocaditos rellenos de manjar. Por docena.", 11),
("Bocaditos de Chocolate", "Para amantes del chocolate.", 10),
("Bocaditos de Coco", "Cubierta de raspado de coco. Por docena.", 14),
("Galletas", "Variedad de galletas de chocolate.", 12),
("Torta de Barcelona", "Masa de vainilla y rellena de Manjar", 15),
("Torta Floral", "Masa de chocolate y rellena de mermelada.", 6),
("Torta de Minecraft", "Masa de chocolate y rellena de mermelada.", 9),
("Torta de Sirenita", "Masa de vainilla con manjar", 5),
("Torta de Unicornio", "Modelado con fondant y rellena de chocolate", 13);

INSERT INTO comments(fecha, mensaje, userId, newId) VALUES
("2020-07-10", "Wow! no espero por ver los nuevos productos, aunque me gustaría que incluyan una nueva línea de paquetes de fiesta",
1, 1),
("2020-07-10", "Me encantan! ya me llegó el pedido de los nuevos productos, las galletas estaban súper crocantes.",
2, 1),
("2020-06-30", "Ya era tiempo que sacaran este tipo de ofertas :D",
2, 2),
("2020-06-30", "¿Saben donde puedo hacer esas reservaciones? me gustaría hacer una.",
1, 2);