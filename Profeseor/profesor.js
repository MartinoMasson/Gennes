//ver Lista de Alumnos
function Mostrar_Alumnos(menu) {
    const contenedor = document.getElementById('listaAlumnos');
    const buscador = document.getElementById('buscador').value.trim().toLowerCase(); // Obtener el valor del buscador y limpiarlo

    contenedor.innerHTML = '';
    const mapa = gennes_alumnos.obtener_Mapa()
    if (mapa && mapa.size > 0) {
        const nombresOrdenados = Array.from(mapa.values());

        // Ordenar las personas por nombre
        nombresOrdenados.sort((persona1, persona2) => {
            // Comparar los nombres de las personas (ignorando mayúsculas/minúsculas)
            const nombre1 = persona1.nombre.toLowerCase();
            const nombre2 = persona2.nombre.toLowerCase();

            if (nombre1 < nombre2) {
                return -1;
            } else if (nombre1 > nombre2) {
                return 1;
            } else {
                return 0;
            }
        });

        nombresOrdenados.forEach(valor => {

            // Filtrar los resultados según lo ingresado en el buscador
            if (valor.nombre.toLowerCase().includes(buscador)) {
                const datosAlumnos = document.createElement('div');
                datosAlumnos.classList = "alumno-sublista";

                const nombre = document.createElement('a');
                var nombrecompleto = `${valor.nombre} ${valor.apellido}`
                nombre.textContent = nombrecompleto;
                nombre.addEventListener('click', function () {
                    menu.monstrarAlumno(valor.dni);
                });

                const telefono = document.createElement('a');
                telefono.textContent = valor.telefono;
                telefono.addEventListener('click', function () {
                    abrirWhatsApp(valor.telefono);
                });

                const cronometro = document.createElement('div');
                cronometro.classList = "cronometro";

                const btnIniciar = document.createElement('button');
                btnIniciar.textContent = "Iniciar";
                btnIniciar.addEventListener('click', iniciarCronometro);

                const btnReiniciar = document.createElement('button');
                btnReiniciar.textContent = "Reiniciar";
                btnReiniciar.addEventListener('click', reiniciarCronometro);

                const btnGuardar = document.createElement('button');
                btnGuardar.textContent = "Guardar";
                btnGuardar.addEventListener('click', () => guardarCronometro(nombre));

                const tiempo = document.createElement('p');
                tiempo.textContent = "00:00:00";
                tiempo.id = "cronometro";

                cronometro.appendChild(btnIniciar);
                cronometro.appendChild(tiempo);
                cronometro.appendChild(btnReiniciar);
                cronometro.appendChild(btnGuardar);

                const rutina = document.createElement('button');
                rutina.textContent = "Rutina";
                rutina.addEventListener('click', () => menu.mostrarRutina(valor.dni));

                datosAlumnos.appendChild(nombre);
                datosAlumnos.appendChild(telefono);
                datosAlumnos.appendChild(cronometro);
                datosAlumnos.appendChild(rutina);

                contenedor.appendChild(datosAlumnos);
            }
        });
    } else {
        contenedor.textContent = 'No hay alumnos para mostrar';
    }
}
function inicializarBuscador() {
    const buscador = document.getElementById('buscador');

    buscador.addEventListener('input', function () {
        Mostrar_Alumnos();
    });
}
inicializarBuscador();


//Cronometro
var tiempoInicio
var intervalo
var tiempofinal

function iniciarCronometro() {
    if (!intervalo) {
        tiempoInicio = Date.now()
        intervalo = setInterval(actualizarCronometro, 1)
    }
}

function detenerCronometro() {
    clearInterval(intervalo)
    intervalo = null
}

function reiniciarCronometro() {
    detenerCronometro()
    document.getElementById('cronometro').innerText = '00:00:00'
    tiempofinal = "00:00"
}

function guardarCronometro(nombre) {
    detenerCronometro()
    //    guardar(tiempofinal,nombre)
}

