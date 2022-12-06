import { postsCollection } from '../../database/collections';
import { PostsInputRepositoryDTO } from './posts.dto';

export class PostsRepository {
    static async createPost(post: PostsInputRepositoryDTO): Promise<void> {
        await postsCollection.insertOne(post);
    }
    static async updatePostById(
        id: string,
        postWithUpdate: Omit<PostsInputRepositoryDTO, 'id' | 'createdAt'>,
    ): Promise<void> {
        await postsCollection.updateOne({ id }, { $set: postWithUpdate });
    }
    static async deleteBLogById(id: string): Promise<void> {
        await postsCollection.deleteOne({ id });
    }
    static async deleteAllPosts(): Promise<void> {
        await postsCollection.deleteMany({});
    }
}
