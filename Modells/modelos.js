class Persona {
    constructor(nombre, apellido, telefono, telefono_emergencia, fecha_nacimiento, dni, direccion, Ciudad_Natal, Profesion, hist_clinico,dias_entrenamiento,horarios_entrenamiento) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.telefono = telefono;
        this.telefono_emergencia = telefono_emergencia;
        this.fecha_nacimiento = fecha_nacimiento;
        this.dni = dni;
        this.direccion = direccion;
        this.Ciudad_Natal = Ciudad_Natal;
        this.Profesion = Profesion
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
const mapa_Ejercicios = new Map()
const calendario = new Map()
var listaejercicios = []
listaejercicios.push('Sentadillas')
listaejercicios.push('Sentadillas Isometricas')
mapa_Ejercicios.set('Piernas',listaejercicios)

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
    Agregar_alumno(nombre, apellido, telefono, telefono_emergencia, fecha_nacimiento, dni, direccion, Ciudad_Natal, Profesion, hist_clinico,dias_entrenamiento,horarios_entrenamiento){
        const newalumno = new Persona(nombre, apellido, telefono, telefono_emergencia, fecha_nacimiento, dni, direccion, Ciudad_Natal, Profesion, hist_clinico,dias_entrenamiento,horarios_entrenamiento)
        this.mapa_alumno.set(dni,newalumno)
    }
    existe_alumno(dni){
        return this.mapa_alumno.has(dni)
    }
    editar_alumno(dni, telefono, telefono_emergencia,direccion,ciudad_natal,profesion, altura, hist_clinico ,dias_entrenamiento,horarios_entrenamiento, peso, masa_muscular,grasa_corporal){
        var alumno = this.mapa_alumno.get(dni)

        alumno.telefono = telefono
        alumno.telefono_emergencia = telefono_emergencia
        alumno.historial_clinico = hist_clinico
        alumno.dias_entrenamiento = dias_entrenamiento
        alumno.horarios_entrenamiento = horarios_entrenamiento
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

        this.mapa_alumno.set(dni,alumno)
    }
    agregar_rutina(dni,rutina){
        var alumno = this.mapa_alumno.get(dni)

        alumno.rutina.push(rutina)
    }
}