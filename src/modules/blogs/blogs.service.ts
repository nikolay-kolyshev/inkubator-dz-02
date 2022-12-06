import { Nullable } from '../../common/types';
import { generateId } from '../../common/utils/generateId';
import { BlogsInputDTO } from './blogs.dto';
import { BlogEntity } from './blogs.entities';
import { BlogsRepository } from './blogs.repository';
import { BlogScheme } from './blogs.schemes';

export class BlogsService {
    static async findAllBlogs(): Promise<Array<BlogEntity>> {
        const blogs = await BlogsRepository.findAllBlogs();
        return blogs.map((blog) => ({
            id: blog.id,
            name: blog.name,
            description: blog.description,
            createdAt: blog.createdAt,
            websiteUrl: blog.websiteUrl,
        }));
    }
    static async createBlog(blogDTO: BlogsInputDTO): Promise<BlogEntity> {
        const id = generateId();
        const blogCandidate = {
            id,
            ...blogDTO,
        };
        await BlogsRepository.createBlog(blogCandidate);
        const createdBlog = await BlogsRepository.findBlogById(blogCandidate.id);
        if (!createdBlog) {
            throw new Error('Blog was not created');
        }
        return {
            id: createdBlog.id,
            name: createdBlog.name,
            description: createdBlog.description,
            websiteUrl: createdBlog.websiteUrl,
            createdAt: createdBlog.createdAt,
        };
    }
    static async findBlogById(id: string): Promise<Nullable<BlogScheme>> {
        return BlogsRepository.findBlogById(id);
    }
    static async updateBlogById(id: string, blogWithUpdate: BlogsInputDTO): Promise<boolean> {
        const blogCandidate = BlogsRepository.findBlogById(id);
        if (!blogCandidate) {
            return false;
        }
        await BlogsRepository.updateBlogById(id, blogWithUpdate);
        return true;
    }
    static async deleteBLogById(id: string): Promise<boolean> {
        const blogCandidate = BlogsRepository.findBlogById(id);
        if (!blogCandidate) {
            return false;
        }
        await BlogsRepository.deleteBLogById(id);
        return true;
    }
    static async deleteAllBlogs(): Promise<void> {
        await BlogsRepository.deleteAllBlogs();
    }
}
