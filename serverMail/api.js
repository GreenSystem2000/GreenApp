const express = require('express')
const bodyParser = require('body-parser')
const sendEmail = require('./sendEmail')

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


app.post('/api', async function (req, res) {
    try {
        let { body, name, subject } = req.body

        sendEmail.send(body, name, subject)
        res.status(200).send({ success: "Email enviado com sucesso!" })
    } catch (error) {
        res.status(500).send(error)
    }
})

app.listen(3000, _ => console.log('Example app listening on port 3000!'));
