const nodemailer = require("nodemailer");

exports.send = async (body, name, subject) => {
    let transporter = nodemailer.createTransport({
        host: "mail.cock.li",
        port: 587,
        secure: false,
        greetingTimeout: 30000,
        connectionTimeout: 60000,
        auth: {
            user: "daviprogramador@cock.li",
            pass: "davi08121420",
        }
    });

    await transporter.sendMail({
        from: `${name} <daviprogramador@cock.li>`,
        to: 'greensystem2000@gmail.com',
        subject: `${subject}`,
        html: `${body}`
    })
}