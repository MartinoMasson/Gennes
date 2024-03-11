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
            newapellido:'',
            newdocumento:'',
            newfecha_nacimiento:'',
            mensaje_newalumno_nom:'',
            mensaje_newalumno_apellido:'',
            mensaje_newalumno_doc:'',
            mensaje_newalumno_fecha_nacimiento:'',
            mensaje_nombre:false,
            mensaje_apellido:false,
            mensaje_documento:false,
            mensaje_fecha_nacimiento:false,//mensaje error de agregar alumno
            
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
            agregarejercicio_rutina:false
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
            this.verRutina = false;
            Llenar_Calendario(this);
        },
        monstrarListaAlumnos(){
            this.verAgenda = false;
            this.verListaAlumnos = true;
            this.verEjercicios = false;
            this.verNuevoAlumno = false;
            this.verAlumno = false;
            this.verRutina = false;
            Mostrar_Alumnos(this)
        },
        monstrarEjercicios(){
            this.verAgenda = false;
            this.verListaAlumnos = false;
            this.verEjercicios = true;
            this.verNuevoAlumno = false;
            this.verAlumno = false;
            this.verRutina = false;
        },
        monstrarNuevoAlumno(){
            this.verAgenda = false;
            this.verListaAlumnos = false;
            this.verEjercicios = false;
            this.verNuevoAlumno = true;
            this.verAlumno = false;
            this.verRutina = false;
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
            if(this.newnombre.trim() !== '' && this.newapellido.trim() !== ''
            && this.newdocumento.trim() !== '' && this.newfecha_nacimiento.trim() !== '' ){
                if(!gennes_alumnos.existe_alumno(this.newdocumento.trim())){
                    NuevoAlumno()
                    this.monstrarListaAlumnos();
                    limpiarFormulario()
                    this.newnombre = '';
                    this.newapellido = '';
                    this.newdocumento = '';
                    this.mensaje_newalumno_doc='';
                    this.mensaje_documento = false;
                }else{
                    this.mensaje_newalumno_doc='El documento ingresado existe';
                    this.mensaje_documento = true;
                }
                
            }else{
                if(this.newnombre.trim() === ''){
                    this.mensaje_newalumno_nom='Ingrese el Nombre Completo';
                    this.mensaje_nombre = true;
                }else{
                    this.mensaje_newalumno_nom='';
                    this.mensaje_nombre = false;
                }
                if(this.newapellido.trim() === ''){
                    this.mensaje_newalumno_apellido='Ingrese el Apellido';
                    this.mensaje_apellido = true;
                }else{
                    this.mensaje_newalumno_apellido='';
                    this.mensaje_apellido = false;
                }
                if(this.newdocumento.trim() === ''){
                    this.mensaje_newalumno_doc='Ingrese un docuemnto';
                    this.mensaje_documento = true;
                }else{
                    this.mensaje_newalumno_doc='';
                    this.mensaje_documento = false;
                }
                if(this.newfecha_nacimiento.trim() === ''){
                    this.mensaje_newalumno_fecha_nacimiento='Ingrese un docuemnto';
                    this.mensaje_fecha_nacimiento = true;
                }else{
                    this.mensaje_newalumno_fecha_nacimiento='';
                    this.mensaje_fecha_nacimiento = false;
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

        agregarbloque(bloque_dia,btn,dia){
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
            
            contador[dia-1]++
            nrobloque.textContent = contador[dia-1]
        
            
            var newbloque = new Bloque(nrobloque.textContent)
            newrutina.Agregar_Bloque(newbloque,dia)
        
            contenedorplan.appendChild(nrobloque)
        
            const lista_ejercicios = document.createElement('div')
            lista_ejercicios.id = "ejercicios_rutina"
        
            const btn_agregar_ejercicio = document.createElement('button')
            btn_agregar_ejercicio.textContent = "Agregar Ejercicio"
            btn_agregar_ejercicio.type = "button"
            btn_agregar_ejercicio.onclick = function() {
                this.agregarejercicio_rutina=true
                //bloque_ejercicio=lista_ejercicios
                //Agregar_ejercicios(dia,nrobloque.textContent);
            }; 
        
            eliminar.onclick = function() {
                eliminarBloque(eliminar,bloque_dia,dia,nrobloque.textContent);
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
        
            const btn_agregar_bloque = document.getElementById(btn)
            const contenedor = document.getElementById(bloque_dia)
            
            contenedor.insertBefore(contenedorbloque,btn_agregar_bloque) 
        }



    },
    mounted(){
        Llenar_Calendario(this);
        LlenarGrupoMusculares(this);
    }
});
menu.mount('#opcionesmenu');