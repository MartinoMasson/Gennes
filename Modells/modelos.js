//google sheet
const id_hojacalculo = '13aDa6wM4sNP6NyqQnOb3Dd__EDsbofHBe1YBtFSW6GE'
//alumnos
async function obtener_alumno_bd() {
    let response;
    try {
        response = await gapi.client.sheets.spreadsheets.values.get({
            spreadsheetId: id_hojacalculo,
            range: 'Alumnos!A2:U',
        });
    } catch (err) {
        console.error(err)
        return;
    }
    const range = response.result;
    if (!range || !range.values || range.values.length == 0) {
        console.warn('No se encontraron valores')
        return;
    }
    range.values.forEach((fila) => {
        let dias_entrenamiento, horarios_entrenamiento, peso, masa_muscular, grasa_corporal,id_rutina,id_evaluacioin;
    
        if(fila[13] !== undefined){
            dias_entrenamiento = JSON.parse(fila[13]);
        }else{
            dias_entrenamiento = []
        }
        if(fila[14] !== undefined){
            horarios_entrenamiento = JSON.parse(fila[14]);
        }else{
            horarios_entrenamiento = []
        }    
        if(fila[16] !== undefined){
            peso = JSON.parse(fila[16]);
        }else{
            peso = []
        }
        if(fila[17] !== undefined){
            masa_muscular = JSON.parse(fila[17]);
        }else{
            masa_muscular = []
        }
        if(fila[18] !== undefined){
            grasa_corporal = JSON.parse(fila[18]);
        }else{
            grasa_corporal = []
        }
        if(fila[19] !== undefined){
            id_rutina = fila[18];
        }else{
            id_rutina = -1
        }  
        if(fila[20] !== undefined){
            id_evaluacioin  = fila[20];
        }else{
            id_evaluacioin = -1
        }  
        gennes_alumnos.Agregar_alumno(fila[1], fila[2], fila[5], fila[6], fila[4], fila[3], fila[7], fila[8], fila[9], fila[10], fila[11], fila[12], dias_entrenamiento, horarios_entrenamiento, fila[15], peso, masa_muscular, grasa_corporal);
    });
    
}
async function editar_alumno_bd(alumno,) {
    const dni = alumno.dni;
    var id_rutina = alumno.rutina.obtener_id();
    //var id_evaluacion = alumno.evaluacion.obtener_id();
    const update = [
        obtener_fecha_actual(),
        alumno.nombre,
        alumno.apellido,
        alumno.dni,
        alumno.fecha_nacimiento,
        alumno.telefono,
        alumno.telefono_emergencia,
        alumno.direccion,
        alumno.Ciudad_Natal,
        alumno.Profesion,
        alumno.antecedentes,
        alumno.cuales,
        alumno.hist_clinico,
        JSON.stringify(alumno.dias_entrenamiento),
        JSON.stringify(alumno.horarios_entrenamiento),
        alumno.altura,
        JSON.stringify(alumno.peso),
        JSON.stringify(alumno.masa_muscular),
        JSON.stringify(alumno.grasa_corporal),
        id_rutina ,
        //id_evaluacion
    ];

    try {
        const rowId = await findRowWithDNI(dni);
        if (rowId !== -1) {
            await gapi.client.sheets.spreadsheets.values.update({
                spreadsheetId: id_hojacalculo,
                range: `Alumnos!A${rowId}:S${rowId}`,
                values: [update],
                valueInputOption: 'USER_ENTERED'
            });
        } else {
            await agregar_alumno_bd(alumno);
        }
    } catch (err) {
        console.error('Error al editar el alumno:', err);
    }
}
async function findRowWithDNI(dni) {
    const response = await gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: id_hojacalculo,
        range: 'Alumnos!A2:S'
    });

    const values = response.result.values;
    if (values && values.length > 0) {
        for (let i = 0; i < values.length; i++) {
            if (values[i][3] === dni) { // La columna 3 contiene el DNI
                return i + 2; // +2 porque la primera fila es el encabezado
            }
        }
    }
    return -1; // Si no se encuentra el DNI
}
async function agregar_alumno_bd(alumno) {
    const update = [
        obtener_fecha_actual(),
        alumno.nombre,
        alumno.apellido,
        alumno.dni,
        alumno.fecha_nacimiento,
        alumno.telefono,
        alumno.telefono_emergencia,
        alumno.direccion,
        alumno.Ciudad_Natal,
        alumno.Profesion,
        alumno.antecedentes,
        alumno.cuales,
        alumno.hist_clinico,
        JSON.stringify(alumno.dias_entrenamiento),
        JSON.stringify(alumno.horarios_entrenamiento),
        alumno.altura,
        JSON.stringify(alumno.peso),
        JSON.stringify(alumno.masa_muscular),
        JSON.stringify(alumno.grasa_corporal)
    ];

    try {
        const response = await gapi.client.sheets.spreadsheets.values.append({
            spreadsheetId: id_hojacalculo,
            range: 'Alumnos!A2:S',
            valueInputOption: 'USER_ENTERED',
            insertDataOption: 'INSERT_ROWS',
            resource: {
                values: [update]
            }
        });
    } catch (err) {
        console.error('Error al agregar la fila:', err);
    }
}
//ejercicios
async function obtener_ejercicios_bd() {
    let response;
    try {
        response = await gapi.client.sheets.spreadsheets.values.get({
            spreadsheetId: id_hojacalculo,
            range: 'Ejercicios!B2:D',
        });
    } catch (err) {
        console.error(err)
        return;
    }
    const range = response.result;
    if (!range || !range.values || range.values.length == 0) {
        console.warn('No se encontraron valores')
        return;
    }

    range.values.forEach((fila) => {
        gennes_ejercicios.Agregar(fila[0], fila[1], fila[2])
    })
}
async function agregar_ejercicios_bd(grupo_muscular,nombre,url){
    const update = [
        obtener_fecha_actual(),
        grupo_muscular,
        nombre,
        url
    ];

    try {
        const response = await gapi.client.sheets.spreadsheets.values.append({
            spreadsheetId: id_hojacalculo,
            range: 'Ejercicios!A2:D',
            valueInputOption: 'USER_ENTERED',
            insertDataOption: 'INSERT_ROWS',
            resource: {
                values: [update]
            }
        });
    } catch (err) {
        console.error('Error al agregar la fila:', err);
    }
}
async function editar_ejercicio_bd(ejercicio) {
    const update = [
        obtener_fecha_actual(),
        ejercicio.grupo_muscular,
        ejercicio.nombre,
        ejercicio.url
    ];
    let rowId = await findRowWithExercise(ejercicio.nombre, ejercicio.grupo_muscular);
    if (rowId !== -1) {
        const update = [
            obtener_fecha_actual(),
            ejercicio.grupo_muscular,
            ejercicio.nombre,
            ejercicio.url
        ];

        try {
            await gapi.client.sheets.spreadsheets.values.update({
                spreadsheetId: id_hojacalculo,
                range: `Ejercicios!A${rowId}:D${rowId}`,
                values: [update],
                valueInputOption: 'USER_ENTERED'
            });
        } catch (err) {
            console.error('Error al editar el ejercicio:', err);
        }
    } else {
        agregar_ejercicios_bd(ejercicio)
    }
}
async function findRowWithExercise(nombre, grupo_muscular) {
    const response = await gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: id_hojacalculo,
        range: 'Ejercicios!A2:D'
    });

    const values = response.result.values;
    if (values && values.length > 0) {
        for (let i = 0; i < values.length; i++) {
            if (values[i][1] === grupo_muscular && values[i][2] === nombre) { // Columnas 1 y 2 contienen grupo muscular y nombre respectivamente
                return i + 2; // +2 porque la primera fila es el encabezado
            }
        }
    }
    return -1; // Si no se encuentra el ejercicio
}
//rutinas
async function obtener_id() {
    const response = await gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: id_hojacalculo,
        range: 'Rutinas!A2:Hs2'
    });

    const values = response.result.values;
    if (values && values.length > 0) {
        let nuevoId = values.length + 2;
        let idRepetido = true;

        while (idRepetido) {
            idRepetido = false;

            for (let i = 0; i < values.length; i++) {
                if (parseInt(values[i][0]) === nuevoId) {
                    idRepetido = true;
                    nuevoId++;
                    break;
                }
            }
        }

        return nuevoId;
    }
    return 2;
}


