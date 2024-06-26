import express, { Request, Response, Application } from 'express';
import ip from 'ip';
import cors from 'cors';
import patientRoutes from './routes/user.routes';
import { HttpResponse } from './domain/response';
import { Code } from './enum/code.enum';
import { Status } from './enum/status.enum';
import ipRoutes from './routes/address.rotues';
import { getRankAddress, getRankAll } from './controller/user.controller';

export class App {
  private readonly app: Application;
  private readonly APPLICATION_RUNNING = 'application is running on:';
  private readonly ROUTE_NOT_FOUND = 'Route does not exist on the server';

  constructor(private readonly port: (string | number) = process.env.SERVER_PORT || 3000) {
    this.app = express();
    this.app.set('trust proxy', 1);
    this.middleWare();
    this.routes();
  }

  listen(): void {
    this.app.listen(this.port);
    console.info(`${this.APPLICATION_RUNNING} ${ip.address()}:${this.port}`);
  }

  private middleWare(): void {
    this.app.use(cors({ origin: '*' }));
    this.app.use(express.json());
  }

  private routes(): void {
    this.app.use('/api/v1/user', patientRoutes);
    this.app.use('/api/v1/address', ipRoutes);
    this.app.use('/api/v1/get-rank-all', getRankAll)
    this.app.use('/api/v1/rank-address', getRankAddress)
    this.app.get('/', (_: Request, res: Response)=> res.status(Code.OK).send(new HttpResponse(Code.OK, Status.OK, 'Welcome to the NamiGame API v1.0.0')));
    this.app.all('*', (_: Request, res: Response)=> res.status(Code.NOT_FOUND).send(new HttpResponse(Code.NOT_FOUND, Status.NOT_FOUND, this.ROUTE_NOT_FOUND)));
  }
}
