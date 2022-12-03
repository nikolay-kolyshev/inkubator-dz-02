import { Nullable } from '../../common/types';
import { generateId } from '../../common/utils/generateId';
import { BlogsInputDTO } from './blogs.dto';
import { BlogScheme } from './blogs.schemes';

const blogs: Array<BlogScheme> = [];

export class BlogsRepository {
    static async findAllBlogs(): Promise<Array<BlogScheme>> {
        return blogs;
    }
    static async createBlog(blogDTO: BlogsInputDTO): Promise<BlogScheme> {
        const id = generateId();
        const blogCandidate: BlogScheme = {
            id,
            ...blogDTO,
        };
        blogs.push(blogCandidate);
        return blogCandidate;
    }
    static async findBlogById(id: string): Promise<Nullable<BlogScheme>> {
        return blogs.find((blog) => blog.id === id) ?? null;
    }
    static async updateBlogById(id: string, blogWithUpdate: BlogsInputDTO): Promise<boolean> {
        const blogCandidateIndex = BlogsRepository.findBlogIndexById(id);
        if (blogCandidateIndex === -1) {
            return false;
        }
        blogs[blogCandidateIndex] = {
            ...blogs[blogCandidateIndex],
            ...blogWithUpdate,
        };
        return true;
    }
    static async deleteBLogById(id: string): Promise<boolean> {
        const blogCandidateIndex = BlogsRepository.findBlogIndexById(id);
        if (blogCandidateIndex === -1) {
            return false;
        }
        blogs.splice(blogCandidateIndex, 1);
        return true;
    }
    static findBlogIndexById(id: string): number {
        return blogs.findIndex((blog) => blog.id === id);
    }
    static deleteAllBlogs(): void {
        blogs.splice(0, blogs.length);
    }
}
