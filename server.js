const fs = require ('fs');
const express = require('express');
const app = express();

class Contenedor {
    constructor (archivo){
       this.archivo = archivo
    }
    
    async verProd() {
        try {
            const mostrarProds = await fs.promises.readFile(this.archivo, 'utf-8')
            const mostrarProds2 = JSON.parse(mostrarProds);
            return mostrarProds2;
        } catch (error) {
            console.error('error')
        }
    }
};
async function arrayFull() {
    const nuevoContenedor = new Contenedor ('./productos.txt');

    console.log(await nuevoContenedor.verProd())
}
arrayFull();

app.get('/productos', (req, res) => {
    let items = [verProd()];
    res.send(items)
})

app.get('/productoRandom', (req, res) => {
    items.find(item => item.id===id)
    res.send(item)
})


const server = app.listen(8080, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})

server.on('error', error => console.log(`Error en servidor ${error}`));
