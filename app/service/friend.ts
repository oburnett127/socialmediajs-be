import { injectable } from 'inversify';
import { Friend, FriendStatus } from '../models/friend.model.js';
import logger from '../config/logger.js';
import { EnumDataType } from 'sequelize';
import { EnumType } from 'typescript';

export interface FriendRequestPayload {
    fromUserId: number;
    toUserId: number;
}

export interface FriendPayload {
    id: number;
    fromUserId: number;
    toUserId: number;
    status: string;
}

@injectable()
export class FriendService {

    public async requestFriend(friend: FriendPayload): Promise<Friend | void> {
    return Friend.create(friend as any)
        .then((data: any) => data)
        .catch((err: { message: any; }) => { logger.error(err.message); throw err; });
    }

    public async getFriendsByPostId(postId: number): Promise<Friend[] | void> {
    return Friend.findAll({ where: { postId: postId } })
        .then((data: any) => data)
        .catch((err: any) => { logger.error(err.message); throw err; });
    }

    public async deleteFriend(friendId: number): Promise<void | number> {
    return Friend.destroy({ where: { friendId: friendId } })
        .then((num: number) => num)
        .catch((err: any) => { logger.error(err.message); throw err });
    }

    public async getFriendStatus(profileUserId: number, loggedInUserId: number): Promise<boolean> {
    try {
        const friend1 = await Friend.findOne({
            where: {
                fromUserId: loggedInUserId,
                toUserId: profileUserId
            }
        });

        const friend2 = await Friend.findOne({
            where: {
                fromUserId: profileUserId,
                toUserId: loggedInUserId
            }
        });

        return !!friend1 || !!friend2;
    } catch (err: any) {
        logger.error(err.message);
        throw err;
    }
    }

    public async getFriendUserIds(userId: number): Promise<number[]> {
        const friendUserIds = new Set<number>();

        try {
            const friendRecsFrom = await Friend.findAll({
                where: {
                    fromUserId: userId,
                    status: 'FRIEND'
                }
            });

            friendRecsFrom.forEach(friend => friendUserIds.add(friend.dataValues.toUserId));

            const friendRecsTo = await Friend.findAll({
                where: {
                    toUserId: userId,
                    status: 'FRIEND'
                }
            });

            friendRecsTo.forEach(friend => friendUserIds.add(friend.dataValues.fromUserId));
            friendUserIds.delete(userId);
            return Array.from(friendUserIds);
        } catch (err: any) {
            console.error(err.message);
            throw err;
        }
    }

    public async getOutgoingRequestsByUserId(fromUserId: number): Promise<number[]> {
        try {
            const friendRecs = await Friend.findAll({
                where: {
                    fromUserId: fromUserId,
                    status: FriendStatus.PENDING
                }
            });

            return friendRecs.map(friend => friend.dataValues.toUserId);
        } catch (error) {
            console.error('Error fetching outgoing requests:', error);
            throw error;
        }
    } 
    
    public async getIncomingRequestsByUserId(toUserId: number): Promise<number[]> {
        try {
            const friendRecs = await Friend.findAll({
                where: {
                    fromUserId: toUserId,
                    status: FriendStatus.PENDING
                }
            });

            return friendRecs.map(friend => friend.dataValues.fromUserId);
        } catch (error) {
            console.error('Error fetching incoming requests:', error);
            throw error;
        }
    }

    public async acceptFriend(friendRequest: FriendRequestPayload) {
        const fromUserId = friendRequest.fromUserId;
        const toUserId = friendRequest.toUserId;
        const friendRec = await Friend.findOne({
            where: {
                fromUserId: fromUserId,
                toUserId: toUserId
            }
        });
        if(!!friendRec) {
            friendRec.dataValues.status = FriendStatus.ACCEPTED;
            this.requestFriend(friendRec);
        }
    }

}
