import nodemailer from 'nodemailer';

async function sendEmail({to=[], subject, html, attachments=[]}={}) {
    let transporter = nodemailer.createTransport({
        service:'gmail',
        auth:{
                user: process.env.EMAIL, 
                pass: process.env.EMAIL_PASSWORD
            },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: ` "basel company 👻" <${process.env.EMAIL}>`, // sender address
        to, // list of receivers
        subject, // Subject line
        // text: "Hello world?", // plain text body
        html, // html body
    });
    // console.log(info);
    if(info.rejected.length){
        return false;
    }else{
        return true;
    }
}


export default sendEmail