CREATE SCHEMA prog2;

USE prog2;

CREATE TABLE usuarios (
id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
nombre VARCHAR(255) NOT NULL,
apellido VARCHAR(500) NOT NULL,
email VARCHAR(500) NOT NULL,
contrasena VARCHAR(500) NOT NULL,
fecha_de_nacimiento DATE NOT NULL,
documento INT NOT NULL,
foto_de_perfil VARCHAR(500) NOT NULL,
created_at DATE NOT NULL,
updated_at DATE NOT NULL
);

CREATE TABLE productos (
id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
imagen VARCHAR(500) NOT NULL,
nombre VARCHAR(100) NOT NULL,
descripcion VARCHAR(1000) NOT NULL,
created_at DATE NOT NULL,
updated_at DATE NOT NULL,
usuario_id INT UNSIGNED,

FOREIGN KEY(usuario_id) REFERENCES usuarios(id)
);

CREATE TABLE comentarios (
id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
texto VARCHAR(500) NOT NULL,
created_at DATE NOT NULL,
producto_id INT UNSIGNED,

FOREIGN KEY (producto_id) REFERENCES productos(id),

usuario_id INT UNSIGNED,

FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

CREATE TABLE seguidores (
seguidor_id INT UNSIGNED,

FOREIGN KEY (seguidor_id) REFERENCES usuarios(id),

seguido_id INT UNSIGNED,

FOREIGN KEY (seguido_id) REFERENCES usuarios(id)
);