function actualizarCronometro() {
    var tiempoActual = Date.now()
    var diferencia = tiempoActual - tiempoInicio

    var horas = Math.floor(diferencia / (1000 * 60 * 60))
    var minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60))
    var segundos = Math.floor((diferencia % (1000 * 60)) / 1000)


    horas = (horas < 10) ? '0' + horas : horas
    minutos = (minutos < 10) ? '0' + minutos : minutos
    segundos = (segundos < 10) ? '0' + segundos : segundos

    var tiempoTranscurrido = horas + ':' + minutos + ':' + segundos
    tiempofinal = horas + ':' + minutos
    document.getElementById('cronometro').innerText = tiempoTranscurrido
}



//Agregar Alumno
function NuevoAlumno() {
    var newnombre = document.getElementById("newnombre").value
    var newapellido = document.getElementById("newapellido").value
    var newdni = document.getElementById("newdocumento").value
    var newdireccion = document.getElementById("newdireccion").value
    var newtelefono = document.getElementById("newtelefono").value
    var newtelefono_emergencia = document.getElementById("newtelefono-emergencia").value
    var newciudadnatal = document.getElementById("newciudadnatal").value
    var newprofesion = document.getElementById("newprofesion").value
    var newhist_clinico = document.getElementById("newhist_clinico").value
    var newantecedentes = document.getElementById("newantecedentes").value
    var newantecedentes_opciones = document.querySelector("input[name = 'newantecedentes_opcion']:checked").value

    var fechaOriginal = document.getElementById("newfecha_nacimiento").value;
    var partesFecha = fechaOriginal.split('-');
    var newfecha_nacimiento = partesFecha[2] + '/' + partesFecha[1] + '/' + partesFecha[0];


    var checkboxesSeleccionados = document.querySelectorAll('.semana input[type="checkbox"]')

    var newhorarios = []
    newhorarios[0] = document.getElementById("newlunes-horario").value
    newhorarios[1] = document.getElementById("newmartes-horario").value
    newhorarios[2] = document.getElementById("newmiercoles-horario").value
    newhorarios[3] = document.getElementById("newjueves-horario").value
    newhorarios[4] = document.getElementById("newviernes-horario").value

    var newdias = []
    checkboxesSeleccionados.forEach(function (checkbox) {
        if (checkbox.checked) {
            newdias.push(checkbox.value)
        }
    })
    //Agregaralumno_bd(newnombre,newapellido,newdni,newfecha_nacimiento,newtelefono,newtelefono_emergencia, newdireccion, newciudadnatal, newprofesion,"No","",newhist_clinico,newdias,newhorarios)
    gennes_alumnos.Agregar_alumno(newnombre, newapellido, newtelefono, newtelefono_emergencia, newfecha_nacimiento,
        newdni, newdireccion, newciudadnatal, newprofesion, newantecedentes_opciones, newantecedentes, newhist_clinico, newdias, newhorarios, 0, [], [], [])
}
document.addEventListener("DOMContentLoaded", function () {
    var checkboxes = document.querySelectorAll('.semana input[type="checkbox"]')

    checkboxes.forEach(function (checkbox) {
        checkbox.addEventListener('change', function () {
            var labelFor = document.querySelector('label[for="' + this.value + '"]')
            var timeInput = labelFor.nextElementSibling.querySelector('input[type="time"]')

            if (this.checked) {
                timeInput.disabled = false // Habilita el input time asociado
            } else {
                timeInput.disabled = true // Deshabilita el input time asociado
            }
        })
    })
})
function limpiarFormulario() {
    document.getElementById('nuevoalumno-Form').reset(); // Esto restablecerá todos los campos del formulario a sus valores iniciales
    document.getElementById('newlunes-horario').disabled = true;
    document.getElementById('newmartes-horario').disabled = true;
    document.getElementById('newmiercoles-horario').disabled = true;
    document.getElementById('newjueves-horario').disabled = true;
    document.getElementById('newviernes-horario').disabled = true;

}
function obtener_fecha_actual() {
    // Obtener la fecha actual en formato YYYY-MM-DD
    const hoy = new Date();
    const año = hoy.getFullYear();
    let mes = hoy.getMonth() + 1;
    let dia = hoy.getDate();

    // Agregar un cero inicial si el mes o el día son menores que 10
    mes = mes < 10 ? '0' + mes : mes;
    dia = dia < 10 ? '0' + dia : dia;

    return `${año}-${mes}-${dia}`
}
// Establecer la fecha actual como el valor máximo del campo de fecha
document.getElementById('newfecha_nacimiento').max = obtener_fecha_actual();

