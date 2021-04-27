const express = require('express')
const mongoose = require('mongoose')
const mail = require('./mail')
const app = express()
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.set('views','./views/')
app.set('view engine', 'pug')
app.set('mail', './public/formMail.html')

app.post('/ingreso',(req,res) => {
    let{url,method} = req
    let newPrduct = req.body
    console.log(newPrduct)
    res.json({url,method, newPrduct})
   
}) 

let visit = 0
app.get('/listar', (req,res) => {
  
       res.render('plantilla', {visit})
  
})
app.get('/set-correo', (req, res) => {
    res.render('mail')
})
app.post('/set-correo',(req, res) => {
    let newMail = []
    let {url,method} = req
    console.log(newMail)
    res.json({url,method,newMail})
})

app.get('*', (req,res) => {
    let {url, method} = req
    res.status(404).send(`<b>Ruta ${url} en método ${method} sin definir.</b>`)
})

mongoose.connect('mongodb://localhost/pt4fizzmod', {
     useNewUrlParser: true,
    useUnifiedTopology: true
}, err => {
    if(err) throw new Error(`Error de conexión en la base de datos: ${err}`)
    console.log('¡¡¡Base de datos conectada!!!')

    const PORT = process.env.PORT || 8090
app.set('Puerto'. PORT)

const server = app.listen(app.get('Puerto'), () => {
    console.log(`Servidor escuchando puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en servidor ${error}`))

})
