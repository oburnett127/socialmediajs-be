import { inject, injectable } from 'inversify';
import { Post } from '../models/post.model.js';
import logger from '../config/logger.js';
import { rabbitTemplate } from '../config/rabbittemplate.js';
import { Transaction } from 'sequelize';
import { UserinfoService } from './userinfo.js';
import { FriendService } from './friend.js';

export interface PostPayload {
    postId: number;
    authorUserId: number;
    profileUserId: number;
    text: string;
}

@injectable()
export class PostService {

    constructor(
        @inject(UserinfoService) private userinfoService: UserinfoService,
        @inject(FriendService) private friendService: FriendService
    ) {}

    public async getOnePost(id: number): Promise<Post | null> {
        try {
            const post: Post | null = await Post.findOne({
                where: { postId: id }
            });
            return post;
        } catch (err: any) {
            logger.error(err.message);
            throw err;
        }
    }

    public async getPostsByAuthorUserId(id: number): Promise<Post[] | null> {
        try {
            const posts: Post[] | null = await Post.findAll({
                where: { authorUserId: id }
            });
            return posts;
        } catch (err: any) {
            logger.error(err.message);
            throw err;
        }
    }

    public async getPostsByProfileUserId(id: number): Promise<Post[] | null> {
        try {
            const posts: Post[] | null = await Post.findAll({
                where: { profileUserId: id }
            });
            return posts;
        } catch (err: any) {
            logger.error(err.message);
            throw err;
        }
    }

    public async createPost(post: Post, transaction?: Transaction): Promise<Boolean> {
        try {
            // Begin transaction if one isn't provided
            const transactionInstance = transaction || await Post.sequelize!.transaction();

            // Save the post
            await Post.create(post.dataValues.text, { transaction: transactionInstance });

            // Fetch the user information
            const user = await this.userinfoService.getUserByUserId(post.dataValues.authorUserId);
            if (!user) {
                throw new Error(`User with id ${post.dataValues.authorUserId} not found`);
            }

            const message = `${user.dataValues.firstName} ${user.dataValues.lastName} made a new post`;

            // Get the friend user IDs
            const friendUserIds = await this.friendService.getFriendUserIds(post.dataValues.authorUserId);

            // Send the message to RabbitMQ for each friend
            for (const userId of friendUserIds) {
                const queueName = `user_queue_${userId}`;
                console.log(`Queue name is: ${queueName}`);
                rabbitTemplate.convertAndSend('post_exchange', queueName, message);
            }

            // Commit the transaction if it was created inside this method
            if (!transaction) {
                await transactionInstance.commit();
            }

            return true;
        } catch (error) {
            if (transaction) {
                await transaction.rollback();
            }
            console.error('Error in createPost:', error);
            throw error;
        }
    }

    public async deletePost(id: number): Promise<void | number> {
        try{
            await Post.destroy({ where: { postId: id } })
        } catch(err: any) { 
            logger.error(err.message); 
            throw err;
        }      
    }

}