//ver Alumno
function LLenar_campos(dni) {
    var alumno = gennes_alumnos.obtener_Alumno(dni)

    document.getElementById("nombre-alumno").textContent = alumno.nombre;
    document.getElementById("apellido-alumno").textContent = alumno.apellido;
    document.getElementById("dni_alumno").textContent = alumno.dni;
    document.getElementById("fecha_nac_alumno").textContent = alumno.fecha_nacimiento;
    document.getElementById("peso-alumno").value = alumno.peso[alumno.peso.length - 1] || "0";
    document.getElementById("altura-alumno").value = alumno.altura || "0";
    document.getElementById("masa_muscular-alumno").value = alumno.masa_muscular[alumno.masa_muscular.length - 1] || "0";
    document.getElementById("grasa_corporal-alumno").value = alumno.grasa_corporal[alumno.grasa_corporal.length - 1] || "0";

    document.getElementById("telefono_alumno").value = alumno.telefono || "";
    document.getElementById("telefono_emergencia_alumno").value = alumno.telefono_emergencia || "";
    document.getElementById("direccion_alumno").value = alumno.direccion || "";
    document.getElementById("ciudad_natal").value = alumno.Ciudad_Natal || "";
    document.getElementById("profesion").value = alumno.Profesion || "";
    document.getElementById("hist_clinico").value = alumno.historial_clinico || "";

    // Rellena los días de entrenamiento (checkboxes)
    const diasEntrenamiento = alumno.dias_entrenamiento || [];
    diasEntrenamiento.forEach(dia => {
        document.getElementById(dia).checked = true;
    });

    // Rellena los horarios de entrenamiento (input type="time")
    const horariosEntrenamiento = alumno.horarios_entrenamiento || null;

    if (horariosEntrenamiento === null)
        document.getElementById(`lunes-horario`).value = "06:00"
    else
        document.getElementById(`lunes-horario`).value = horariosEntrenamiento[0]
    if (horariosEntrenamiento === null)
        document.getElementById(`martes-horario`).value = "06:00"
    else
        document.getElementById(`martes-horario`).value = horariosEntrenamiento[1]
    if (horariosEntrenamiento === null)
        document.getElementById(`miercoles-horario`).value = "06:00"
    else
        document.getElementById(`miercoles-horario`).value = horariosEntrenamiento[2]
    if (horariosEntrenamiento === null)
        document.getElementById(`jueves-horario`).value = "06:00"
    else
        document.getElementById(`jueves-horario`).value = horariosEntrenamiento[3]
    if (horariosEntrenamiento === null)
        document.getElementById(`viernes-horario`).value = "06:00"
    else
        document.getElementById(`viernes-horario`).value = horariosEntrenamiento[4]

}
function habilitarInputs() {
    const inputs = document.querySelectorAll('.datos-secundarios input, .datos-secundarios textarea,.datos-principales input');
    const checkboxes = document.querySelectorAll(`.diaentrenamiento input[type="checkbox"]`);
    const inputsTime = document.querySelectorAll(`.diaentrenamiento input[type="time"]`);


    checkboxes.forEach(function (checkbox) {
        checkbox.disabled = false; // Habilitar el checkbox
        checkbox.parentElement.style.pointerEvents = 'auto'; // Restaurar eventos de clic en la etiqueta del checkbox
    });
    // Iterar sobre cada input de tipo "time" y habilitarlo
    checkboxes.forEach(function (checkbox) {
        var labelFor = document.querySelector('.diaentrenamiento label[for="' + checkbox.value + '"]');
        var timeInput = labelFor.nextElementSibling.querySelector('input[type="time"]');

        if (checkbox.checked) {
            timeInput.disabled = false; // Habilita el input time asociado
        } else {
            timeInput.disabled = true; // Deshabilita el input time asociado
        }
    }); // Asegúrate de que la función de iteración mantenga el contexto adecuado con `bind(this)`

    habilitarcheckboxes()

    inputs.forEach(input => {
        input.removeAttribute('readonly');
    });

    const editar = document.getElementById('editardatos')
    const guardar = document.getElementById('guardardatos')

    editar.style.display = "none"
    guardar.style.display = "block"
}

