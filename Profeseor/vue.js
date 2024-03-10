//vue
const {createApp} = Vue
        
const menu = createApp({
    data() {
        return {
            verAgenda: true,
            verListaAlumnos: false,
            verEjercicios: false,
            verNuevoAlumno: false,
            verAlumno:false,

            //input necesarios para agregar Alumnos
            newnombre:'',
            newsexo:'',
            mensaje_newalumno_nom:'',
            mensaje_newalumno_sexo:'',
            mensaje_nombre:false,
            mensaje_sexo:false,//mensaje error de agregar alumno
            
            verGrupos: true,
            verListaEjercicios: false,
            verAgregar: false,
        
            //input necesarios para agregar Ejercicio
            mensaje_grupo_muscular:false, 
            mensaje_ejercicio:false,       
            newgrupo_muscular:'',
            newnombre_ejercicio:'',
            mensaje_newgrupo_muscular:'',//mensaje error de agregar ejercicios
            mensaje_newnombre_ejercicio:'',//mensaje error de agregar ejercicios

            verRutina:false,
            Rutina:true,
            verNuevaRutina: false,
            agregarEjercicios:false
        }
    },
    methods:{
        monstrarAgenda(){
            this.verAgenda = true;
            this.verListaAlumnos = false;
            this.verEjercicios = false;
            this.verNuevoAlumno = false;
            this.verAlumno = false;
            this.verNuevaRutina =  true;
            Llenar_Calendario(this);
        },
        monstrarListaAlumnos(){
            this.verAgenda = false;
            this.verListaAlumnos = true;
            this.verEjercicios = false;
            this.verNuevoAlumno = false;
            this.verAlumno = false;
            Mostrar_Alumnos(this)
        },
        monstrarEjercicios(){
            this.verAgenda = false;
            this.verListaAlumnos = false;
            this.verEjercicios = true;
            this.verNuevoAlumno = false;
            this.verAlumno = false;
        },
        monstrarNuevoAlumno(){
            this.verAgenda = false;
            this.verListaAlumnos = false;
            this.verEjercicios = false;
            this.verNuevoAlumno = true;
            this.verAlumno = false;
        }, 
        monstrarAlumno(nombre){
            this.verAgenda = false;
            this.verListaAlumnos = false;
            this.verEjercicios = false;
            this.verNuevoAlumno = false;
            this.verAlumno = true;
            LLenar_campos(nombre)
        },

        agregarAlumno(){
            if(this.newnombre.trim() !== '' && this.newsexo.trim() !== ''){
                NuevoAlumno()
                this.monstrarListaAlumnos();
            }else{
                if(this.newnombre.trim() === ''){
                    this.mensaje_newalumno_nom='Ingrese el Nombre Completo';
                    this.mensaje_nombre = true;
                }else{
                    this.mensaje_newalumno_nom='';
                    this.mensaje_nombre = false;
                }
                if(this.newsexo.trim() === ''){
                    this.mensaje_newalumno_sexo='Seleccione un sexo';
                    this.mensaje_sexo = true;
                }else{
                    this.mensaje_newalumno_sexo='';
                    this.mensaje_sexo = false;
                }
            } 
        },

        mostrarEjercicios(lista){
            this.verGrupos = false;
            this.verListaEjercicios = true;
            this.verAgregar = false;
            llenar_ejercicios(lista);
        },
        ocultarEjercicios(){
            this.verGrupos = true;
            this.verListaEjercicios = false;
            LlenarGrupoMusculares(this);
        },
        mostrargrupos(){
            this.verGrupos = true;
            this.verListaEjercicios = false;
            this.verAgregar = false;            
        },
        mostrarAgregarEjercicios(){
            this.verGrupos = true;
            this.verListaEjercicios = false;
            this.verAgregar = true;
        },
        ocultarAgregarEjercicios(){
            this.verGrupos = true;
            this.verListaEjercicios = false;
            this.verAgregar = false;
        },
        AgregarEjercicios(){
            if(this.newgrupo_muscular.trim() !== '' && this.newnombre_ejercicio.trim() !== ''){
                this.verGrupos = true;
                this.verListaEjercicios = false;
                this.verAgregar = false;
                agregarEjercicio(this)
                LlenarGrupoMusculares(this);
            }else{
                if(this.mensaje_newnombre_ejercicio.trim() === ''){
                    this.mensaje_newnombre_ejercicio='Ingrese el nombre del ejercicios';
                    this.mensaje_ejercicio = true;
                }else{
                    this.mensaje_newnombre_ejercicio='';
                    this.mensaje_ejercicio = false;
                }
                if(this.mensaje_newgrupo_muscular.trim() === ''){
                    this.mensaje_newgrupo_muscular='Escriba un grupo muscular';
                    this.mensaje_grupo_muscular = true;
                }else{
                    this.mensaje_newgrupo_muscular='';
                    this.mensaje_grupo_muscular = false;
                }
            }
        },
        
        mostrarRutina(){
            this.verAgenda =  false;
            this.verListaAlumnos =  false;
            this.verEjercicios =  false;
            this.verNuevoAlumno =  false;
            this.verAlumno = false;            
            this.verGrupos =  false;
            this.verListaEjercicios =  false;
            this.verAgregar =  false;
            this.verRutina =  true;
        },
        mostrarNuevaRutina(){
            this.Rutina = false;
            this.verNuevaRutina = true;
        },
        ocultarNuevaRutina(){
            this.Rutina = true;
            this.verNuevaRutina = false;
        },
        agregarEjercicio(){
            this.agregarEjercicios = true
        }



    },
    mounted(){
        Llenar_Calendario(this);
        LlenarGrupoMusculares(this);
    }
});
menu.mount('#opcionesmenu');