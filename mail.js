const nodemailer = require('nodemailer')
const fs = require('fs')
const pug = require('pug')

if(!fs.existsSync('correo.dat')){
    fs.writeFileSync('correo.dat', 'gabriela.n.stocco@gmail.com')
    console.log('correo.dat email init')
}

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'arstesttechnica@gmail.com',
        pass: 'MailPruebas'
    }
})
function sending(products, cb){
  console.log(products)

  fs.readFile('correo.dat', 'utf-8', (err, mail) => {
      if(err) throw new Error(`Error reading email: ${err}`)

      fs.readFile('views/plantilla.pug','utf-8', (err,source) => {
       if(err) throw new Error(`Template reading error:  ${err}`)
        source = '<style>table,th,td,th {border: 1px solid black; border-collapse:collapse;} th: {background: black; }</style>' + source
           // var template = pug.compile(source);
       
        const mailOptions = {
            from: 'arstesttechnica@gmail.com',
            to: mail,
            subject: '10 new records saved',
            html: source({products})
            // `<h1 style="color:green;">New product list <span style="color:purple;">${source} ${products}</span></h1>`
        }
        transporter.sendMail(mailOptions, (err, info) => {
            if(err) {
                console.log(err)
                cb (err, null)
            }
            console.log(info)
            cb(null,info)
        });
      })
  })
}




module.exports={sending};