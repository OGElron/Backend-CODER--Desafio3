const fs = require ('fs');

const express = require('express');
const app = express();

class Contenedor {
    
    constructor (archivo){
       this.archivo = archivo
    }
    async save(object) {
        try {
            
            const atexto =  JSON.stringify(object, null, 2);
            await fs.promises.writeFile(this.archivo, atexto, (error)=> {
                if (error) {
                    throw new Error ('Error en la escritura');
                }
                console.log('escritura exitosa')}
        )
        } catch (error) {
            
        }
    }

    async verProd() {
        try {
            const mostrarProds = await fs.promises.readFile(this.archivo, 'utf-8');
            const mostrarProds2 = JSON.parse(mostrarProds);
            return mostrarProds2;
        } catch (error) {
            console.error('Bruno es horrible')
        }
    }
    
};

async function arrayFull() {
    let objetos = [ {  title:'gatito', 
                    id: 12, 
                    price: 0.25, 
                    thumbnail: 'www.imgur.com/jsqnhpiuh19'},
                    {  title:'perrito', 
                    id: 11, 
                    price: 0.30, 
                    thumbnail: 'www.imgur.com/jsqnhpiuh16'},
                    {  title:'conejito', 
                    id: 10, 
                    price: 0.80, 
                    thumbnail: 'www.imgur.com/jsqnhpiuh16'}
                ]

    const nuevoContenedor = new Contenedor ('./productos.txt');
    await nuevoContenedor.save(objetos)
    const loquesea = await nuevoContenedor.verProd();
    return loquesea;

}

arrayFull();

async function rutas () {

    const elquesetecante = await arrayFull(); 
    
    const aleatorio = () => {
        let random = elquesetecante [Math.floor(Math.random() * elquesetecante.length)];
        return random
    }
    
    app.get('/', (req, res) => {
        res.send('<h1 style="color:red;">Desafio Express! acceda a /productos y /productoRandom</h1>')
    });

    app.get('/productos', (req, res) => {
        
        res.send(`${JSON.stringify(elquesetecante, null, 2)}`)
    })

    
    app.get('/productoRandom', (req, res) => {
        
        res.send(`${JSON.stringify(aleatorio())}`)
    })
}

rutas ();

const server = app.listen(8080, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})

server.on('error', error => console.log(`Error en servidor ${error}`));

// console.log(await nuevoContenedor.verProd());