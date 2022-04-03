const data = {
    usuario: {
        usuario: 'Quillén Bucciero',
        email: 'abuccierorodriguez@udesa.edu.ar',
        contrasenia: 'Qui',
        fechaDeNacimiento: 18/11/00,
        documento: 43052331,
        fotoDePerfil: 'campo de tipo file' /*falta poner la foto*/
    },
    producto: [
        {
            imagen: '../../public/images/products/leche-almendras.jpg',
            nombreProducto: 'Leche de Almendras Original Sin Azúcar x 946 ml - SILK',
            descripcion: 'Silk es un alimento líquido de origen vegetal. Es delicioso, bajo en calorías, no tiene saborizantes ni colorantes artificiales y contiene 50% más calcio que la leche de vaca. Además, es libre de lactosa por su origen. ¡Disfruta de nuestra variedad y combínalo con todo lo que se te ocurra! ',
            fechaDeCarga: 22/03/22
        },
        {
            imagen: 'campo de tipo file',
            nombreProducto: 'Alfajor Vegano Negro x 75gr - Felices Las Vacas',
            descripcion: 'Alfajor vegano negro relleno de dulce de almendras de Felices Las Vacas.',
            fechaDeCarga: 22/03/22
        },
        {
            imagen: 'campo de tipo file',
            nombreProducto: 'Pizza Vegana Muzzalmendra sin TACC x 240gr - Felices Las Vacas',
            descripcion: 'Pizza con salsa de tomate y alimento vegetal a base de almendras sabor mozzarella, libre de gluten.',
            fechaDeCarga: 22/03/22
        },
        {
            imagen: 'campo de tipo file',
            nombreProducto: 'Yogur a Base de Coco VEGANO sabor Vainilla Apto APLV x 160gr - Coco Iogo CRUDDA',
            descripcion: 'Yogur elaborado a base de leche de coco vegano sabor vanilla CocoIogo de Crudda.',
            fechaDeCarga: 22/03/22
        },
        {
            imagen: 'campo de tipo file',
            nombreProducto: 'Untable de Almendra Fantastique Tradicional x 200gr - Felices Las Vacas',
            descripcion: 'Untable de Almendra Fantastique Tradicional x 200gr - Felices Las Vacas LIBRE DE GLUTEN - SIN TACC - A BASE DE PLANTAS',
            fechaDeCarga: 22/03/22
        },
        {
            imagen: 'campo de tipo file',
            nombreProducto: 'Big Classic x 230gr - Felices Las Vacas',
            descripcion: 'Medallón a Base de soja, sabor carne. CONTIENE DERIVADOS DE SOJA. PUEDE CONTENER SULFITOS, ALMENDRAS Y CASTAÑAS DE CAJÚ - CERTIFICADO SIN TACC. Certificación Kosher',
            fechaDeCarga: 22/03/22
        },
        {
            imagen: 'campo de tipo file',
            nombreProducto: 'Veganesa x 310gr - Felices Las Vacas',
            descripcion: 'Aderezo a base de aceite de girasol, sabor mayonesa, libre de gluten, sin tacc. SIN LACTOSA, SIN HUEVO, SIN SOJA. PUEDE CONTENER ALMENDRAS Y CASTAÑAS DE CAJÚ.  CERTIFICADO SIN TACC - KOSHER 100% vegetal',
            fechaDeCarga: 22/03/22
        },
        {
            imagen: 'campo de tipo file',
            nombreProducto: 'Leche Chocolatada x 200ml - Felices Las Vacas',
            descripcion: 'Leche Chocolatada x 200ml - Felices Las Vacas. CONTIENE ALMENDRAS. PUEDE CONTENER CASTAÑAS DE CAJÚ.',
            fechaDeCarga: 22/03/22
        },
        {
            imagen: 'campo de tipo file',
            nombreProducto: 'Alfajor Vegano tipo Maicena x 75gr - Felices Las Vacas',
            descripcion: 'textAlfajor vegano de maicena y dulce de almendras de Felices Las Vacas. SIN TACC - APTO KOSHER - 100% PLANT BASED. CONTIENE ALMENDRAS, DERIVADOS DE SOJA Y SULFITOS. PUEDE CONTENER LECHE, HUEVO, CASTAÑAS DE CAJÚ, NUECES Y MANÍ.',
            fechaDeCarga: 22/03/22
        },
        {
            imagen: 'campo de tipo file',
            nombreProducto: 'Nuggets Veganos Sabor Pollo x 300gr - Felices Las Vacas',
            descripcion: 'Bocaditos a base de soja: Nuggets Veganos sabor Pollo de Felices Las Vacas. CONTIENE DERIVADOS DE SOJA. PUEDE CONTENER ALMENDRAS Y CASTAÑAS DE CAJÚ. SIN TACC - LIBRE DE GLUTEN',
            fechaDeCarga: 22/03/22
        }
    ],
    comentarios: [
        {
            usuario: 'nombre',
            textoDelComentario: 'texto',
            imagenDePerfil: 'file'
        },
    ]
}

/*Productos y comentarios son arrays, los productos se van a tener que renderizar. La informacion la tenemos que sacar del modulo*/