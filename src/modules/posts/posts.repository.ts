import { Nullable } from '../../common/types';
import { postsCollection } from '../../database/collections';
import { PostsInputRepositoryDTO } from './posts.dto';
import { PostScheme } from './posts.schemes';

export class PostsRepository {
    static async findAllPosts(): Promise<Array<PostScheme>> {
        return postsCollection.find().toArray();
    }
    static async createPost(post: PostsInputRepositoryDTO): Promise<void> {
        await postsCollection.insertOne(post as PostScheme);
    }
    static async findPostById(id: string): Promise<Nullable<PostScheme>> {
        return postsCollection.findOne({ id });
    }
    static async updatePostById(id: string, postWithUpdate: Omit<PostsInputRepositoryDTO, 'id'>): Promise<void> {
        await postsCollection.updateOne({ id }, { $set: postWithUpdate });
    }
    static async deleteBLogById(id: string): Promise<void> {
        await postsCollection.deleteOne({ id });
    }
    static async deleteAllPosts(): Promise<void> {
        await postsCollection.deleteMany({});
    }
}
