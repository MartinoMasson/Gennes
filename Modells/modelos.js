class Persona {
    constructor(nombre, email, telefono, telefono_emergencia, sexo, edad, altura, hist_clinico,dias_entrenamiento,horarios_entrenamiento) {
        this.nombre = nombre;
        this.email = email;
        this.telefono = telefono;
        this.telefono_emergencia = telefono_emergencia;
        this.sexo = sexo;
        this.edad = edad;
        this.altura = altura;
        this.peso =[];
        this.masa_muscular =[];
        this.grasa_corporal =[];
        this.historial_clinico = hist_clinico;
        this.dias_entrenamiento = dias_entrenamiento;
        this.horarios_entrenamiento = horarios_entrenamiento;
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
const mapa_alumno = new Map();
const calendario = new Map()
const mapa_Ejercicios = new Map()

var listaejercicios = []
listaejercicios.push('Sentadillas')
listaejercicios.push('Sentadillas Isometricas')
mapa_Ejercicios.set('Piernas',listaejercicios)