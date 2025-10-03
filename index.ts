
//EJERCICIO1:
function sumaRecursiva(arr: number[]): number {
  if(arr.length === 0) {

    return 0;
} else {
    
    let suma=0;
    suma = arr.at(arr.length-1)as number;
    arr.pop();
    return suma + sumaRecursiva(arr)
    
    

  }
}

// Ejemplo de uso:
const numeros = [1, 2, 3, 4, 5];
const resultadoSuma = sumaRecursiva(numeros);
console.log(`La suma recursiva es: ${resultadoSuma}`); // Debería imprimir 15

/////////////////////////////////////////////////////////////////////////////////

//EJERCICIO2
interface Usuario {
  id: number;
  name: string;
  username: string;
  email: string;
}
 
function procesarUsuarios(usuarios: Usuario[]): string {
    
    const mayores:string = usuarios.reduce((acum,n) => {
        if(n.id<=5){
            console.log(n.id);
            return acum + "Name " + n.name + ", " + "Username " + n.username + ", ";
        }
        return acum;
    }, "")

    return mayores;
}
 
// Ejemplo de uso (puedes crear un array de usuarios de prueba):
const usuariosDePrueba = [
    { id: 1, name: 'Juan', username: 'juanito', email: 'juan@example.com' },
    { id: 5, name: 'Maria', username: 'mariita', email: 'maria@example.com' },
    { id: 6, name: 'Pedro', username: 'pedrito', email: 'pedro@example.com' }
];
 
const resultadoProcesado = procesarUsuarios(usuariosDePrueba);
console.log(`Resultado procesado: ${resultadoProcesado}`); // Debería imprimir "Nombre: Juan, Username: juanito, Nombre: Maria, Username: mariita"
////////////////////////////////////////////////////////////////////////////

//EJERCICIO3
async function obtenerTitulosDePosts(): Promise<string[]> {

  try {
    const respuesta = await fetch("https://jsonplaceholder.typicode.com/posts");
    if (!respuesta.ok) {
      throw new Error(`Error HTTP: ${respuesta.status}`);
    }
    const datos = await respuesta.json();
    return datos.map((post: { title: string }) => post.title+ "\n");
  } catch (error) {
    console.error("Error en la petición:", error);
    throw error;
  }
}

 
// Ejemplo de uso:
obtenerTitulosDePosts()
  .then(titulos => {
    console.log(`Títulos de los posts: ${titulos}`);
  })
  .catch(error => {
    console.error(`Error al obtener los títulos: ${error}`);
  });
    
// Ejemplo con async/await (opcional, para practicar):
async function ejecutarObtenerTitulos() {
  try {
    const titulos = await obtenerTitulosDePosts();
    console.log(`Títulos de los posts (con async/await): ${titulos}`);
  } catch (error) {
    console.error(`Error al obtener los títulos (con async/await): ${error}`);
  }
}
 
ejecutarObtenerTitulos();
////////////////////////////////////////////////