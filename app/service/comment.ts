import { injectable } from 'inversify';
import { Comment } from '../models/comment.model.js';
import logger from '../config/logger.js';

export interface CommentPayload {
  postId: number;
  userId: number;
  text: string;
}

@injectable()
export class CommentService {

  public async create(comment: Comment): Promise<Comment | void> {
    return Comment.create(comment as any)
      .then((data: any) => data)
      .catch((err: { message: any; }) => { logger.error(err.message); throw err; });
  }

  public async findCommentsByPostId(postId: number): Promise<Comment[] | void> {
    return Comment.findAll({ where: { postId: postId } })
      .then((data: any) => data)
      .catch((err: any) => { logger.error(err.message); throw err; });
  }

  public async deleteComment(commentId: number): Promise<void | number> {
    return Comment.destroy({ where: { commentId: commentId } })
      .then((num: number) => num)
      .catch((err: any) => { logger.error(err.message); throw err });
  }

}
