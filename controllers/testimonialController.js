import { Testimoniales } from '../models/Testimoniales.js'

const guardarTestimonial = async(req, res) => {
    // valida
    const { nombre, correo, mensaje } = req.body;
    const errores = [];

    if(nombre.trim() === ''){
        errores.push({mensaje: 'El Nombre esta vacio'});
    }

    if(correo.trim() === ''){
        errores.push({mensaje: 'El Correo esta vacio'});
    }

    if(mensaje.trim() === ''){
        errores.push({mensaje: 'El Mensaje esta vacio'});
    }

    if(errores.length > 0){

        // Consultar testimoniales Existentes
        const testimoniales = await Testimoniales.findAll();

        //Mostrar vista con errores
        res.render('testimoniales', {
            pagina: 'Testimoniales',
            errores,
            nombre,
            correo,
            mensaje,
            testimoniales
        })
    } else {
        // Almacenar en la BD
        try {
            await Testimoniales.create({
                nombre,
                correo,
                mensaje
            });

            res.redirect('/testimoniales');
        } catch (error) {
            console.log(error)
        }
    }
}



export {
    guardarTestimonial  
} 