//clases
class Alumnos {
    constructor() {
        this.mapa = new Map();
    }
    obtener_Mapa() {
        return this.mapa
    }
    obtener_Alumno(dni) {
        return this.mapa.get(dni) || new Map();
    }
    Agregar_alumno(nombre, apellido, telefono, telefono_emergencia, fecha_nacimiento, dni, direccion, Ciudad_Natal, Profesion, antecedentes, cuales, hist_clinico, dias_entrenamiento, horarios_entrenamiento,altura, peso, masa_muscular, grasa_corporal) {
        const newalumno ={
            nombre: nombre,
            apellido: apellido,
            telefono: telefono,
            telefono_emergencia: telefono_emergencia,
            fecha_nacimiento: fecha_nacimiento,
            dni: dni,
            direccion: direccion,
            Ciudad_Natal: Ciudad_Natal,
            Profesion: Profesion,
            antecedentes: antecedentes,
            cuales: cuales,
            historial_clinico: hist_clinico,

            dias_entrenamiento: dias_entrenamiento,
            horarios_entrenamiento: horarios_entrenamiento,

            altura: altura,
            peso: peso,
            masa_muscular: masa_muscular,
            grasa_corporal: grasa_corporal,

            rutina: new Rutina,
            evaluacion: [],
        }
        this.mapa.set(dni, newalumno)
        gennes_Calendario.Agregar(dias_entrenamiento, horarios_entrenamiento, nombre, dni,apellido)
    }
    existe_alumno(dni) {
        return this.mapa.has(dni)
    }
    editar_alumno(dni, telefono, telefono_emergencia, direccion, ciudad_natal, profesion, altura, hist_clinico, dias_entrenamiento, horarios_entrenamiento, peso, masa_muscular, grasa_corporal) {
        var alumno = this.mapa.get(dni)

        alumno.telefono = telefono
        alumno.telefono_emergencia = telefono_emergencia
        alumno.historial_clinico = hist_clinico
        alumno.altura = altura
        alumno.direccion = direccion
        alumno.Ciudad_Natal = ciudad_natal
        alumno.Profesion = profesion

        if (peso != 0  || peso != alumno.peso[alumno.peso-1]) {
            alumno.peso.push(peso)
        }
        if (grasa_corporal != 0) {
            alumno.grasa_corporal.push(grasa_corporal)
        }
        if (masa_muscular != 0) {
            alumno.masa_muscular.push(masa_muscular)
        }

        gennes_Calendario.eliminar(dni)

        alumno.dias_entrenamiento = dias_entrenamiento
        alumno.horarios_entrenamiento = horarios_entrenamiento

        gennes_Calendario.Agregar(dias_entrenamiento, horarios_entrenamiento, alumno.nombre)


        this.mapa.set(dni, alumno)

        editar_alumno_bd(this.mapa.get(dni))
    }
    agregar_rutina(dni, rutina) {
        var alumno = this.mapa.get(dni)

        alumno.rutina = rutina
    }
}
const gennes_alumnos = new Alumnos();


