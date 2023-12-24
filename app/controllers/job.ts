import { controller, httpDelete, httpGet, httpPost, httpPut, interfaces, request, requestParam, response } from 'inversify-express-utils';
import { inject } from 'inversify';
import * as express from 'express';
import localPassport from '../../passportext.js';
import { JobPayload, JobService } from '../service/job.js';
import { TYPES } from '../service/types.js';
import logger from '../config/logger.js';

@controller('/job')
export class JobController implements interfaces.Controller {

  constructor(
    @inject(TYPES.JobService) private jobService: JobService
  ) { }

  @httpPost('/create', localPassport.authenticate('jwt', { session: false}))
  private async createJob(@request() req: express.Request, @response() res: express.Response): Promise<void> {
    const job: JobPayload = req.body;

    if (!job) {
      res.sendStatus(400);
    }

    const createJob = await this.jobService.create(job);
    if (createJob) {
      res.sendStatus(200);
    } else {
      res.sendStatus(500);
    }
  }

  @httpGet('/findAll')
  private async findAll(@request() req: express.Request, @response() res: express.Response) : Promise<void> {
    logger.info("abc123");
    console.log("abc123");

    const response = await this.jobService.findAll();
    if (response) {
      res.status(200)
      res.send(response);
    } else {
      res.sendStatus(500);
    }
  }

  @httpGet('/findOne/:id')
  private async findOne(@requestParam('id') id: string, @response() res: express.Response): Promise<void> {
    if (!id) {
      res.sendStatus(400);
    }

    const response = await this.jobService.findOne(id);
    if (response) {
      res.status(200);
      res.send(response);
    } else {
      res.sendStatus(400);
    }
  }

  @httpPut('/update/:id', localPassport.authenticate('jwt', { session: false}))
  private async update(@requestParam('id') id: string, @request() req: express.Request, @response() res: express.Response): Promise<void> {
    const job: JobPayload = req.body; 
    if (!job || !id) {
      res.sendStatus(400);
    }

    const response = await this.jobService.update(job, id);
    if (response) {
      res.sendStatus(200);
    } else {
      res.sendStatus(400);
    }
  }

  @httpDelete('/deleteJob/:id', localPassport.authenticate('jwt', { session: false}))
  private async deleteJob(@requestParam('id') id: string, @response() res: express.Response): Promise<void> {
    if (!id) {
      res.sendStatus(400);
    }

    const response = await this.jobService.deleteJob(id);
    if (response) {
      res.sendStatus(200);
    } else {
      res.sendStatus(400);
    }
  }

  @httpDelete('/deleteAll', localPassport.authenticate('jwt', { session: false}))
  private async deleteAll(@request() req: express.Request, @response() res: express.Response): Promise<void> {
    const response = await this.jobService.deleteAll();
    if (response) {
      res.sendStatus(200);
    } else {
      res.sendStatus(400);
    }
  }

}
