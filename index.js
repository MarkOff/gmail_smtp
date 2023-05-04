const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express();
const port = process.env.PORT || 3010;

app.use(cors( {
    origin: ['https://markoff.github.io/my-portfolio'],
    credentials: true
}))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// 'vladvald47@gmail.com'
// 'qlwrgjlhmmopmafu'
//"headers": [
//     {
//       "source": "/api/(.*)",
//       "headers": [
//         { "key": "Access-Control-Allow-Credentials", "value": "true" },
//         { "key": "Access-Control-Allow-Origin", "value": "*" },
//         { "key": "Access-Control-Allow-Methods", "value": "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
//         { "key": "Access-Control-Allow-Headers", "value": "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" }
//       ]
//     }
//   ],
let smtpLogin = process.env.SMTP_LOGIN || '...' ;
let smtpPassword = process.env.SMTP_PASSWORD || '...' ;

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: smtpLogin,
        pass: smtpPassword
    }
});

app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.post('/sendMessage', async (req, res) => {

    let {message, name, email} = req.body

    await transporter.sendMail({
        from: 'HR Wants Me', // sender address
        to: 'sam.samlinson@gmail.com', // list of receivers
        subject: 'HR Wants Me', // Subject line
        html: `<b>Сообщение с моего портофлио</b>: 
                <div>name: ${name}</div>
                <div>email: ${email}</div>
                <div>message: ${message}</div>`
    });

    res.send('ok')
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});