function deshabilitarInputs() {
    const inputs = document.querySelectorAll('.datos-secundarios input, .datos-secundarios textarea,.datos-principales input');

    inputs.forEach(input => {
        input.setAttribute('readonly', 'true');
    });
    const checkboxes = document.querySelectorAll(`.diaentrenamiento input[type="checkbox"]`);

    // Iterar sobre cada checkbox y deshabilitarlo
    checkboxes.forEach(function (checkbox) {
        checkbox.disabled = true;
        checkbox.parentElement.style.pointerEvents = 'none';
    });
    const inputsTime = document.querySelectorAll(`.diaentrenamiento input[type="time"]`);

    inputsTime.forEach(function (inputTime) {
        inputTime.disabled = true;
    });

    const editar = document.getElementById('editardatos')
    const guardar = document.getElementById('guardardatos')

    editar.style.display = "block"
    guardar.style.display = "none"

    const dni = document.getElementById('dni_alumno').textContent
    const peso = document.getElementById('peso-alumno').value
    const altura = document.getElementById('altura-alumno').value
    const masa_muscular = document.getElementById('masa_muscular-alumno').value
    const grasa_corporal = document.getElementById('grasa_corporal-alumno').value

    const telefono = document.getElementById('telefono_alumno').value
    const telefono_emergencia = document.getElementById('telefono_emergencia_alumno').value
    const direccion = document.getElementById('direccion_alumno').value
    const ciudad_natal = document.getElementById('ciudad_natal').value
    const profesion = document.getElementById('profesion').value
    const hist_clinico = document.getElementById('hist_clinico').value
    var checkboxesSeleccionados = document.querySelectorAll('.diaentrenamiento input[type="checkbox"]')

    var horario = [];
    horario[0] = document.getElementById("lunes-horario").value
    horario[1] = document.getElementById("martes-horario").value
    horario[2] = document.getElementById("miercoles-horario").value
    horario[3] = document.getElementById("jueves-horario").value
    horario[4] = document.getElementById("viernes-horario").value

    var dias_entrenamiento = []
    checkboxesSeleccionados.forEach(function (checkbox) {
        if (checkbox.checked) {
            dias_entrenamiento.push(checkbox.value)
        }
    })


    gennes_alumnos.editar_alumno(dni, telefono, telefono_emergencia, direccion, ciudad_natal, profesion, altura, hist_clinico, dias_entrenamiento, horario, peso, masa_muscular, grasa_corporal)
}


function abrirWhatsApp(numero) {
    telefono = "54" + numero
    // Mensaje predeterminado (puedes dejarlo en blanco si no deseas enviar un mensaje predeterminado)
    var mensaje = 'Hola, Soy de gennes \n'

    // URL con el protocolo personalizado de WhatsApp y los parámetros necesarios
    var url = 'https://api.whatsapp.com/send?phone=' + telefono + '&text=' + encodeURIComponent(mensaje)
    window.open(url)
}

