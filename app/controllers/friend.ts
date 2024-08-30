import { controller, httpDelete, httpGet, httpPost, interfaces, request, requestParam, response } from 'inversify-express-utils';
import { inject } from 'inversify';
import * as express from 'express';
import localPassport from '../../passportext.js';
import { FriendPayload, FriendRequestPayload, FriendStatusRequestPayload, FriendDeletePayload, FriendService } from '../service/friend.js';
import { UserinfoService } from 'app/service/userinfo.js';
import { TYPES } from '../service/types.js';

@controller('/friend')
export class FriendController implements interfaces.Controller {

  constructor(
    @inject(TYPES.FriendService) private friendService: FriendService
  ) { }

  @httpPost('/request', localPassport.authenticate('jwt', { session: false}))
  private async requestFriend(@request() req: express.Request, @response() res: express.Response): Promise<void> {
    const friend: FriendPayload = req.body;
    if (!friend) {
      res.sendStatus(400);
    }
    const createFriend = await this.friendService.requestFriend(friend);
    if (createFriend) {
      res.sendStatus(200);
    } else {
      res.sendStatus(500);
    }
  }

  @httpPost('/accept', localPassport.authenticate('jwt', { session: false}))
  private async acceptFriend(@request() req: express.Request, @response() res: express.Response): Promise<void> {
    try {
      const friendRequest: FriendRequestPayload = req.body;
      if (!friendRequest) {
        res.sendStatus(400);
      }
      await this.friendService.acceptFriend(friendRequest);
      res.sendStatus(200);
    } catch(err: any) {
      res.sendStatus(500);
    }
  }

  @httpGet('/getfriendstatus', localPassport.authenticate('jwt', { session: false}))
  private async getFriendStatus(@request() req: express.Request, @response() res: express.Response) : Promise<void> {
    const friendStatusRequest: FriendStatusRequestPayload = req.body;
    if (!friendStatusRequest) {
      res.sendStatus(400);
    }
    const response = await this.friendService.getFriendStatus(friendStatusRequest.loggedInUserId, friendStatusRequest.otherUserId);
    if (response) {
      res.status(200)
      res.send(response);
    } else {
      res.sendStatus(500);
    }
  }

  @httpGet('/getbyuserid/:id', localPassport.authenticate('jwt', { session: false}))
  private async getFriendsByUserId(@request() req: express.Request, @response() res: express.Response) : Promise<void> {
    const id: number = req.body;
    if (!id) {
      res.sendStatus(400);
    }
    const friendUserIds = await this.friendService.getFriendUserIds(id);
    const response = UserinfoService.getUsers(friendUserIds);
    if (response) {
      res.status(200)
      res.send(response);
    } else {
      res.sendStatus(500);
    }
  }

  @httpGet('/getoutgoingrequests/:fromUserId', localPassport.authenticate('jwt', { session: false}))
  private async getOutgoingRequestsByUserId(@request() req: express.Request, @response() res: express.Response) : Promise<void> {
    const id: number = req.body;
    if (!id) {
      res.sendStatus(400);
    }
    const toUserIds = await this.friendService.getOutgoingRequestsByUserId(id);
    const response = UserinfoService.getUsers(toUserIds);
    if (response) {
      res.status(200)
      res.send(response);
    } else {
      res.sendStatus(500);
    }
  }

  @httpGet('/getincomingrequests/:toUserId', localPassport.authenticate('jwt', { session: false}))
  private async getIncomingRequestsByUserId(@request() req: express.Request, @response() res: express.Response) : Promise<void> {
    const toUserId: number = req.body;
    if (!toUserId) {
      res.sendStatus(400);
    }
    const fromUserIds = await this.friendService.getIncomingRequestsByUserId(toUserId);
    const response = UserinfoService.getUsers(fromUserIds);
    if (response) {
      res.status(200)
      res.send(response);
    } else {
      res.sendStatus(500);
    }
  }

  @httpDelete('/delete', localPassport.authenticate('jwt', { session: false}))
  private async deleteFriend(@request() req: express.Request, @response() res: express.Response): Promise<void> {
    const friendDeleteRequest: FriendDeletePayload = req.body;
    if (!friendDeleteRequest) {
      res.sendStatus(400);
    }
    const response = await this.friendService.deleteFriend(friendDeleteRequest);
    if (response) {
      res.sendStatus(200);
    } else {
      res.sendStatus(500);
    }
  }

}
