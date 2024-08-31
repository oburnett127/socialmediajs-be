import { controller, httpDelete, httpGet, httpPost, interfaces, request, requestParam, response } from 'inversify-express-utils';
import { inject } from 'inversify';
import * as express from 'express';
import localPassport from '../../passportext.js';
import { PostService, PostPayload }  from '../service/post.js';
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

  @httpGet('/getonepost/:postId', localPassport.authenticate('jwt', { session: false}))
  private async getOnePost(@requestParam('postId') postId: number, @response() res: express.Response): Promise<void> {
    if (!postId) {
      res.sendStatus(400);
    }
    const response = await this.postService.getOnePost(postId);
    if (response) {
      res.status(200)
      res.send(response);
    } else {
      res.sendStatus(500);
    }
  }

  @httpGet('/getbyauthor/:authorUserId', localPassport.authenticate('jwt', { session: false}))
  private async getPostsByAuthorUserId(@requestParam('authorUserId') authorUserId: number, @response() res: express.Response) : Promise<void> {
    if (!authorUserId) {
      res.sendStatus(400);
    }
    const response = await this.postService.getPostsByAuthorUserId(authorUserId);
    if (response) {
      res.status(200)
      res.send(response);
    } else {
      res.sendStatus(500);
    }
  }

  @httpGet('/getpostsbyprofile/:authorUserId', localPassport.authenticate('jwt', { session: false}))
  private async getPostsByProfileUserId(@requestParam('profileUserId') profileUserId: number, @response() res: express.Response) : Promise<void> {
    if (!profileUserId) {
      res.sendStatus(400);
    }
    const response = await this.postService.getPostsByProfileUserId(profileUserId);
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
