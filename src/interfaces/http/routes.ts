import { config } from "@configs/configEnvs";
import { Application, Request, Response } from "express";
import { serverAdapter } from "@services/queues/base.queue";

// Router Parents: Rutas padres

export default (app:Application) => {
    const routes = () => {
        app.use('/healthcheck', (_req: Request, res:Response) => res.send('Server is Ok!'));    
        //app.use('/queues', serverAdapter.getRouter());
    };
    routes();
}