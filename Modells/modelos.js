async function Agregaralumno_bd(nombre,apellido,dni,Fecha_Nacimiento,Telefono,Telefono_emergencia,Direccion,Ciudad_Natal,Profesion,Antecedentes,Cuales,historial_clinico,diasEntrenamiento,horarios_entrenamiento){
    try{
        const respuesta = await fetch('https://sheet.best/api/sheets/a92d498e-7ce7-4907-b28c-95570e625f61',{
            method: 'POST',
            mode: 'cors',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                "Nombre": nombre,
                "Apellido": apellido,
                "Dni":dni,
                "Fecha_Nacimiento":Fecha_Nacimiento,
                "Telefono" :Telefono,
                "Telefono_emergencia": Telefono_emergencia,
                "Direccion": Direccion,
                "Ciudad:Natal": Ciudad_Natal,
                "Profesion": Profesion,
                "Antecedentes": Antecedentes,
                "Cuales": Cuales,
                "Historial_clinico":historial_clinico,
                "Dias_entrenamiento":diasEntrenamiento,
                "Horarios_entrenamiento":horarios_entrenamiento,

            })
        });
    
        const contenido = await respuesta.json()
        console.log(contenido)
    }catch(err){
        console.log(err)
    }
}
async function obtener_Alumno_bd(){
    try{
        const respuesta = await fetch('https://sheet.best/api/sheets/a92d498e-7ce7-4907-b28c-95570e625f61');

        const contenido = await respuesta.json()
        //console.log(contenido)
        for(let i=0;i<contenido.length;i++){
            const alumno = contenido[i]
            console.log(JSON.parse(alumno.Horarios_entrenamiento))
            gennes_alumnos.Agregar_alumno(alumno.Nombre,alumno.Apellido,alumno.Telefono,alumno.Telefono_Emergencia,alumno.Fecha_Nacimiento,alumno.Dni,alumno.Direccion,alumno.Ciudad_Natal,alumno.Profesion,alumno.Antecedentes,alumno.Cuales,alumno.Historial_clinico,JSON.parse(alumno.Dias_entrenamiento),JSON.parse(alumno.Horarios_entrenamiento))
            gennes_Calendario.Agregar(JSON.parse(alumno.Dias_entrenamiento),JSON.parse(alumno.Horarios_entrenamiento),alumno.Nombre)
        }
    }catch(err){
        console.log(err)
    }
}

class Persona {
    constructor(nombre, apellido, telefono, telefono_emergencia, fecha_nacimiento, dni, direccion, Ciudad_Natal, Profesion,antecedentes,cuales, hist_clinico,dias_entrenamiento,horarios_entrenamiento) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.telefono = telefono;
        this.telefono_emergencia = telefono_emergencia;
        this.fecha_nacimiento = fecha_nacimiento;
        this.dni = dni;
        this.direccion = direccion;
        this.Ciudad_Natal = Ciudad_Natal;
        this.Profesion = Profesion;
        this.antecedentes = antecedentes;
        this.cuales=cuales;
        this.historial_clinico = hist_clinico;

        this.dias_entrenamiento = dias_entrenamiento;
        this.horarios_entrenamiento = horarios_entrenamiento;
        
        this.altura = 0;
        this.peso =[];
        this.masa_muscular =[];
        this.grasa_corporal =[];

        this.rutina =[];
        this.evaluacion =[];
    }
}

class Alumnos {
    constructor(){
        this.mapa_alumno = new Map();
    }
    obtener_Mapa(){
        return this.mapa_alumno
    }
    obtener_Alumno(dni){
        return this.mapa_alumno.get(dni) || new Map();
    }
    Agregar_alumno(nombre, apellido, telefono, telefono_emergencia, fecha_nacimiento, dni, direccion, Ciudad_Natal, Profesion,antecedentes,cuales, hist_clinico,dias_entrenamiento,horarios_entrenamiento){
        const newalumno = new Persona(nombre, apellido, telefono, telefono_emergencia, fecha_nacimiento, dni, direccion, Ciudad_Natal, Profesion,antecedentes,cuales, hist_clinico,dias_entrenamiento,horarios_entrenamiento)
        this.mapa_alumno.set(dni,newalumno)
        gennes_Calendario.Agregar(dias_entrenamiento,horarios_entrenamiento,nombre)
    }
    existe_alumno(dni){
        return this.mapa_alumno.has(dni)
    }
    editar_alumno(dni, telefono, telefono_emergencia,direccion,ciudad_natal,profesion, altura, hist_clinico ,dias_entrenamiento,horarios_entrenamiento, peso, masa_muscular,grasa_corporal){
        var alumno = this.mapa_alumno.get(dni)

        alumno.telefono = telefono
        alumno.telefono_emergencia = telefono_emergencia
        alumno.historial_clinico = hist_clinico
        alumno.altura = altura
        alumno.direccion = direccion
        alumno.Ciudad_Natal = ciudad_natal
        alumno.Profesion = profesion
    
        if(peso != 0){
            alumno.peso.push(peso)
        }
        if(grasa_corporal != 0){
            alumno.grasa_corporal.push(grasa_corporal)
        }
        if(masa_muscular != 0){
            alumno.masa_muscular.push(masa_muscular)
        }

        gennes_Calendario.eliminar(dni)
        
        alumno.dias_entrenamiento = dias_entrenamiento
        alumno.horarios_entrenamiento = horarios_entrenamiento

        gennes_Calendario.Agregar(dias_entrenamiento,horarios_entrenamiento,alumno.nombre)


        this.mapa_alumno.set(dni,alumno)
    }
    agregar_rutina(dni,rutina){
        var alumno = this.mapa_alumno.get(dni)

        alumno.rutina.push(rutina)
    }
}
const gennes_alumnos = new Alumnos();


