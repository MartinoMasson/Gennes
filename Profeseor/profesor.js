const gennes_alumnos = new Alumnos();
gennes_alumnos.Agregar_alumno('Martino','Masson',2281322368,2281587881,'11/11/2003',44393800,'','',0,'',[],[-1,-1,-1,-1,-1])
//ver Lista de Alumnos
function Mostrar_Alumnos(menu) {
    const contenedor = document.getElementById('listaAlumnos');
    const buscador = document.getElementById('buscador').value.trim().toLowerCase(); // Obtener el valor del buscador y limpiarlo

    contenedor.innerHTML = '';
    const mapa = gennes_alumnos.obtener_Mapa()
    if(mapa && mapa.size > 0) {
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
                nombre.textContent = valor.nombre;
                nombre.addEventListener('click', function() {
                    menu.monstrarAlumno(valor.dni);
                });

                const apellido = document.createElement('a');
                apellido.textContent = valor.apellido;
                apellido.addEventListener('click', function() {
                    menu.monstrarAlumno(valor.dni);
                });

                const telefono = document.createElement('a');
                telefono.textContent = valor.telefono;
                telefono.addEventListener('click', function() {
                    menu.monstrarAlumno(valor.dni);
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
                rutina.addEventListener('click', () => menu.mostrarRutina());

                datosAlumnos.appendChild(nombre);
                datosAlumnos.appendChild(apellido);
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

    buscador.addEventListener('input', function() {
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
    tiempofinal="00:00"
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
function NuevoAlumno(){
    var newnombre = document.getElementById("newnombre").value
    var newapellido = document.getElementById("newapellido").value
    var newdni = document.getElementById("newdocumento").value
    var newdireccion = document.getElementById("newdireccion").value
    var newtelefono = document.getElementById("newtelefono").value
    var newtelefono_emergencia = document.getElementById("newtelefono-emergencia").value
    var newciudadnatal = document.getElementById("newciudadnatal").value
    var newprofesion = document.getElementById("newprofesion").value
    var newhist_clinico = document.getElementById("newhist_clinico").value

    var fechaOriginal = document.getElementById("newfecha_nacimiento").value;
    var partesFecha = fechaOriginal.split('-');
    var newfecha_nacimiento = partesFecha[2] + '/' + partesFecha[1] + '/' + partesFecha[0];


    var checkboxesSeleccionados = document.querySelectorAll('.semana input[type="checkbox"]')
    
    var newhorario_lunes=-1
    var newhorario_martes=-1
    var newhorario_miercoles=-1
    var newhorario_jueves=-1
    var newhorario_viernes=-1

    var newdias = []
    checkboxesSeleccionados.forEach(function(checkbox) {
        if (checkbox.checked) {
            newdias.push(checkbox.value)
            if (checkbox.value === "Lunes") {
                newhorario_lunes = document.getElementById("newlunes-horario").value
                var alumnos = [[],[],[],[],[]];
                
                if(calendario.has(newhorario_lunes)){
                    alumnos = calendario.get(newhorario_lunes)
                    if(!alumnos[0].includes(newnombre)){
                        alumnos[0].push(newnombre)
                        calendario.set(newhorario_lunes,alumnos)
                    }
                }else{
                    alumnos[0].push(newnombre)
                }
                calendario.set(newhorario_lunes,alumnos)

            }
            if(checkbox.value === "Martes"){
                newhorario_martes = document.getElementById("newmartes-horario").value
                var alumnos = [[],[],[],[],[]];
                if(calendario.has(newhorario_martes)){
                    alumnos = calendario.get(newhorario_martes)
                    if(!alumnos[1].includes(newnombre)){
                        alumnos[1].push(newnombre)
                        calendario.set(newhorario_martes,alumnos)
                    }
                }else{
                    alumnos[1].push(newnombre)
                    calendario.set(newhorario_martes,alumnos)
                }
            }        
            if(checkbox.value === "Miercoles"){
                newhorario_miercoles = document.getElementById("newmiercoles-horario").value
                var alumnos = [[],[],[],[],[]];
                if(calendario.has(newhorario_miercoles)){
                    alumnos = calendario.get(newhorario_miercoles)

                    if(!alumnos[2].includes(newnombre)){
                        alumnos[2].push(newnombre)
                        calendario.set(newhorario_miercoles,alumnos)
                    }
                }else{
                    alumnos[2].push(newnombre)
                    calendario.set(newhorario_miercoles,alumnos)
                }
            }    
            if(checkbox.value === "Jueves"){
                newhorario_jueves = document.getElementById("newjueves-horario").value
                var alumnos = [[],[],[],[],[]];
                
                if(calendario.has(newhorario_jueves)){
                    alumnos = calendario.get(newhorario_jueves)
                    if(!alumnos[3].includes(newnombre)){
                        alumnos[3].push(newnombre)
                        calendario.set(newhorario_jueves,alumnos)
                    }
                }else{
                    alumnos[3].push(newnombre)
                    calendario.set(newhorario_jueves,alumnos)
                }
            }    
            if(checkbox.value === "Viernes"){
                newhorario_viernes = document.getElementById("newviernes-horario").value
                var alumnos = [[],[],[],[],[]];
                
                if(calendario.has(newhorario_viernes)){
                    alumnos = calendario.get(newhorario_viernes)
                    if(!alumnos[4].includes(newnombre)){
                        alumnos[4].push(newnombre)
                        calendario.set(newhorario_viernes,alumnos)
                    }
                }else{
                    alumnos[4].push(newnombre)
                    calendario.set(newhorario_viernes,alumnos)
                }
            }
        }
    })

    gennes_alumnos.Agregar_alumno(newnombre,newapellido,newtelefono,newtelefono_emergencia,newfecha_nacimiento,newdni, newdireccion, newciudadnatal, newprofesion ,newhist_clinico,newdias,[newhorario_lunes,newhorario_martes,newhorario_miercoles,newhorario_jueves,newhorario_viernes])
}
document.addEventListener("DOMContentLoaded", function() {
    var checkboxes = document.querySelectorAll('.semana input[type="checkbox"]')
    
    checkboxes.forEach(function(checkbox) {
      checkbox.addEventListener('change', function() {
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
    document.getElementById('newlunes-horario').disabled=true;
    document.getElementById('newmartes-horario').disabled=true;
    document.getElementById('newmiercoles-horario').disabled=true;
    document.getElementById('newjueves-horario').disabled=true;
    document.getElementById('newviernes-horario').disabled=true;

}
function obtener_fecha_actual(){
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

//ver Alumno
function LLenar_campos(dni){
    var alumno = gennes_alumnos.obtener_Alumno(dni)

    
    document.getElementById("nombre-alumno").textContent = alumno.nombre;
    document.getElementById("apellido-alumno").textContent = alumno.apellido;
    document.getElementById("dni_alumno").textContent = alumno.dni;
    document.getElementById("fecha_nac_alumno").textContent = alumno.fecha_nacimiento;
    document.getElementById("peso-alumno").value = alumno.peso[alumno.peso.length-1] || "0";
    document.getElementById("altura-alumno").value = alumno.altura || "0";
    document.getElementById("masa_muscular-alumno").value = alumno.masa_muscular[alumno.masa_muscular.length-1] || "0";
    document.getElementById("grasa_corporal-alumno").value = alumno.grasa_corporal[alumno.grasa_corporal.length-1] || "0";

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
    const horariosEntrenamiento = alumno.horarios_entrenamiento || {};

    if(horariosEntrenamiento[0] === -1)
        document.getElementById(`lunes-horario`).value = ""   
    else
        document.getElementById(`lunes-horario`).value = horariosEntrenamiento[0] 
    if(horariosEntrenamiento[1] === -1)
            document.getElementById(`martes-horario`).value = ""  
    else
        document.getElementById(`martes-horario`).value = horariosEntrenamiento[1] 
    if(horariosEntrenamiento[2] === -1)
            document.getElementById(`miercoles-horario`).value = ""   
    else
        document.getElementById(`miercoles-horario`).value = horariosEntrenamiento[2] 
    if(horariosEntrenamiento[3] === -1)
            document.getElementById(`jueves-horario`).value = ""  
    else
        document.getElementById(`jueves-horario`).value = horariosEntrenamiento[3] 
    if(horariosEntrenamiento[4]  === -1)
            document.getElementById(`viernes-horario`).value = "" 
    else
        document.getElementById(`viernes-horario`).value = horariosEntrenamiento[4] 

}
function habilitarInputs() {
    const inputs = document.querySelectorAll('.datos-secundarios input, .datos-secundarios textarea,.datos-principales input');
    const checkboxes = document.querySelectorAll(`.diaentrenamiento input[type="checkbox"]`);
    const inputsTime = document.querySelectorAll(`.diaentrenamiento input[type="time"]`);
    
    
    checkboxes.forEach(function(checkbox) {
        checkbox.disabled = false; // Habilitar el checkbox
        checkbox.parentElement.style.pointerEvents = 'auto'; // Restaurar eventos de clic en la etiqueta del checkbox
    });
    // Iterar sobre cada input de tipo "time" y habilitarlo
    checkboxes.forEach(function(checkbox) {
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
    checkboxes.forEach(function(checkbox) {
        checkbox.disabled = true;
        checkbox.parentElement.style.pointerEvents = 'none';
    });
    const inputsTime = document.querySelectorAll(`.diaentrenamiento input[type="time"]`);
    
    inputsTime.forEach(function(inputTime) {
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
    const ciudad_natal = document.getElementById('ciudad_natal').textContent
    const profesion = document.getElementById('edad-profesion').value
    const hist_clinico = document.getElementById('hist_clinico').value
    var checkboxesSeleccionados = document.querySelectorAll('.diaentrenamiento input[type="checkbox"]')
    
    var horario_lunes=-1
    var horario_martes=-1
    var horario_miercoles=-1
    var horario_jueves=-1
    var horario_viernes=-1


    var alumno = mapa_alumno.get(nombre);
    var horariosanteriores = alumno.horarios_entrenamiento;

    for (let i = 0; i < horariosanteriores.length; i++) {
        var vacia = true
        var agenda = calendario.get(horariosanteriores[i])
        for(let j=0;j<agenda;j++){
            if (agenda[j].length !== 0) {
                const index = agenda[j].indexOf(nombre); // Encuentra el índice del elemento a eliminar
                agenda.splice(index, 1);
            }
            if(agenda.length !== 0){
                vacia = false
            }
        }
        
        if(vacia){
            calendario.delete(horariosanteriores[i])
        }
    }



    var dias_entrenamiento = []
    checkboxesSeleccionados.forEach(function(checkbox) {
        if (checkbox.checked) {
            dias_entrenamiento.push(checkbox.value)
            if (checkbox.value === "Lunes") {
                horario_lunes = document.getElementById("lunes-horario").value
                var alumnos = [[],[],[],[],[]];
                
                if(calendario.has(horario_lunes)){
                    alumnos = calendario.get(horario_lunes)
                    if(!alumnos[0].includes(wnombre)){
                        alumnos[0].push(nombre)
                        calendario.set(horario_lunes,alumnos)
                    }
                }else{
                    alumnos[0].push(nombre)
                    calendario.set(horario_lunes,alumnos)
                }

            }
            if(checkbox.value === "Martes"){
                horario_martes = document.getElementById("martes-horario").value
                var alumnos = [[],[],[],[],[]];
                if(calendario.has(horario_martes)){
                    alumnos = calendario.get(horario_martes)
                    if(!alumnos[1].includes(nombre)){
                        alumnos[1].push(nombre)
                        calendario.set(horario_martes,alumnos)
                    }
                }else{
                    alumnos[1].push(nombre)
                    calendario.set(horario_martes,alumnos)
                }
            }        
            if(checkbox.value === "Miercoles"){
                horario_miercoles = document.getElementById("miercoles-horario").value
                var alumnos = [[],[],[],[],[]];
                if(calendario.has(horario_miercoles)){
                    alumnos = calendario.get(horario_miercoles)

                    if(!alumnos[2].includes(nombre)){
                        alumnos[2].push(nombre)
                        calendario.set(horario_miercoles,alumnos)
                    }
                }else{
                    alumnos[2].push(nombre)
                    calendario.set(horario_miercoles,alumnos)
                }
            }    
            if(checkbox.value === "Jueves"){
                horario_jueves = document.getElementById("jueves-horario").value
                var alumnos = [[],[],[],[],[]];
                
                if(calendario.has(horario_jueves)){
                    alumnos = calendario.get(horario_jueves)
                    if(!alumnos[3].includes(nombre)){
                        alumnos[3].push(nombre)
                        calendario.set(horario_jueves,alumnos)
                    }
                }else{
                    alumnos[3].push(nombre)
                    calendario.set(horario_jueves,alumnos)
                }
            }    
            if(checkbox.value === "Viernes"){
                horario_viernes = document.getElementById("viernes-horario").value
                var alumnos = [[],[],[],[],[]];
                
                if(calendario.has(horario_viernes)){
                    alumnos = calendario.get(horario_viernes)
                    if(!alumnos[4].includes(nombre)){
                        alumnos[4].push(nombre)
                        calendario.set(horario_viernes,alumnos)
                    }
                }else{
                    alumnos[4].push(nombre)
                    calendario.set(horario_viernes,alumnos)
                }
            }
        }
        
    })  

    
    gennes_alumnos.editar_alumno(dni,telefono,telefono_emergencia,direccion,ciudad_natal,profesion,altura, hist_clinico, dias_entrenamiento, [horario_lunes, horario_martes, horario_miercoles, horario_jueves, horario_viernes], peso, masa_muscular,grasa_corporal)
}


function abrirWhatsApp(numero) {
    telefono= "54" + numero
    // Mensaje predeterminado (puedes dejarlo en blanco si no deseas enviar un mensaje predeterminado)
    var mensaje = 'Hola, Soy de gennes \n'

    // URL con el protocolo personalizado de WhatsApp y los parámetros necesarios
    var url = 'https://api.whatsapp.com/send?phone=' + telefono + '&text=' + encodeURIComponent(mensaje)
    window.open(url)
}

function habilitarcheckboxes() {
    var checkboxes = document.querySelectorAll('.diaentrenamiento input[type="checkbox"]');
    
    checkboxes.forEach(function(checkbox) {
        checkbox.addEventListener('change', function() {
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
// Establecer la fecha actual como el valor máximo del campo de fecha
document.getElementById('newfecha_nacimiento').max = obtener_fecha_actual;

//Ejercicios
function LlenarGrupoMusculares(menu){
    const contenedor = document.getElementById('grupos_musculares');
    contenedor.innerHTML = '';

    mapa_Ejercicios.forEach((valor,clave,mapa)=>{
        const ejercicio = document.createElement('button');
        ejercicio.textContent = clave;
        ejercicio.onclick = function() {
            menu.mostrarEjercicios(valor)
        };
        contenedor.appendChild(ejercicio);
    })
}
function llenar_ejercicios(lista_ejercicios){
    const contenedor = document.getElementById('lista_ejercicios');
    contenedor.innerHTML = '';

    lista_ejercicios.forEach(nombreEjercicio => {
        const ejercicioElemento = document.createElement('a');
        ejercicioElemento.textContent = nombreEjercicio;

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
    campoBusqueda.addEventListener('input', function() {
        const textoBusqueda = this.value.toLowerCase(); // Obtener el texto de búsqueda y convertirlo a minúsculas
        filtrarEjercicios(textoBusqueda);
    });
}
function agregarEjercicio(menu){
    var newgrupo_muscular = document.getElementById("newgrupo_muscular").value
    var newnombre_ejercicio = document.getElementById("newnombre_ejercicio").value  
    
    var ejercicios = []
    if(mapa_Ejercicios.has(newgrupo_muscular)){
        ejercicios = mapa_Ejercicios.get(newgrupo_muscular)
    }
    ejercicios.push(newnombre_ejercicio)
    
    mapa_Ejercicios.set(newgrupo_muscular,ejercicios)
}



//Agenda
function Llenar_Calendario(menu) {
    const agenda = document.getElementById('agenda');
    agenda.innerHTML = '';
    if(calendario.size> 0){
        const contenedor = document.createElement('ul');
        const contenedor_vacio = document.createElement('li');
        contenedor_vacio.className = 'horario';

        const contenedor_lunes = document.createElement('li');
        contenedor_lunes.className = 'dias';
        contenedor_lunes.textContent = "Lunes";

        const contenedor_martes = document.createElement('li');
        contenedor_martes.className = 'dias';
        contenedor_martes.textContent = "Martes";

        const contenedor_miercoles = document.createElement('li');
        contenedor_miercoles.className = 'dias';
        contenedor_miercoles.textContent = "Miercoles";

        const contenedor_jueves = document.createElement('li');
        contenedor_jueves.className = 'dias';
        contenedor_jueves.textContent = "Jueves";

        const contenedor_viernes = document.createElement('li');
        contenedor_viernes.className = 'dias';
        contenedor_viernes.textContent = "Viernes";

        contenedor.appendChild(contenedor_vacio)
        contenedor.appendChild(contenedor_lunes)
        contenedor.appendChild(contenedor_martes)
        contenedor.appendChild(contenedor_miercoles)
        contenedor.appendChild(contenedor_jueves)
        contenedor.appendChild(contenedor_viernes)
        agenda.appendChild(contenedor)
    }

    // Ordenar el calendario por claves
    const calendarioOrdenado = Array.from(calendario.keys()).sort();
    calendarioOrdenado.forEach(clave => {
        const semana = calendario.get(clave);

        const contenedor = document.createElement('ul');

        const contenedor_hora = document.createElement('li');
        contenedor_hora.className = 'horario';

        const hora = document.createElement('p');
        hora.className = 'hora';
        hora.textContent = clave;

        contenedor_hora.appendChild(hora);

        contenedor.appendChild(contenedor_hora);

        semana.forEach(alumnos => {
            const paciente = document.createElement('li');
            paciente.classList = 'verpacientes';
            
            const evento = document.createElement('div');
            evento.classList = 'evento';
            
            if (alumnos.length == 0) {
                const alumno = document.createElement('a');
                alumno.textContent = "Vacio";
                evento.appendChild(alumno);
            } else {
                alumnos.forEach(nombre => {
                    const alumno = document.createElement('a');
                    alumno.textContent = nombre;
                    alumno.onclick = function() {
                        menu.monstrarAlumno(nombre);
                    };
                    evento.appendChild(alumno);
                });
            }
            paciente.appendChild(evento);
            contenedor.appendChild(paciente);
        })

        agenda.appendChild(contenedor);
    })
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
var contador = [0,0,0,0,0]
function agregarbloque(id,idboton, semana){
    const contenedorbloque = document.createElement('div')
    contenedorbloque.id = 'bloques'

    const eliminar = document.createElement('spam')
    eliminar.textContent = '×';
    eliminar.classList = "eliminar"
    eliminar.id = 'eliminar_bloque'

    const contenedorplan = document.createElement('a')
    contenedorplan.textContent = "Bloque nro " 

    const nrobloque = document.createElement('a')
    nrobloque.id = 'nrobloque'
    
    contador[semana-1]++
    nrobloque.textContent = contador[semana-1]

    
    var newbloque = new Bloque(nrobloque.textContent)
    newrutina.Agregar_Bloque(newbloque,semana)

    contenedorplan.appendChild(nrobloque)

    const lista_ejercicios = document.createElement('div')
    lista_ejercicios.id = "ejercicios_rutina"

    const btn_agregar_ejercicio = document.createElement('button')
    btn_agregar_ejercicio.textContent = "Agregar Ejercicio"
    btn_agregar_ejercicio.type = "button"
    btn_agregar_ejercicio.onclick = function() {
        bloque_ejercicio=lista_ejercicios
        Agregar_ejercicios(semana,nrobloque.textContent);
    }; 

    eliminar.onclick = function() {
        eliminarBloque(eliminar,id,semana,nrobloque.textContent);
    }; 

    const labelseries = document.createElement('label')
    labelseries.for='number'
    labelseries.textContent = 'Series: '

    const inputseries = document.createElement('input')
    inputseries.type = "number"
    inputseries.value = 0
    inputseries.min = '0'

    inputseries.addEventListener('input', function() {
        // Actualizar las series del bloque correspondiente cuando cambie el valor del input
        const bloques = newrutina.Obtener_Bloques(semana);
        for(let i=0;i<bloques.length;i++){
            if(bloques[i].nro === nrobloque.textContent)
                bloques[i].series = inputseries.value
        }
    });


    labelseries.appendChild(inputseries)

    contenedorbloque.appendChild(eliminar)
    contenedorbloque.appendChild(contenedorplan)
    contenedorbloque.appendChild(lista_ejercicios)
    contenedorbloque.appendChild(btn_agregar_ejercicio)
    contenedorbloque.appendChild(labelseries)

    const btn_agregar_bloque = document.getElementById(idboton)
    const contenedor = document.getElementById(id)
    
    contenedor.insertBefore(contenedorbloque,btn_agregar_bloque)   
}
function eliminarBloque(botonEliminar, id,semana,nro) {
    var contenedorBloque = botonEliminar.parentElement;
    var bloquesAfectados = document.getElementById(id).querySelectorAll('[id="bloques"]' );

    var indexBloqueEliminar = Array.from(contenedorBloque.parentElement.children).indexOf(contenedorBloque);

    
    newrutina.Eliminar_Bloque(semana,nro)
    console.log(newrutina)

    for (var i = indexBloqueEliminar; i < bloquesAfectados.length; i++) {
        var nrobloque = bloquesAfectados[i].querySelector('#nrobloque'); 
        nrobloque.textContent = parseInt(nrobloque.textContent) - 1;
    }

    contador[semana-1]--

    contenedorBloque.remove();
}

function Agregar_ejercicios(dia,nrobloque){
    if(document.getElementById('nueva_rutina').classList.contains('deshabilitar_bloque')){
        document.getElementById('nueva_rutina').classList.remove('deshabilitar_bloque')
        document.getElementById('nuevo_ejercicios').classList.add('ocultar')
    }else{
        document.getElementById('nueva_rutina').classList.add('deshabilitar_bloque')
        document.getElementById('nuevo_ejercicios').classList.remove('ocultar')
        obtener_grupos_musculares(dia,nrobloque)    
    }
}

function llenar_ejercicios(lista_ejercicios,dia,nrobloque){
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
            ejercicioElemento.onclick = function(){
                ver_ejercicios();
                Agregar_ejercicios();
                mostrar_ejercicio(ejercicio.nombre_ejercicio,dia,nrobloque)
            }

            contenedor.appendChild(ejercicioElemento);
        });

        // Obtener referencia al campo de entrada de búsqueda
        const campoBusqueda = document.getElementById('buscador-ejercicios');

        // Agregar un event listener para el evento de entrada de texto
        campoBusqueda.addEventListener('input', function() {
            const textoBusqueda = this.value.toLowerCase(); // Obtener el texto de búsqueda y convertirlo a minúsculas
            filtrarEjercicios(textoBusqueda);
        });

        // Llenar el contenedor inicialmente
        filtrarEjercicios('');
    };
}

async function obtener_grupos_musculares(dia,nrobloque){
    const contenedor = document.getElementById('tiposejercicios');
    contenedor.innerHTML = '';
    mapa_Ejercicios.forEach((valor,clave,mapa)=>{
        const ejercicio = document.createElement('button');
        ejercicio.classList = 'tipos';
        ejercicio.textContent = clave;
        ejercicio.onclick = function() {
            ver_ejercicios(grupo_muscular);
            llenar_ejercicios(valor,dia,nrobloque);
        };
    })
}


function mostrar_ejercicio(ejercicio,dia,nrobloque) {
    // Crear el elemento de ejercicio
    const ejercicioElemento = document.createElement('p');
    ejercicioElemento.textContent = ejercicio;

    // Crear el botón de eliminar ejercicio
    const eliminar = document.createElement('span');
    eliminar.textContent = '×';
    eliminar.classList.add('eliminar_ejercicio');

    const subcontenedor = document.createElement('div')
    subcontenedor.classList = 'ejercicio_en_bloque'
    
    var bloque = newrutina.Obtener_Bloques(dia)

    eliminar.onclick = function() {
        subcontenedor.remove();
        for (let i = 0; i < nrobloque; i++) {
            bloque[i].Eliminar_Ejercicio(ejercicio)
        }
    };

    subcontenedor.appendChild(ejercicioElemento)
    subcontenedor.appendChild(eliminar)

    // Agregar el ejercicio y el botón de eliminar al contenedor del bloque
    bloque_ejercicio.appendChild(subcontenedor);

    var new_ejercicio = new Ejercicio(ejercicio,dia,nrobloque)

    var bloque = newrutina.Obtener_Bloques(dia)

    for(let i = 0;bloque.length > i;i++){
        if(bloque[i].nro === nrobloque){
            bloque[i].Agregar(new_ejercicio)
        }
    }
}

function guardar_rutina(){
    const urlParams = new URLSearchParams(window.location.search);
    var nombre = urlParams.get("nombre");

    const plan = document.getElementById('plan_semanas').value
    if(plan == 0){
        alert('Verifique la rutina o el Plan')
    }else{   
        var fecha_actual = new Date();
        var dia = ("0" + fecha_actual.getDate()).slice(-2);
        var mes = ("0" + (fecha_actual.getMonth() + 1)).slice(-2);
        var año = fecha_actual.getFullYear();
        var fecha = dia + '/' + mes + '/' + año;

        const lunes = newrutina.dias[1] || []
        const martes = newrutina.dias[2] || []
        const miercoles = newrutina.dias[3] || []
        const jueves = newrutina.dias[4] || []
        const viernes = newrutina.dias[5] || []

        fetch('http://localhost:3000/api/Rutinas/Agregar_Rutina',{
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',  
            },
            body: JSON.stringify({
                nombre,
                plan,
                fecha,
                lunes,
                martes,
                miercoles,
                jueves,
                viernes
            })        
        })
        abrir_VerAlumno(nombre)
    }
}