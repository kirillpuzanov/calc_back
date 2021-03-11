import nodeMailer from 'nodemailer';
import dotenv from 'dotenv';
import {DEV_VERSION} from '../config';


DEV_VERSION && dotenv.config()

const transporter = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
        type: 'login',
        user: process.env.GMAIL_USER || '',
        pass: process.env.GMAIL_PASS || '',
    }
});

export const sendMail = async (from: string, to: string, subject: string, html: string) => {

    return await transporter.sendMail({
        from,
        to,
        subject,
        html,
    });
};