class Calendario{
    constructor(){
        this.mapa = new Map()
    }
    Agregar(dias,horarios,nombre){
        if(dias !== null && dias !== undefined){
            for(let i=0;i<dias.length;i++){
                if (dias[i] === "Lunes") {
                    var alumnos = [[],[],[],[],[]];
                    
                    if(this.mapa.has(horarios[0])){
                        alumnos = this.mapa.get(horarios[0])
                        if(!alumnos[0].includes(nombre)){
                            alumnos[0].push(nombre)
                            this.mapa.set(horarios[0],alumnos)
                        }
                    }else{
                        alumnos[0].push(nombre)
                        this.mapa.set(horarios[0],alumnos)
                    }
                }
                if(dias[i] === "Martes"){
                    var alumnos = [[],[],[],[],[]];
                    if(this.mapa.has(horarios[1])){
                        alumnos = this.mapa.get(horarios[1])
                        if(!alumnos[1].includes(nombre)){
                            alumnos[1].push(nombre)
                            this.mapa.set(horarios[1],alumnos)
                        }
                    }else{
                        alumnos[1].push(nombre)
                        this.mapa.set(horarios[1],alumnos)
                    }
                }        
                if(dias[i] === "Miercoles"){
                    var alumnos = [[],[],[],[],[]];
                    if(this.mapa.has(horarios[2])){
                        alumnos = this.mapa.get(horarios[2])

                        if(!alumnos[2].includes(nombre)){
                            alumnos[2].push(nombre)
                            this.mapa.set(horarios[2],alumnos)
                        }
                    }else{
                        alumnos[2].push(nombre)
                        this.mapa.set(horarios[2],alumnos)
                    }
                }    
                if(dias[i] === "Jueves"){
                    var alumnos = [[],[],[],[],[]];
                    
                    if(this.mapa.has(horarios[3])){
                        alumnos = this.mapa.get(horarios[3])
                        if(!alumnos[3].includes(nombre)){
                            alumnos[3].push(nombre)
                            this.mapa.set(horarios[3],alumnos)
                        }
                    }else{
                        alumnos[3].push(nombre)
                        this.mapa.set(horarios[3],alumnos)
                    }
                }
                if(dias[i] === "Viernes"){
                    var alumnos = [[],[],[],[],[]];
                    
                    if(this.mapa.has(horarios[4])){
                        alumnos = this.mapa.get(horarios[4])
                        if(!alumnos[4].includes(nombre)){
                            alumnos[4].push(nombre)
                            this.mapa.set(horarios[4],alumnos)
                        }
                    }else{
                        alumnos[4].push(nombre)
                        this.mapa.set(horarios[4],alumnos)
                    }
                }
            }
        }
    }
    eliminar(dni){
        var alumno = gennes_alumnos.obtener_Alumno(dni);
        var horariosanteriores = alumno.horarios_entrenamiento;
        var diasanteriores = alumno.dias_entrenamiento;
        
        if(diasanteriores !== null && diasanteriores !== undefined && !horariosanteriores !== null && horariosanteriores !== undefined){
            console.log(diasanteriores)
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
    
    mostrar(menu){
        const agenda = document.getElementById('agenda');
        agenda.innerHTML = '';
        if(this.mapa.size> 0){
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

    eliminarClavesVacias(objeto) {
        objeto.forEach((valor, clave) => {
            if(this.isEmpty(valor)){
                objeto.delete(clave);
            }
        });
    }

    
    isEmpty(valor) {
        for(let i=0;i<valor.length;i++){
            if(valor[i].length > 0)
                return false
        }
        return true
    }
}
const gennes_Calendario = new Calendario


const mapa_Ejercicios = new Map()

var listaejercicios = []
listaejercicios.push('Sentadillas')
listaejercicios.push('Sentadillas Isometricas')

mapa_Ejercicios.set('Piernas',listaejercicios)
class Ejercicio{
    constructor(ejercicio,dia,bloque){
        this.ejercicio=ejercicio
        this.dia=dia
        this.bloque=bloque
        this.repeticiones=0
        this.peso=0
        this.objetivo=0
        this.fuerza_max = (this.peso)/(1.0278-(0.0278 * this.repeticiones))
    }
}
class Bloque{
    constructor(nro){
        this.nro = nro
        this.ejercicios = []
        this.series = 0
    }
    
    Agregar(ejercicio){
        this.ejercicios.push(ejercicio)
    }

    Eliminar_Ejercicio(ejercicio) {
        for (let i = 0; i < this.ejercicios.length; i++) {
            if (this.ejercicios[i].ejercicio === ejercicio) {
                this.ejercicios.splice(i, 1);
                break;
            }
        }
    }
}
class Rutina{
    constructor(){
        this.dias = {}
        for(let i=1 ; i<=5;i++)
            this.dias[i]=[]

        this.plan=0
    }
    Obtener_Bloques(dia){
        return this.dias[dia]
    }
    Agregar_Bloque(bloque,dia){
        this.dias[dia].push(bloque)
    }
    Eliminar_Bloque(dia, eliminar) {
        var bloques = this.Obtener_Bloques(dia);
        for (let i = 0; i < bloques.length; i++) {
            if (bloques[i].nro === eliminar) {
                bloques.splice(i,eliminar);
             
                for (let j = i; j < bloques.length; j++) {
                    bloques[j].nro -= 1;
                }
             
                break;
            }
        }
        
    }
}