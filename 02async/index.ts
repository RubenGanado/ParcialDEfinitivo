import axios from "axios"



const ejercicio = async (ids: number[]) => {

    const personaje = ids.map(async (elem)=>{
        const arrayDePromesas1=(
            await axios.get(`https://rickandmortyapi.com/api/character/${elem}`)
        ).data.name;

        return arrayDePromesas1;

    });

    const respuesta = await Promise.all(personaje);
    console.log(respuesta);
};

ejercicio([4, 5, 6])