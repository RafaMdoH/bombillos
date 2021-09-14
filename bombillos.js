let habitacion = []
let numerocColunas = 0
let numeroFilas = 0

const contarPorFila = (fila,columna) => {
    let cantidad = 0
    if (fila >= 0 & fila < numeroFilas) {
        if(habitacion[fila][columna] !== '1') {
            // contar  desde la posicion en direcion a la derecha hasta el final o hasta encontrar un 1
            for (let i = columna + 1; i < numerocColunas; i++){
                if(habitacion[fila][i] === '1'){
                    break
                } else if (habitacion[fila][i] === '0'){
                    cantidad ++
                }
            }
            // contar desde la posicion en direcion a la izquierda hasta el final o hasta encontrar un 1
            for (let i = columna - 1; i >= 0; i--){
                if(habitacion[fila][i] === '1'){
                    break
                } else if (habitacion[fila][i] === '0'){
                    cantidad ++
                }
            }
        }
    }
    return cantidad
}

const contarPorColumna = (fila,columna) => {
    let cantidad = 0
    if (fila >= 0 & fila < numeroFilas) {
        if(habitacion[fila][columna] !== '1') {
            // contar  desde la posicion en direcion abajo hasta el final o hasta encontrar un 1
            for (let i = fila + 1; i < numeroFilas; i++){
                if(habitacion[i][columna] === '1'){
                    break
                } else if (habitacion[i][columna] === '0'){
                    cantidad ++
                }
            }
            // contar desde la posicion en direcion arriba hasta el final o hasta encontrar un 1
            for (let i = fila; i > 0; i--){
                if(habitacion[i][columna] === '1'){
                    break
                } else if (habitacion[i][columna] === '0'){
                    cantidad ++
                }
            }
        }
    }
    return cantidad
}

const iluminarFila = (fila,columna) => {
    if (fila >= 0 & fila < numeroFilas) {
        if(habitacion[fila][columna] !== '1'){
            if(habitacion[fila][columna] !== '1'){
                // iluminar desde la posicion en direcion a la derecha hasta el final o hasta encontrar un 1
                for (let i = columna + 1; i < numerocColunas; i++){
                    if(habitacion[fila][i] === '1'){
                        break
                    } else if (habitacion[fila][i] === '0'){
                        habitacion[fila][i] = '3'
                    }
                }
                // iluminar desde la posicion en direcion a la izquierda hasta el final o hasta encontrar un 1
                for (let i = columna - 1; i >= 0; i--){
                    if(habitacion[fila][i] === '1'){
                        break
                    } else if (habitacion[fila][i] === '0'){
                        habitacion[fila][i] = '3'
                    }
                }
            }
        }
    }
}

const iluminarColumna = (fila,columna) => {
    if (fila >= 0 & fila < numeroFilas) {
        if(habitacion[fila][columna] !== '1')
        {
            if(habitacion[fila][columna] !== '1'){
                // Iluminar desde la posicion en direcion abajo hasta el final o hasta encontrar un 1
                for (let i = fila + 1; i < numeroFilas; i++){
                    if(habitacion[i][columna] === '1'){
                        break
                    } else if (habitacion[i][columna] === '0'){
                        habitacion[i][columna] = '3'
                    }
                }
                // Iluminar desde la posicion en direcion arriba hasta el final o hasta encontrar un 1
                for (let i = fila; i >= 0; i--){
                    if(habitacion[i][columna] === '1'){
                        break
                    } else if (habitacion[i][columna] === '0'){
                        habitacion[i][columna] = '3'
                    }
                }
            }
        }
    }
}

const  bombillos = () => {
        let focos = 0
        for (let i = 0; i < numeroFilas; i++){
            let mayorI = 0
            let mayorJ = 0
            for (let j = 0; j < numerocColunas; j++){
                if(habitacion[i][j] === '0'){
                    let fila = i
                    let columna = j
                    a = 0
                    do {
                        let espacioLuzPosision = contarPorFila(fila,columna)
                        espacioLuzPosision +=  contarPorColumna(fila,columna)
                        let espacioLuzPosisionB = contarPorFila(fila-1,columna)
                        espacioLuzPosisionB +=  contarPorColumna(fila-1,columna)
                        if (espacioLuzPosisionB > espacioLuzPosision ) {
                            fila = fila - 1
                            columna = columna
                        } else {
                            espacioLuzPosisionB = contarPorFila(fila,columna+1)
                            espacioLuzPosisionB +=  contarPorColumna(fila,columna+1)
                            if (espacioLuzPosisionB > espacioLuzPosision ) {
                                fila = fila
                                columna = columna+1

                            } else {
                                espacioLuzPosisionB = contarPorFila(fila+1,columna)
                                espacioLuzPosisionB +=  contarPorColumna(fila+1,columna)
                                if (espacioLuzPosisionB > espacioLuzPosision ) {
                                    fila = fila+1
                                    columna = columna
                                } else {
                                    espacioLuzPosisionB = contarPorFila(fila,columna-1)
                                    espacioLuzPosisionB +=  contarPorColumna(fila,columna-1)
                                    if (espacioLuzPosisionB > espacioLuzPosision ) {
                                        fila = fila
                                        columna = columna-1
                                    } else {
                                        mayorI = fila
                                        mayorJ = columna
                                        a = 1
                                    }
                                }
                            }
                        }
                    } while (a === 0);
                    habitacion[mayorI][mayorJ] = '2'
                    focos ++
                    iluminarFila(mayorI,mayorJ)
                    iluminarColumna(mayorI,mayorJ)
                }
            }
        }
        return focos
}

const mostrarHabitacion = () => {
    const container = document.getElementById('focos')
    
    habitacion.forEach( (fila, i) => {
        container.innerHTML = container.innerHTML  + `<div class="fila" id="fila${i}"></div>`
        fila.forEach( item => {
            const columna = document.getElementById(`fila${i}`)
            columna.innerHTML = columna.innerHTML + `<div class="${item === '1' && 'pared'}  ${item === '3' | item === '2' && 'luz'} ${item === '4' && 'posicion'} "><span class="${item === '2' && 'foco'}"></span></div>`
        })
    })

}




function crearMatrix(contenido) {
    for (const letra of contenido) {
        if (letra !== '1'){
            if(letra !== '0') {
                if(letra !== ','){
                    if(letra !== '\n'){
                        console.log(letra);
                        mostrarContenido('la matris solo acepta 1 y 0 separados por comas')
                        return
                    }
                }
            } 
        }
    }
    contenido =  contenido.split('\n')
    habitacion = contenido.map( elemento => {
        return elemento.split(',')
    })
    numerocColunas = habitacion[0].length
    numeroFilas = habitacion.length
    const focos = bombillos()
    mostrarContenido(`cantidad de bombillas que se necesitan para iluminar la habitación: ${focos}`)
    mostrarHabitacion()

}

function cargarMatrix(evt) {
    evt.preventDefault();
    let archivo = evt.target.archivo.files[0];
    if (!archivo ) {
        mostrarContenido("No seleciono ningun archivo")
        return
    }
    if (archivo.type !== "text/plain") {
        mostrarContenido("No es un archivo .txt")
        return 
    }
    let lector = new FileReader();
    lector.onload = (e) => {
        let contenido = e.target.result;
        crearMatrix(contenido)
    };
    lector.readAsText(archivo);
}
  
function mostrarContenido(contenido) {
    var elemento = document.getElementById('contenido-archivo');
    elemento.innerHTML = contenido;
}