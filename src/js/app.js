let paso = 1; 
const pasoInicial = 1;
const pasoFinal = 3;

const cita = {
    id: '',
    nombre: '',
    fecha: '', 
    hora: '',
    servicios: []
}

document.addEventListener('DOMContentLoaded', function(){
    iniciarApp();
});

function iniciarApp(){
    // muestra y oculta los tabs
    mostrarSeccion();
    // cambia la seccion cuando se presionan los botones
    tabs();
    // paginador, agrega o quita los botones paginador
    botonesPaginador();
    paginaSiguiente();
    paginaAnterior();

    // API -> Consaulta la API (backend PHP)
    consultarAPI();
    idCliente();
    // añadir el nombre del cliente al objeto cita
    nombreCliente();
    // añadir la fecha de la cita al objeto
    seleccionarFecha();
    // añadir hora de la cita al objeto
    seleccionarHora();
    // muestra el resumen de la cita
    mostrarResumen();
}

function mostrarSeccion(){
    // ocultar seccion
    const seccionAnterior = document.querySelector('.mostrar');
    if(seccionAnterior){
        seccionAnterior.classList.remove('mostrar');
    }

    // seleccionar la seccion con el paso
    const pasoSelector = `#paso-${paso}`;

    const seccion = document.querySelector(pasoSelector);
    
    seccion.classList.add('mostrar');

    // quita la clase del tab actual al anterio
    const tabAnterior = document.querySelector('.actual');
    if(tabAnterior){
        tabAnterior.classList.remove('actual');
    }

    // resalta el tab actual
    const tab = document.querySelector(`[data-paso="${paso}"]`);
    tab.classList.add('actual');
}

function tabs(){
    const botones = document.querySelectorAll('.tabs button');

    botones.forEach(boton=>{
        boton.addEventListener('click', function(e){
            paso = parseInt(e.target.dataset.paso);
            
            mostrarSeccion();
            botonesPaginador();

        });
    })
}

function botonesPaginador(){
    const paginaAnterior = document.querySelector('#anterior');
    const paginaSiguiente = document.querySelector('#siguiente');

    if(paso === 1){
        paginaAnterior.classList.add('ocultar');
        paginaSiguiente.classList.remove('ocultar');
    }else if(paso === 3){
        paginaAnterior.classList.remove('ocultar');
        paginaSiguiente.classList.add('ocultar');

        mostrarResumen();
    }else{
         paginaAnterior.classList.remove('ocultar');
        paginaSiguiente.classList.remove('ocultar');
    }
    mostrarSeccion();

}

function paginaAnterior(){
    const paginaAnterior = document.querySelector('#anterior');
    paginaAnterior.addEventListener('click', function(){
        if(paso <= pasoInicial) return;
        paso--;
        botonesPaginador();
    });
}

function paginaSiguiente(){
    const paginaSiguiente = document.querySelector('#siguiente');
    paginaSiguiente.addEventListener('click', function(){
        if(paso >= pasoFinal) return;
        paso++;
        botonesPaginador();
    });
}

async function consultarAPI(){

    try{
        const url = '/api/servicios';
        const resultado = await fetch(url);
        const servicios = await resultado.json();
        mostrarServicios(servicios);
    }catch(error){
        console.log(error);
    }
}

function mostrarServicios(servicios){
    servicios.forEach(servicio =>{
        const {id, nombre, precio} = servicio;
        const nombreServicio = document.createElement('P');
        nombreServicio.classList.add('nombre-servicio');
        nombreServicio.textContent = nombre;

        const precioServicio = document.createElement('P');
        precioServicio.classList.add('precio-servicio');
        precioServicio.textContent = `$${precio}`;

        const servicioDiv = document.createElement('DIV');
        servicioDiv.classList.add('servicio');
        servicioDiv.dataset.idServicio = id;
        servicioDiv.onclick = function(){
            seleccionarServicio(servicio);
        }

        servicioDiv.appendChild(nombreServicio);
        servicioDiv.appendChild(precioServicio);

        document.querySelector('#servicios').appendChild(servicioDiv);

    });
}

function seleccionarServicio(servicio){
    const {id} = servicio;
    // extraigo el servicio
    const {servicios} = cita;
    // comprobar si un servicio ya fue agregado
    const divServicio = document.querySelector(`[data-id-servicio="${id}"]`);
    // comprobar si un servicio ya fue agregado
    if(servicios.some(agregado=>agregado.id === id)){
        // eliminar
        cita.servicios = servicios.filter(agregado=>agregado.id!==id);
        divServicio.classList.remove('seleccionado');
    }else{
        // agregarlo
        // hago una copia del servicio
        cita.servicios = [...servicios, servicio];
        divServicio.classList.add('seleccionado');
    }

}

function idCliente(){
    const id = document.querySelector('#id').value;
    cita.id = id;
    
}

function nombreCliente(){
    const nombre = document.querySelector('#nombre').value;
    cita.nombre = nombre;
    
}

