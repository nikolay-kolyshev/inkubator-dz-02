import { Nullable } from '../../common/types';
import { blogsCollection } from '../../database/collections';
import { BlogsInputDTO, BlogsInputRepositoryDTO } from './blogs.dto';
import { BlogScheme } from './blogs.schemes';

export class BlogsRepository {
    static async findAllBlogs(): Promise<Array<BlogScheme>> {
        return blogsCollection.find().toArray();
    }
    static async createBlog(blog: BlogsInputRepositoryDTO): Promise<void> {
        await blogsCollection.insertOne(blog as BlogScheme);
    }
    static async findBlogById(id: string): Promise<Nullable<BlogScheme>> {
        return blogsCollection.findOne({ id });
    }
    static async updateBlogById(id: string, blogWithUpdate: BlogsInputDTO): Promise<void> {
        await blogsCollection.updateOne({ id }, { $set: blogWithUpdate });
    }
    static async deleteBLogById(id: string): Promise<void> {
        await blogsCollection.deleteOne({ id });
    }
    static async deleteAllBlogs(): Promise<void> {
        await blogsCollection.deleteMany({});
    }
}