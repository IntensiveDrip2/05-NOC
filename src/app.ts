import { PrismaPg } from "@prisma/adapter-pg";
import { envs } from "./config/plugins/envs.plugins";
import { LogModel, MongoDatabase } from "./data/mongo";
import { Server } from "./presentation/server";
import { PrismaClient } from "./generated/prisma/client";



(async() => {
    main();
})();


async function main() {

    await MongoDatabase.connect({
        mongoUrl: envs.MONGO_URL,
        dbName: envs.MONGO_DB_NAME,
    });

    // const adapter = new PrismaPg({ connectionString: envs.POSTGRES_URL });
    // const prisma = new PrismaClient({ adapter });
    // const newLog = await prisma.logModel.create({
    //     data: {
    //         level: 'HIGH',
    //         message: 'Test message',
    //         origin: 'App.ts'
    //     }
    // });

    // console.log({ newLog });
    // const logs = await prisma.logModel.findMany({
    //     where: {
    //         level: 'HIGH'
    //     }
    // });
    // console.log(logs);


    // Crear una colección = tables, documento = registro
    // const newLog = await LogModel.create({
    //     message: 'Test message desde Mongo',
    //     origin: 'App.ts',
    //     level: 'low'
    // });
    // await newLog.save();
    // console.log(newLog);
    // const logs = await LogModel.find();
    // console.log(logs);

    Server.start();
}