class Calendario {
    constructor() {
        this.mapa = new Map()
    }
    Agregar(dias, horarios, nombre,dni,apellido) {
        const nombrecompleto = nombre + ' ' + apellido;
        const datos={
            Nombre:nombrecompleto,
            Dni:dni
        }
        var alumnos = [[], [], [], [], []];
        if (dias !== null && dias !== undefined) {
            for (let i = 0; i < dias.length; i++) {
                if (dias[i] === "Lunes") {

                    if (this.mapa.has(horarios[0])) {
                        alumnos = this.mapa.get(horarios[0])
                        if (!alumnos[0].some(item => item.Nombre === datos.Nombre && item.Dni === datos.Dni)) {
                            alumnos[0].push(datos)
                            this.mapa.set(horarios[0], alumnos)
                        }
                    } else {
                        alumnos[0].push(datos)
                        this.mapa.set(horarios[0], alumnos)
                    }
                }
                if (dias[i] === "Martes") {
                    if (this.mapa.has(horarios[1])) {
                        alumnos = this.mapa.get(horarios[1])
                        if (!alumnos[1].some(item => item.Nombre === datos.Nombre && item.Dni === datos.Dni)) {
                            alumnos[1].push(datos)
                            this.mapa.set(horarios[1], alumnos)
                        }
                    } else {
                        alumnos[1].push(datos)
                        this.mapa.set(horarios[1], alumnos)
                    }
                }
                if (dias[i] === "Miercoles") {
                    if (this.mapa.has(horarios[2])) {
                        alumnos = this.mapa.get(horarios[2])

                        if (!alumnos[2].some(item => item.Nombre === datos.Nombre && item.Dni === datos.Dni)) {
                            alumnos[2].push(datos)
                            this.mapa.set(horarios[2], alumnos)
                        }
                    } else {
                        alumnos[2].push(datos)
                        this.mapa.set(horarios[2], alumnos)
                    }
                }
                if (dias[i] === "Jueves") {

                    if (this.mapa.has(horarios[3])) {
                        alumnos = this.mapa.get(horarios[3])
                        if (!alumnos[3].some(item => item.Nombre === datos.Nombre && item.Dni === datos.Dni)) {
                            alumnos[3].push(datos)
                            this.mapa.set(horarios[3], alumnos)
                        }
                    } else {
                        alumnos[3].push(datos)
                        this.mapa.set(horarios[3], alumnos)
                    }
                }
                if (dias[i] === "Viernes") {

                    if (this.mapa.has(horarios[4])) {
                        alumnos = this.mapa.get(horarios[4])
                        if (!alumnos[4].some(item => item.Nombre === datos.Nombre && item.Dni === datos.Dni)) {
                            alumnos[4].push(datos)
                            this.mapa.set(horarios[4], alumnos)
                        }
                    } else {
                        alumnos[4].push(datos)
                        this.mapa.set(horarios[4], alumnos)
                    }
                }
            }
        }
    }
    eliminar(dni) {
        var alumno = gennes_alumnos.obtener_Alumno(dni);
        var horariosanteriores = alumno.horarios_entrenamiento;
        var diasanteriores = alumno.dias_entrenamiento;

        if (diasanteriores !== null && diasanteriores !== undefined && !horariosanteriores !== null && horariosanteriores !== undefined) {
            for (let i = 0; i < diasanteriores.length; i++) {
                const dia = diasanteriores[i];
                if (dia === "Lunes") {
                    const horario = this.mapa.get(horariosanteriores[0]);
                    if (horario[0].length > 0) {
                        const indice = horario[0].indexOf(alumno.nombre);
                        horario[0].splice(indice, 1);
                    }
                }
                if (dia === "Martes") {
                    const horario = this.mapa.get(horariosanteriores[1]);
                    if (horario[1].length > 0) {
                        const indice = horario[1].indexOf(alumno.nombre);
                        horario[1].splice(indice, 1);
                    }
                }
                if (dia === "Miercoles") {
                    const horario = this.mapa.get(horariosanteriores[2]);
                    if (horario[2].length > 0) {
                        const indice = horario[2].indexOf(alumno.nombre);
                        horario[2].splice(indice, 1);
                    }
                }
                if (dia === "Jueves") {
                    const horario = this.mapa.get(horariosanteriores[3]);
                    if (horario[3].length > 0) {
                        const indice = horario[3].indexOf(alumno.nombre);
                        horario[3].splice(indice, 1);
                    }
                }
                if (dia === "Viernes") {
                    const horario = this.mapa.get(horariosanteriores[4]);
                    if (horario[4].length > 0) {
                        const indice = horario[4].indexOf(alumno.nombre);
                        horario[4].splice(indice, 1);
                    }
                }
            }
        }
        this.eliminarClavesVacias(this.mapa)
    }

