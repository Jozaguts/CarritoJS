# Carrito JS

## Introduction

Carrito js es simplemente una practica para modificar el DOM, manipular el local storage y hacer un poco de traversing con Vanilla JS

## Code Samples

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

###
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