import { controller, httpDelete, httpGet, httpPost, interfaces, request, requestParam, response } from 'inversify-express-utils';
import { inject } from 'inversify';
import * as express from 'express';
import localPassport from '../../passportext.js';
import { CommentPayload, CommentService } from '../service/comment.js';
import { TYPES } from '../service/types.js';

@controller('/comment')
export class CommentController implements interfaces.Controller {

  constructor(
    @inject(TYPES.CommentService) private commentService: CommentService
  ) { }

  @httpPost('/create', localPassport.authenticate('jwt', { session: false}))
  private async createComment(@request() req: express.Request, @response() res: express.Response): Promise<void> {
    const comment: CommentPayload = req.body;
    if (!comment) {
      res.sendStatus(400);
    }
    const createComment = await this.commentService.create(comment);
    if (createComment) {
      res.sendStatus(200);
    } else {
      res.sendStatus(500);
    }
  }

  @httpGet('/getbypost/:postId', localPassport.authenticate('jwt', { session: false}))
  private async getCommentsByPostId(@requestParam('id') id: number, @response() res: express.Response) : Promise<void> {
    if (!id) {
      res.sendStatus(400);
    }
    const response = await this.commentService.getCommentsByPostId(id);
    if (response) {
      res.status(200)
      res.send(response);
    } else {
      res.sendStatus(500);
    }
  }

  @httpDelete('/delete/:id', localPassport.authenticate('jwt', { session: false}))
  private async deleteComment(@requestParam('id') id: number, @response() res: express.Response): Promise<void> {
    if (!id) {
      res.sendStatus(400);
    }
    const response = await this.commentService.deleteComment(id);
    if (response) {
      res.sendStatus(200);
    } else {
      res.sendStatus(400);
    }
  }

}