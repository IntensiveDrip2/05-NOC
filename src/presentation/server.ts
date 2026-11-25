import { isArrayBufferView } from "util/types";
import { envs } from "../config/plugins/envs.plugins";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { LogReporsitoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email.service";
import { SenEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { MongoLogDatasource } from "../infrastructure/datasources/mongo-log.datasource";
import { PostgresLogDatasource } from "../infrastructure/datasources/postgres-log.datasource";

// Aqui es donde los Datasource seran cambiados si es necesario 
const logRepository = new LogReporsitoryImpl(
    // new FileSystemDatasource(),
    // new MongoLogDatasource(),
    new PostgresLogDatasource(),
);

const emailService = new EmailService();


export class Server {

    public static async start() {

        console.log('Server started...');

        // Mandar email
        // new SenEmailLogs(
        //     emailService,
        //     fileSystemlogRepository
        // ).execute(['mauriciolopezservin15@gmail.com','mauriciolopezservin08@gmail.com']);
        // emailService.sendEmailWithFileSystemLogs(
        //     ['mauriciolopezservin15@gmail.com','mauriciolopezservin08@gmail.com']
        // );

         

        CronService.createJob(
            '*/5 * * * * *',
            () => {
                const url = 'https://google.com';
                new CheckService(
                    logRepository,
                    () => console.log( `${ url } is ok` ),
                    ( error ) => console.log( error ),
                ).execute( url );

            }
        );
        

    }

}