function habilitarcheckboxes() {
    var checkboxes = document.querySelectorAll('.diaentrenamiento input[type="checkbox"]');

    checkboxes.forEach(function (checkbox) {
        checkbox.addEventListener('change', function () {
            var labelFor = document.querySelector('.diaentrenamiento label[for="' + this.value + '"]')
            var timeInput = labelFor.nextElementSibling.querySelector('input[type="time"]')

            if (this.checked) {
                timeInput.disabled = false // Habilita el input time asociado
            } else {
                timeInput.disabled = true // Deshabilita el input time asociado
            }
        })
    })
}

//Ejercicios
function llenar_ejercicios(lista_ejercicios) {
    const contenedor = document.getElementById('lista_ejercicios');
    contenedor.innerHTML = '';

    lista_ejercicios.forEach(Ejercicio => {
        const ejercicioElemento = document.createElement('a');
        ejercicioElemento.textContent = Ejercicio.nombre;

        const boton = document.createElement('button');
        boton.classList = 'btn_editarejercicio';
        boton.type = 'button';
        boton.textContent = 'Editar';

        ejercicioElemento.appendChild(boton);
        contenedor.appendChild(ejercicioElemento);
    });

    // Función para filtrar los ejercicios
    function filtrarEjercicios(textoBusqueda) {
        // Obtener todos los elementos 'a' dentro de contenedor
        const elementos = contenedor.querySelectorAll('a');

        elementos.forEach(elemento => {
            const nombreEjercicio = elemento.textContent.toLowerCase();
            if (nombreEjercicio.includes(textoBusqueda)) {
                elemento.style.display = 'flex';
            } else {
                elemento.style.display = 'none';
            }
        });
    }

    // Obtener referencia al campo de entrada de búsqueda
    const campoBusqueda = document.querySelector('.ejercicios_x_grupo input[type="text"]');

    // Agregar un event listener para el evento de entrada de texto
    campoBusqueda.addEventListener('input', function () {
        const textoBusqueda = this.value.toLowerCase(); // Obtener el texto de búsqueda y convertirlo a minúsculas
        filtrarEjercicios(textoBusqueda);
    });
}
function agregarEjercicio(menu) {
    var newgrupo_muscular = document.getElementById("newgrupo_muscular").value
    var newnombre_ejercicio = document.getElementById("newnombre_ejercicio").value
    var newurl = document.getElementById("newurl").value

    gennes_ejercicios.Agregar(newgrupo_muscular, newnombre_ejercicio, newurl)
    agregar_ejercicios_bd(newgrupo_muscular, newnombre_ejercicio, newurl)
}



//Añadir Rutina
function habilitarBoton(checkboxId, botonId) {
    // Obtiene el checkbox y el botón por su ID
    var checkbox = document.getElementById(checkboxId);
    var boton = document.getElementById(botonId);

    // Habilita o deshabilita el botón dependiendo del estado del checkbox
    boton.disabled = !checkbox.checked;
}

var newrutina = new Rutina()
var rutinasemanal = new Rutina
var contador = [0, 0, 0, 0, 0]
function eliminarBloque(botonEliminar, id, semana, nro) {
    var contenedorBloque = botonEliminar.parentElement;
    var bloquesAfectados = document.getElementById(id).querySelectorAll('[id="bloques"]');

    var indexBloqueEliminar = Array.from(contenedorBloque.parentElement.children).indexOf(contenedorBloque);


    newrutina.Eliminar_Bloque(semana, nro)
    console.log(newrutina)

    for (var i = indexBloqueEliminar; i < bloquesAfectados.length; i++) {
        var nrobloque = bloquesAfectados[i].querySelector('#nrobloque');
        nrobloque.textContent = parseInt(nrobloque.textContent) - 1;
    }

    contador[semana - 1]--

    contenedorBloque.remove();
}

