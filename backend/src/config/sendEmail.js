import nodemailer from 'nodemailer'

const sendEmail = async (email, subject, html)=>{
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail', // you can use any SMTP service like Gmail, Outlook
            auth:{
                user: "dormeaseofficial@gmail.com",
                pass: `${process.env.APP_PASSWORD}`
            },
        })

        const mailOptions = {
            from: 'dormeaseofficial@gmail.com',
            to: email,
            subject: subject,
            html: html
        }
        await transporter.sendMail(mailOptions);
        console.log('Mail sent successfully');
    } catch (error) {
        console.log('Error sending mail:', error);
    }
}

export default sendEmail;