import nodemailer, { Attachment } from "nodemailer";
import { envs } from "../../config/plugins/envs.plugins";
import { LogRepository } from "../../domain/repository/log.repository";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";


interface SendMailOptions {
    to: string | string[];
    subject: string;
    htmlBody: string;
    attachements?: Attachment[];
}

interface Attachement {
    filename: string;
    path: string;
}

export class EmailService {

    private transporter = nodemailer.createTransport({
        service: envs.MAILER_SERVICE,
        auth: {
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_SECRET_KEY,
        }
    });


    constructor() {}


    async senEmail(options: SendMailOptions): Promise<boolean> {

        const { to, subject, htmlBody, attachements = [] } = options;

        try {

            const sentInformation = await this.transporter.sendMail({
                to: to,
                subject: subject,
                html: htmlBody,
                attachments: attachements,
            });

            // console.log(sentInformation);
            
            return true;
        } catch (error) {
            return false;
        }

    }


    async sendEmailWithFileSystemLogs( to: string | string[] ) {
        const subject = 'logs del servidro';
        const htmlBody = `
            <h3>Logs de sistema - NOC</h3>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since 1966, when designers at Letraset and James Mosley, the librarian at St Bride Printing Library in London, took a 1914 Cicero translation and scrambled it to make dummy text for Letraset's Body Type sheets.</p>
            <p>Ver logs adjuntos</p>
            `;

        const attachements:Attachement[] = [
            { filename: 'logs-all.log', path: './logs/logs-all.log' },
            { filename: 'logs-high.log', path: './logs/logs-high.log' },
            { filename: 'logs-medium.log', path: './logs/logs-medium.log' },
        ];

        return this.senEmail({
            to, subject, attachements, htmlBody
        });
    }



}

