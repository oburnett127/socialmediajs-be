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
    @inject(TYPES.FriendService) private friendService: FriendService,
    @inject(TYPES.UserinfoService) private userinfoService: UserinfoService
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

  @httpGet('/getbyuserid/:id', localPassport.authenticate('jwt', { session: false }))
  private async getFriendsByUserId(@request() req: express.Request, @response() res: express.Response): Promise<void> {
      const id: number = parseInt(req.params.id);
      if (!id) {
          res.sendStatus(400);
          return;
      }
      try {
          const friendUserIds = await this.friendService.getFriendUserIds(id);
          const friends = await Promise.all(
              friendUserIds.map(friendId => this.userinfoService.getUserByUserId(friendId.toString()))
          );
          const validFriends = friends.filter(friend => friend !== undefined && friend !== null);
          if (validFriends.length > 0) {
              res.status(200).json(validFriends);
          } else {
              res.sendStatus(404);
          }
      } catch (error) {
          console.error('Error fetching friends by user ID:', error);
          res.sendStatus(500);
      }
  }

  @httpGet('/getoutgoingrequests/:fromUserId', localPassport.authenticate('jwt', { session: false}))
  private async getOutgoingRequestsByUserId(@request() req: express.Request, @response() res: express.Response) : Promise<void> {
    const id: number = req.body;
    if (!id) {
      res.sendStatus(400);
    }
    try {
      const toUserIds = await this.friendService.getOutgoingRequestsByUserId(id);
      const toUsers = await Promise.all(
        toUserIds.map(userId => this.userinfoService.getUserByUserId(userId.toString()))
      );
      const validToUsers = toUsers.filter(toUser => toUser !== undefined && toUser !== null);
      if (validToUsers.length > 0) {
        res.status(200).json(validToUsers);
      } else {
        res.sendStatus(404);
      }
    } catch (error) {
      console.error('Error fetching outgoing friend requests', error);
      res.sendStatus(500);
    }
  }

  @httpGet('/getincomingrequests/:toUserId', localPassport.authenticate('jwt', { session: false}))
  private async getIncomingRequestsByUserId(@request() req: express.Request, @response() res: express.Response) : Promise<void> {
    const toUserId: number = req.body;
    if (!toUserId) {
      res.sendStatus(400);
    }
    try {
      const fromUserIds = await this.friendService.getIncomingRequestsByUserId(toUserId);
      const fromUsers = await Promise.all(
        fromUserIds.map(userId => this.userinfoService.getUserByUserId(userId.toString()))
      );
      const validFromUsers = fromUsers.filter(fromUser => fromUser !== undefined && fromUser !== null);
      if (validFromUsers.length > 0) {
        res.status(200).json(validFromUsers);
      } else {
        res.sendStatus(404);
      }
    } catch (error) {
      console.error('Error fetching friends by user ID:', error);
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