    mostrar(menu) {
        const agenda = document.getElementById('agenda');
        agenda.innerHTML = '';
        if (this.mapa.size > 0) {
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
        const calendarioOrdenado = Array.from(this.mapa.keys()).sort();
        calendarioOrdenado.forEach(clave => {
            const semana = this.mapa.get(clave);

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
                    alumnos.forEach(datos => {
                        const alumno = document.createElement('a');
                        alumno.textContent = datos.Nombre;
                        alumno.onclick = function () {
                            menu.monstrarAlumno(datos.Dni);
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

    eliminarClavesVacias(objeto) {
        objeto.forEach((valor, clave) => {
            if (this.isEmpty(valor)) {
                objeto.delete(clave);
            }
        });
    }


    isEmpty(valor) {
        for (let i = 0; i < valor.length; i++) {
            if (valor[i].length > 0)
                return false
        }
        return true
    }
}
const gennes_Calendario = new Calendario();

class Ejercicio {
    constructor() {
        this.mapa = new Map()
    }
    Agregar(grupo_muscular, nombre_ejercicio, url) {
        var grupo_muscular_actualizado = grupo_muscular.charAt(0).toUpperCase() + grupo_muscular.slice(1).toLowerCase();
        var nombre_ejercicio_actualizado = nombre_ejercicio.charAt(0).toUpperCase() + nombre_ejercicio.slice(1).toLowerCase();
        const ejercicio = {
            grupo_muscular: grupo_muscular_actualizado,
            nombre: nombre_ejercicio_actualizado,
            url: url
        }
        var listaejercicios = []
        if (this.mapa.has(ejercicio.grupo_muscular)) {
            listaejercicios = this.mapa.get(ejercicio.grupo_muscular)
            const ejercicioExistente = listaejercicios.find(ej => ej.nombre === ejercicio.nombre);
            if (!ejercicioExistente) {
                listaejercicios.push(ejercicio);
            }
        } else
            listaejercicios.push(ejercicio)

        this.mapa.set(ejercicio.grupo_muscular, listaejercicios)
    }
    obtener_ejercicios(grupo_muscular) {
        return this.mapa.get(grupo_muscular)
    }
    Mostrar(menu){
        const contenedor = document.getElementById('grupos_musculares');
        contenedor.innerHTML = '';
    
        this.mapa.forEach((valor,clave)=>{
            const ejercicio = document.createElement('button');
            ejercicio.textContent = clave;
            ejercicio.onclick = function() {
                menu.mostrarEjercicios(valor)
            };
            contenedor.appendChild(ejercicio);
        })
    }
}
const gennes_ejercicios = new Ejercicio()

//13/03/2024
class Bloque {
    constructor(nro) {
        this.nro = nro
        this.ejercicios = ''
        this.series = 0
    }

    Agregar(ejercicio) {
        this.ejercicios= ejercicio
    }
}
class Rutina {
    constructor() {
        this.id = 0 // Valor temporal
        this.fecha_actual = obtener_fecha_actual()
        this.dias = {}
        for (let i = 1; i <= 5; i++)
            this.dias[i] = []

        this.plan = 0
    }
    Obtener_Bloques(dia) {
        return this.dias[dia]
    }
    Agregar_Bloque(bloque, dia) {
        this.dias[dia].push(bloque)
    }
    Eliminar_Bloque(dia, eliminar) {
        var bloques = this.Obtener_Bloques(dia);
        for (let i = 0; i < bloques.length; i++) {
            if (bloques[i].nro === eliminar) {
                bloques.splice(i, eliminar);

                for (let j = i; j < bloques.length; j++) {
                    bloques[j].nro -= 1;
                }

                break;
            }
        }

    }
    obtener_id(){
        return this.id
    }
    async asignarId() {
        try {
            this.id = await obtener_id();
        } catch (error) {
            console.error(error);
        }
    }
    mostrar(){
        
    }
}
/*
document.addEventListener('DOMContentLoaded', function(){
    obtener_alumno_bd();
    obtener_ejercicios_bd();
})*/