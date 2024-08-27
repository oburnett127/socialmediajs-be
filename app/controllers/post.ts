import { controller, httpDelete, httpGet, httpPost, interfaces, request, requestParam, response } from 'inversify-express-utils';
import { inject } from 'inversify';
import * as express from 'express';
import localPassport from '../../passportext.js';
import { PostPayload, PostService } from '../service/post.js';
import { TYPES } from '../service/types.js';

@controller('/post')
export class PostController implements interfaces.Controller {

  constructor(
    @inject(TYPES.PostService) private postService: PostService
  ) { }

  @httpPost('/create', localPassport.authenticate('jwt', { session: false}))
  private async createPost(@request() req: express.Request, @response() res: express.Response): Promise<void> {
    const post: PostPayload = req.body;
    if (!post) {
      res.sendStatus(400);
    }
    const postCreated = await this.postService.create(post);
    if (postCreated) {
      res.sendStatus(200);
    } else {
      res.sendStatus(500);
    }
  }

  @httpGet('/getbypost/:postId', localPassport.authenticate('jwt', { session: false}))
  private async getPostsByPostId(@request() req: express.Request, @response() res: express.Response) : Promise<void> {
    const response = await this.postService.getPostsByPostId();
    if (response) {
      res.status(200)
      res.send(response);
    } else {
      res.sendStatus(500);
    }
  }

  @httpDelete('/delete/:id', localPassport.authenticate('jwt', { session: false}))
  private async deletePost(@requestParam('id') id: number, @response() res: express.Response): Promise<void> {
    if (!id) {
      res.sendStatus(400);
    }

    const response = await this.postService.deletePost(id);
    if (response) {
      res.sendStatus(200);
    } else {
      res.sendStatus(400);
    }
  }

}