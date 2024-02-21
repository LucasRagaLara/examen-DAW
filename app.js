const express = require('express');
require('dotenv').config()
const app = express()
const {obtener_datos, insertarJson, borrarDato, insertardato, actualizarDato} = require('./conect.js')
const port = process.env.PORT | 5000

app.use(express.json())
app.use(express.urlencoded({ extended: false}))

app.get('/', async (req, res) => {
    const datos = await obtener_datos()
    if (datos){
        res.send(datos)
    }else{
        res.status(409).send("No.")
    }
})

app.post('/init', async (req, res) => {
    const datos = require('./data/datos.json')
    for (let dato of datos){
        await insertarJson(dato)
    }
    res.send("Datos del json introducidos.")
})


app.delete('/delete', async (req,res) => {
    const {id} = req.body
    const comprobar = await borrarDato(id)
    if (comprobar){
        res.send("Dato borrado !")
    }else{
        res.status(302).send("No se ha encontrado")
    }
})

app.post('/anadir', async (req, res) => {
    const {nombre} = req.body
    console.log(nombre)
    const comprobar = await insertardato(nombre)
    if (comprobar){
        res.send("Dato añadido!")
    }else {
        res.status(404).send("No se encontró")
    }
})

app.put('/actualizar', async (req, res) => {
    const {datos} = req.body
    const comprobar = await actualizarDato(datos)
    if (comprobar){
        res.send("Datos actualizados!")
    }else {
        res.status(404).send("No se ha podido actualizar")
    }

})

const servidor = () => {
    app.listen(port, () => console.log("Escuchando en el puerto 5000"))
}

servidor()