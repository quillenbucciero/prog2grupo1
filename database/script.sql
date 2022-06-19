INSERT INTO `prog2`.`usuarios` (`nombre`, `apellido`, `email`, `contrasena`, `fecha_de_nacimiento`, `documento`, `foto_de_perfil`, `created_at`) 
VALUES ('Dwight', 'Schrute', 'dwightschrute@gmail.com', 'dwight123', '1980-02-02', '22333444', 'dwight.webp', '2022-06-13');
INSERT INTO `prog2`.`usuarios` (`nombre`, `apellido`, `email`, `contrasena`, `fecha_de_nacimiento`, `documento`, `foto_de_perfil`, `created_at`) 
VALUES ('Lionel', 'Messi', 'leomessi@gmail.com', 'leo10', '1980-10-10', '33100100', 'messi.jpg', '2022-06-13');
INSERT INTO `prog2`.`usuarios` (`nombre`, `apellido`, `email`, `contrasena`, `fecha_de_nacimiento`, `documento`, `foto_de_perfil`, `created_at`) 
VALUES ('Jim', 'Halpert', 'jimhalpert@gmail.com', 'jimpam', '1970-07-07', '33444555', 'jim.webp', '2022-06-13');
INSERT INTO `prog2`.`usuarios` (`nombre`, `apellido`, `email`, `contrasena`, `fecha_de_nacimiento`, `documento`, `foto_de_perfil`, `created_at`) 
VALUES ('Phyllis', 'Vance', 'phyllis@gmail.com', 'vance124', '1965-12-12', '21496077', 'phyllis.webp', '2022-06-13');
INSERT INTO `prog2`.`usuarios` (`nombre`, `apellido`, `email`, `contrasena`, `fecha_de_nacimiento`, `documento`, `foto_de_perfil`, `created_at`) 
VALUES ('Andy', 'Samberg', 'andysamberg@gmail.com', 'andy99', '1999-9-9', '20999111', 'andysamberg.jpg', '2022-06-13');


INSERT INTO `prog2`.`productos` (`imagen`, `nombre`, `descripcion`, `created_at`, `usuario_id`) 
VALUES ('Bebible-chocolatada.png', 'Bebible de chocolatada', 'Bebida sin alcohol a base de almendras, sabor chocolatada, libre de gluten, sin tacc. x200 ml', '2022-06-13', '1');
INSERT INTO `prog2`.`productos` (`imagen`, `nombre`, `descripcion`, `created_at`,  `usuario_id`) 
VALUES ('veganesa.png', 'Veganesa', 'Aderezo a base de aceite de girasol, sabor mayonesa, libre de gluten, sin tacc. x200gr', '2022-06-13', '1');
INSERT INTO `prog2`.`productos` (`imagen`, `nombre`, `descripcion`, `created_at`, `usuario_id`) 
VALUES ('yogur-coco.jpg', 'Yogur a Base de Coco VEGANO sabor Vainilla Apto APLV x 160gr - Coco Iogo CRUDDA', 'Yogur elaborado a base de leche de coco vegano sabor vanilla CocoIogo de Crudda.', '2022-06-11', '2');
INSERT INTO `prog2`.`productos` (`imagen`, `nombre`, `descripcion`, `created_at`, `usuario_id`) 
VALUES ('Alfajor-chocolate.png', 'ALFAJOR DE CHOCOLATE SIN TACC', 'Alfajor de chocolate relleno de untable endulzado de almendras sabor dulce de leche, cubierto con baño de repostería semiamargo, libre de gluten.', '2022-06-13', '2');
INSERT INTO `prog2`.`productos` (`imagen`, `nombre`, `descripcion`, `created_at`,  `usuario_id`) 
VALUES ('Pizza-provolone.png', 'Pizza Provolone', 'Pizza con salsa de tomate y alimento vegetal a base de almendras y castañas, sabor provolone.', '2022-06-13',  '3');
INSERT INTO `prog2`.`productos` (`imagen`, `nombre`, `descripcion`, `created_at`,  `usuario_id`) 
VALUES ('Chori-Vegano.jpeg', 'Chorizo Vegano x 270gr (3u) - VEGGIELAND', 'ALIMENTO A BASE DE SOJA CON SABOR A CARNE AHUMADA, PRECOCIDO, CONGELADO.', '2022-06-13', '3');
INSERT INTO `prog2`.`productos` (`imagen`, `nombre`, `descripcion`, `created_at`,  `usuario_id`) 
VALUES ('CHICKENVIL-PARTY.png', 'CHICKENVIL PARTY', 'Medallón a base de arveja, sabor pollo, libre de gluten.', '2022-06-13', '4');
INSERT INTO `prog2`.`productos` (`imagen`, `nombre`, `descripcion`, `created_at`, `usuario_id`) 
VALUES ('Panceta-Vegana.jpg', 'Panceta Vegana Ahumada Feteada x 190gr - VEGGIELAND', 'ALIMENTO A BASE DE MANDIOCA Y SOJA CON SABOR A PANCETA AHUMADA, PRECOCIDO, CONGELADO.', '2022-06-13', '4');
INSERT INTO `prog2`.`productos` (`imagen`, `nombre`, `descripcion`, `created_at`,  `usuario_id`) 
VALUES ('MilasDeVerduras.png', 'Milanesas de verduras', 'Alimento a base de verduras, nutritivo, ideal para todas tus comidas.', '2022-06-13', '5');
INSERT INTO `prog2`.`productos` (`imagen`, `nombre`, `descripcion`, `created_at`,  `usuario_id`) 
VALUES ('tofu.png', 'Tofu', 'Alimento a base de soja para usarlo como quieras!', '2022-06-13', '5');


INSERT INTO `prog2`.`comentarios` (`texto`,  `created_at`,  `producto_id`, `usuario_id`) 
VALUES ('Muy rica chocolatada!', '2022-02-22', '1', '1');
INSERT INTO `prog2`.`comentarios` (`texto`, `created_at`, `producto_id`, `usuario_id`) 
VALUES ('Igual a la mayonesa normal',  '2022-02-23', '2', '2');
INSERT INTO `prog2`.`comentarios` (`texto`, `created_at`, `producto_id`, `usuario_id`) 
VALUES ('Qué rico yogur!', '2022-02-24', '3', '3');
INSERT INTO `prog2`.`comentarios` (`texto`,`created_at`, `producto_id`, `usuario_id`) 
VALUES ('Muy buen alfajor de chocolate',  '2022-02-25', '4', '4');
INSERT INTO `prog2`.`comentarios` (`texto`, `created_at`, `producto_id`, `usuario_id`) 
VALUES ('Me encantó la pizza', '2022-02-26',  '5', '5');
