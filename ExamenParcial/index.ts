
import express from 'express'
import cors from 'cors'
import axios from 'axios'



const app = express ();
const port = 3000;

app.use(cors());
app.use(express.json())



type LD = {

 id: number
 filmName: string
 rotationType: "CAV"|"CLV",
 region: string
 lengthMinutes:number,
 videoFormat: "NTSC"|"PAL",
 }


let discos: LD[] = [

    { id: 1, filmName: "pepito grillo", rotationType: "CAV", region: "EEUU", lengthMinutes: 154, videoFormat: "PAL" },

    { id: 2, filmName: "Pocahontas", rotationType: "CLV", region: "EU", lengthMinutes: 120, videoFormat: "NTSC" },

    { id: 3, filmName: "Mufasa", rotationType: "CLV", region: "AFRICA", lengthMinutes: 125, videoFormat: "PAL" },


];


app.get("/ld", (req, res) => {
  res.json(discos);
});


app.get("/ld/:id", (req, res)=>{
    const {id} = req.params;
    const disco = discos.find((d) => d.id === Number(id));
    
  return disco? res.json(disco): res.status(404).json({ error: "Disco no encontrado" });
});

app.post("/ld", (req, res)=>{
   
    const newUser:LD ={
        id: Date.now().toString(),
        ...req.body
    };
    discos.push(newUser);
    res.status(201).json(newUser);
});


app.delete("/ld/:id",(req, res)=>{
    try {
    const { id } = req.params;
    const exists = discos.some((d) => d.id === Number(id));

    if (!exists)
      return res.status(404).json({ error: "disco no encontrado" });

    discos = discos.filter((d) => d.id !== Number(id));

    res.json({ message: "disco eliminado correctamente" });
  } catch (err: any) {
    res
      .status(500)
      .json({ error: "Error al eliminar el disco", detail: err.message });
  }

});
app.listen(port, () => {
  console.log(`Servidor en http://localhost:${3000}`);
});


const testApi= async (id:number)=>{
 const mostrardiscos= await axios.get("http://localhost:3000/ld")
 

 const mostratporID = await axios.get("http://localhost:3000/ld/"+id)
 

 const crearDisco = await axios.post("http://localhost:3000/ld",

    {      
        filmName : "Canario loco", rotationType : "CAV", region : "casa", lengthMinutes : 34, videoFormat : "PAL" 
    });
 
    const mostrarTrasCrear = await axios.get ("http://localhost:3000/ld")
 

 const eliminar = await axios.delete ("http://localhost:3000/ld/"+id)

    const mostrarTrasEliminar= await axios.get ("http://localhost:3000/ld")


 return {
    todos: mostrardiscos.data,
    uno: mostratporID.data,
    crear: crearDisco.data,
    creado: mostrarTrasCrear.data,
    eliminar: eliminar.data,
    eliminado: mostrarTrasEliminar.data,
 }
 

}
setTimeout(async() => {
    const resultado = await testApi(1);
    console.log(resultado);


}, 1000);