function Agregar_ejercicios(dia, nrobloque) {
    if (document.getElementById('nueva_rutina').classList.contains('deshabilitar_bloque')) {
        document.getElementById('nueva_rutina').classList.remove('deshabilitar_bloque')
        document.getElementById('nuevo_ejercicios').classList.add('ocultar')
    } else {
        document.getElementById('nueva_rutina').classList.add('deshabilitar_bloque')
        document.getElementById('nuevo_ejercicios').classList.remove('ocultar')
        obtener_grupos_musculares(dia, nrobloque)
    }
}

function llenar_ejercicios_rutina(lista_ejercicios, dia, nrobloque) {
    const contenedor = document.getElementById('lista_ejercicios');

    lista_ejercicios.sort((a, b) => a.nombre_ejercicio.localeCompare(b.nombre_ejercicio));

    // Función para filtrar los ejercicios
    function filtrarEjercicios(textoBusqueda) {
        // Limpiar el contenedor antes de volver a llenarlo con los ejercicios filtrados
        contenedor.innerHTML = '';

        // Filtrar la lista de ejercicios según el texto de búsqueda
        const ejerciciosFiltrados = lista_ejercicios.filter(ejercicio => {
            return ejercicio.nombre_ejercicio.toLowerCase().includes(textoBusqueda);
        });

        // Llenar el contenedor con los ejercicios filtrados
        ejerciciosFiltrados.forEach(ejercicio => {
            const ejercicioElemento = document.createElement('button');
            ejercicioElemento.textContent = ejercicio.nombre_ejercicio;
            ejercicioElemento.onclick = function () {
                ver_ejercicios();
                Agregar_ejercicios();
                mostrar_ejercicio(ejercicio.nombre_ejercicio, dia, nrobloque)
            }

            contenedor.appendChild(ejercicioElemento);
        });

        // Obtener referencia al campo de entrada de búsqueda
        const campoBusqueda = document.getElementById('buscador-ejercicios');

        // Agregar un event listener para el evento de entrada de texto
        campoBusqueda.addEventListener('input', function () {
            const textoBusqueda = this.value.toLowerCase(); // Obtener el texto de búsqueda y convertirlo a minúsculas
            filtrarEjercicios(textoBusqueda);
        });

        // Llenar el contenedor inicialmente
        filtrarEjercicios('');
    };
}

function guardar_rutina(dni) {
    const planSemanas = document.getElementById('plan_semanas').value;
    const diasRutina = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes'];
    const rutina = new Rutina();
    rutina.asignarId();
    let series = true
    // Recorrer los días de la semana
    if (planSemanas === 0) {
        alert('Ingresa la cantidad se semana que sera el plan')
    } else {
        for (let i = 0; i < diasRutina.length; i++) {
            const dia = diasRutina[i];
            const bloqueDia = document.getElementById(`bloque_${dia.toLowerCase()}`);
            const bloques = bloqueDia.querySelectorAll('#bloques');

            // Recorrer los bloques de ejercicio del día
            bloques.forEach(bloque => {
                const nroBloque = bloque.querySelector('#nrobloque').textContent;
                const textarea = bloque.querySelector('.ejerciciostexarea');
                const seriesInput = bloque.querySelector('input[type="number"]');

                // Crear un nuevo objeto Bloque con la información del textarea y las series
                if (seriesInput.value != 0 && textarea.value != '') {
                    const nuevoBloque = new Bloque(nroBloque);
                    nuevoBloque.Agregar(textarea.value);
                    nuevoBloque.series = parseInt(seriesInput.value);
                    rutina.Agregar_Bloque(nuevoBloque, i + 1);
                } else {
                    series = false
                }
            });
        }
    }

    // Aquí puedes decidir qué hacer con la rutina, como enviarla a una base de datos o almacenarla localmente
    gennes_alumnos.agregar_rutina(dni, rutina)
    return series
}