const express = require('express')
const mongoose = require('mongoose')
const fs = require('fs')
const model = require('./model/products')
const mail = require('./mail')


const app = express()
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.set('views','./views/')
app.set('view engine', 'pug')
app.set('mail', './public/formMail.html')

app.post('/ingreso',(req,res) => {
    let product = req.body    
    const newProduct = new model.products(product)
    newProduct.save(err => {
        if(err) throw new Error(`Error while written product: ${err}`)
        console.log('New product was written.')

        model.products.find({}, (err, products) => {
            if(err) throw new Error(`Error while reading product: ${err}`)

            let prod = []
            products.forEach(product => {
                prod.push({...product._doc})              
            })
            if(prod.length % 10 === 0){
                mail.sending(prod, (err, info, mail) => {
                    console.log(err, info)
                    res.redirect('/')
                })
            }
            else res.redirect('/')
        })
    })
   
}) 


app.get('/listar', (req,res) => {
    model.products.find({},{_id:0,__v:0}, (err,products) => {
        if(err) throw new Error(`Error reading products: ${err}`)
        let prod = []
        products.forEach(product => {
            prod.push({...product._doc})
        })
        res.render('plantilla', { products: prod });
    })
});



app.get('/set-correo', (req, res) => {
    res.render(process.cwd() + '/public/formMail.html')
})
app.post('/set-correo',(req, res) => {
    let {mail} = req.body

    fs.writeFile('correo.dat', mail, err => {
        if(err) throw new Error(`Error writting email: ${err}`)
        res.redirect('/')
    })
   
});

app.get('*', (req,res) => {
    let {url, method} = req
    res.status(404).send(`<b>Route ${url}, method ${method} without definition.</b>`)
})

mongoose.connect('mongodb+srv://m001-student:m001-mongodb-basics@cluster0.bnpey.mongodb.net/tp4fizzmod?retryWrites=true&w=majority', {
     useNewUrlParser: true,
     useUnifiedTopology: true
}, err => {
    if(err) throw new Error(`Connection error in the database: ${err}`)
    console.log('Connected database!!!')

  const PORT = process.env.PORT || 8090  
  app.set('Puerto'. PORT)

const server = app.listen(app.get('Puerto'), () => {
    console.log(`Server listening port: ${server.address().port}`)
})
server.on('error', error => console.log(`Server error: ${error}`))

})
