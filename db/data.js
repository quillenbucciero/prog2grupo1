const data = {
    usuario: {
        usuario: 'Quillén Bucciero',
        email: 'Abuccierorodriguez@udesa.edu.ar',
        contrasenia: 'Qui',
        fechaDeNacimiento: 18/11/00,
        documento: 43052331,
        fotoDePerfil: 'campo de tipo file' /*falta poner la foto*/
    },
    producto: [
        {
            imagen: 'campo de tipo file',
            nombreProducto: 'algo',
            descripcion: 'texto',
            fechaDeCarga: 22/03/22
        },
    ],
    comentarios: [
        {
            usuario: 'Caro Canorio',
            textoDelComentario: 'Muy buen producto',
            imagenDePerfil: 'file'
        },
        {
            usuario: 'Quillén Bucciero',
            textoDelComentario: 'No me gustó',
            imagenDePerfil: 'file'
        },
        {
            usuario: 'Lola Biscay',
            textoDelComentario: 'Muy rico!',
            imagenDePerfil: 'file'
        },
        {
            usuario: 'Carolina Canorio',
            textoDelComentario: 'Muy bueno',
            imagenDePerfil: 'file'
        },
        {
            usuario: 'Rama',
            textoDelComentario: 'Muy malo',
            imagenDePerfil: 'file'
        },
    ]
};

module.exports = data;

/*Productos y comentarios son arrays, los productos se van a tener que renderizar. La informacion la tenemos que sacar del modulo*/