function seleccionarFecha(){
    const inputFecha = document.querySelector('#fecha');
    inputFecha.addEventListener('input', function(e){
        const dia = new Date(e.target.value).getUTCDay();
        if([6, 0].includes(dia)){
            e.target.value = '';
            mostrarAlerta('error','Fines de semana no permitidos', '#paso-2 p');
        }else{
            cita.fecha = e.target.value;
        }
    });
}

function seleccionarHora(){
    const inputHora = document.querySelector('#hora');
    inputHora.addEventListener('input', function(e){
        const horaCita = e.target.value;
        const hora = horaCita.split(":")[0];
        if(hora < 10 || hora > 18){
            e.target.value = '';
            mostrarAlerta('error', 'Hora No Valida', '#paso-2 p');
        }else{
            cita.hora = e.target.value;
            
        }
    });
}

function mostrarResumen(){
    const resumen = document.querySelector('.contenido-resumen');
    // limpiar div resumen
    while(resumen.firstChild){
        resumen.removeChild(resumen.firstChild);
    }
   
    if(Object.values(cita).includes('') || cita.servicios.length === 0){
        mostrarAlerta('error', 'Faltan datos de servicios, fecha u hora', '.contenido-resumen', false);
        return;
    }
    // formatear el div de resumen
    const {nombre, fecha, hora, servicios} = cita;
    
    // headin para servicios en resumen
    const headingServicios = document.createElement('H3');
    headingServicios.textContent = 'Resumen de Servicios';
    resumen.appendChild(headingServicios);
    // iterando y mostrando los servicios
    servicios.forEach(servicio=>{
        const {id,precio,nombre} = servicio;
        const contendorServicio = document.createElement('DIV');
        contendorServicio.classList.add('contenedor-servicio');

        const textoServicio = document.createElement('P');
        textoServicio.textContent = nombre;

        const precioServicio = document.createElement('P');
        precioServicio.innerHTML = `<span>Precio</span> $${precio}`;

        contendorServicio.appendChild(textoServicio);
        contendorServicio.appendChild(precioServicio);

        resumen.appendChild(contendorServicio);
    })

    // headin para cliente en resumen
    const headingCita = document.createElement('H3');
    headingCita.textContent = 'Resumen de la Cita';
    resumen.appendChild(headingCita);

    const nombreCliente = document.createElement('P');
    nombreCliente.innerHTML = `<span>Nombre: </span>${nombre}`;

    // formatear la fecha
    const fechaObj = new Date(fecha);
    const mes = fechaObj.getMonth();
    const dia = fechaObj.getDate() + 2;
    const year = fechaObj.getFullYear();

    const fechaUTC = new Date(Date.UTC(year,mes,dia));
    const opciones = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
    const fechaFormateada = fechaUTC.toLocaleDateString('es-CO', opciones);

    const fechaCita = document.createElement('P');
    fechaCita.innerHTML = `<span>Fecha de la cita: </span>${fechaFormateada}`;

    const horaCita = document.createElement('P');
    horaCita.innerHTML = `<span>Hora de la cita: </span>${hora} Horas`;

    const botonReserva = document.createElement('BUTTON');
    botonReserva.classList.add('boton');
    botonReserva.textContent = 'Reservar Cita';
    botonReserva.onclick = reservarCita;

    resumen.appendChild(nombreCliente);
    resumen.appendChild(fechaCita);
    resumen.appendChild(horaCita);
    resumen.appendChild(botonReserva);
}

async function reservarCita(){

    const {nombre, fecha, hora, servicios, id} = cita;
    // iterar sobre los servicios y verifica el id 
    const idServicios = servicios.map(servicio=>servicio.id);
    const datos = new FormData();
    
    datos.append('fecha', fecha);
    datos.append('hora', hora);
    datos.append('usuarioId', id);
    datos.append('servicios', idServicios);

    // console.log([...datos]);

    try {
        // peticion hacia la api
        const url = '/api/citas';

        const respuesta = await fetch(url, {
            method: 'POST', 
            body: datos
        });

        const resultado = await respuesta.json();
        console.log(resultado);
        if(resultado.resultado){
            Swal.fire({
            icon: "success",
            title: "Cita Creada",
            text: "Tu cita fue creada correctamente",
            button: 'Ok'
            }).then(()=>{
                setTimeout(()=>{
                    window.location.reload();
                },2000)
                
            });
        }
    } catch (error) {
        console.log(error)
        Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un error al guardar la cita"
        });
    }

    
}

function mostrarAlerta(tipo, mensaje, elemento, desaparece = true){
    // previene que se generen mas de una alerta
    const alertaPrevia = document.querySelector('.alerta');
    if(alertaPrevia){
        alertaPrevia.remove();
    }
    // generar la alerta
    const alerta = document.createElement('DIV');
    alerta.textContent = mensaje;
    alerta.classList.add('alerta');
    alerta.classList.add(tipo)

    const referencia = document.querySelector(elemento);
    referencia.appendChild(alerta);
    if(desaparece){
        // eliminar alerta
        setTimeout(()=>{
            alerta.remove();
        }, 3000);
    }
    
}

