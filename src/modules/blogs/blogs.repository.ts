import { blogsCollection } from '../../database/collections';
import { BlogsInputRepositoryDTO } from './blogs.dto';

export class BlogsRepository {
    static async createBlog(blog: BlogsInputRepositoryDTO): Promise<void> {
        await blogsCollection.insertOne({
            ...blog,
            isMembership: true,
        });
    }
    static async updateBlogById(
        id: string,
        blogWithUpdate: Omit<BlogsInputRepositoryDTO, 'id' | 'createdAt'>,
    ): Promise<void> {
        await blogsCollection.updateOne({ id }, { $set: blogWithUpdate });
    }
    static async deleteBLogById(id: string): Promise<void> {
        await blogsCollection.deleteOne({ id });
    }
    static async deleteAllBlogs(): Promise<void> {
        await blogsCollection.deleteMany({});
    }
}
