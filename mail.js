const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'arstesttechnica@gmail.com',
        pass: 'MailPruebas'
    }
})

const mailOptions = {
    from: 'arstesttechnica@gmail.com',
    to: 'gabriela.n.stocco@gmail.com',
    subject: '10 nuevos registros guardados',
    html: '<h1 style="color:green;">Nuevo listado de productos <span style="color:purple;">tabla de contenido</span></h1>',
    attachments: []
    
}

transporter.sendMail(mailOptions, (err, info) => {
    if(err) {
        console.log(err)
        return err
    }
    console.log(info)
})

module.exports={transporter};