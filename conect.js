const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
    database: process.env.DATABASE,
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD
})

const obtener_datos = async () => {
    const [datos] = await pool.query("SELECT * FROM usuarios;")
    if (datos && datos.length > 0) {
        return true
    }else{
        return false
    }
}
const insertarJson = async (dato) => {  
    await pool.execute("INSERT INTO usuarios (nombre) VALUES (?)", [dato])
}

const insertardato = async (nombre) => {  
    await pool.execute("INSERT INTO usuarios (nombre) VALUES (?)", [nombre])
    return true
}

const actualizarDato = async (datos) => {
    await pool.execute("UPDATE usuarios SET nombre = ? WHERE id = ?", [datos.nombre, datos.id])
    return true
}
const borrarDato = async (id) => {
    try{
        await pool.execute("DELETE FROM usuarios WHERE id = ?", [id])
        return true
    }catch (e){
        console.error("Error al borrar")
        return false
    }
}

module.exports = {
    obtener_datos,
    insertarJson,
    insertardato,
    actualizarDato,
    borrarDato
}