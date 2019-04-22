//variables 
const carrito  = document.getElementById('carrito')
const cursos = document.getElementById('lista-cursos')
const listaCarrito = document.getElementById('lista-carrito')
const btnVaciarCarrito = document.getElementById('vaciar-carrito')






//listeners

listeners();
function listeners(){
    //dispara cuando se presiona agregar carrito
    cursos.addEventListener('click',comprarCurso);
    // eliminar del carrito
    carrito.addEventListener('click',eliminarCurso);
    //vaciar carrito
    btnVaciarCarrito.addEventListener('click', vaciarCarrito)
    // Al cargar el document cargar de local stoge
    document.addEventListener('DOMContentLoaded',leerLS)


}


//functions
function comprarCurso(e){
e.preventDefault();
// delegation paara agregar carrito
if(e.target.classList.contains('agregar-carrito')){
        const curso = e.target.parentElement.parentElement;

            // Leer los datos del curso seleccionado
            leerDatos(curso);
    }

} 
// lee los datos del curso

function leerDatos(curso){

    const datosCurso = {

        img: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id')

    }

    insertarCarrito(datosCurso);

}


function insertarCarrito(curso){
    const row = document.createElement('tr')
    row.innerHTML=`
        <td>
            <img src="${curso.img}" width="100">
        </td>
        <td>${curso.titulo}</td>
        <td>${curso.precio}</td>
        <td>
            <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
        </td>
    `;
    listaCarrito.appendChild(row)

    guardarCursoLocalStorage(curso);
}
// elimina el curso del carrito del DOM
function eliminarCurso(e){
    e.preventDefault();
    let curso, cursoId;
 
    if(e.target.classList.contains('borrar-curso')){
        e.target.parentElement.parentElement.remove();
        curso = e.target.parentElement.parentElement;
        cursoId = curso.querySelector('a').getAttribute('data-id');
        

  }
 
  eliminarCursoLS(cursoId);

}
//elimina todos los curso del carrito
function vaciarCarrito(){


    while(listaCarrito.firstChild){
        listaCarrito.removeChild(listaCarrito.firstChild);
    }
   

    //vaciar carrito de LS
    vaciarCarritoLS();
    return false;
}

//almacena en local storage

function guardarCursoLocalStorage(curso){
let cursos;


// toma el valor de un arreglo con datos de LS o vacio
cursos = obtenerCursosLocalStorage();




// // el curso seleccionado se agrega al arreglo
cursos.push(curso)

localStorage.setItem('cursos', JSON.stringify(cursos))


}


// comprueba que haya Elementos en LS
function obtenerCursosLocalStorage(){
let cursosLS;
//si hay algo en local storage
if(localStorage.getItem('cursos')===null){
    cursosLS = [];
}else{
    cursosLS = JSON.parse(localStorage.getItem('cursos'));

}
return cursosLS;
}

// imprime los cursos de local storage en el carrito
function leerLS(){
    let cursosLS;

    cursosLS = obtenerCursosLocalStorage();

    cursosLS.forEach(curso=> {
        
    const row = document.createElement('tr');
    
    
      row.innerHTML = `
            <td>
                <img src="${curso.img}" width="100">
            </td>
            <td>${curso.titulo}</td>
            <td>${curso.precio}</td>
            <td> 
                <a href="#" class="borrar-curso" data-id="${curso.id}">X</>
            </td>
    `
    listaCarrito.appendChild(row)
    
    });


}

// eliminar el curso por ID en LS
function eliminarCursoLS(curso){

    let cursosLS;

    cursosLS = obtenerCursosLocalStorage();

    cursosLS.forEach(function( cursoLS, index) {
 
        if(cursoLS.id === curso){

            // console.log('si')
            cursosLS.splice(index,1)
        }
    })
   localStorage.setItem('cursos',JSON.stringify(cursosLS))

}
function vaciarCarritoLS(){
    localStorage.clear();
}