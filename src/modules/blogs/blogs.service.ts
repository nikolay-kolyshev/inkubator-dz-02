import { generateDate } from '../../common/utils/generateDate';
import { generateId } from '../../common/utils/generateId';
import { PostsInputDTO } from '../posts/posts.dto';
import { PostEntity } from '../posts/posts.entities';
import { PostsService } from '../posts/posts.service';
import { BlogsInputDTO, BlogsInputRepositoryDTO } from './blogs.dto';
import { BlogEntity } from './blogs.entities';
import { BlogsQueryRepository } from './blogs.query-repository';
import { BlogsRepository } from './blogs.repository';

export class BlogsService {
    static async createBlog(blogDTO: BlogsInputDTO): Promise<BlogEntity> {
        const blogCandidate: BlogsInputRepositoryDTO = {
            id: generateId(),
            createdAt: generateDate(),
            ...blogDTO,
        };
        await BlogsRepository.createBlog(blogCandidate);
        const createdBlog = await BlogsQueryRepository.findBlogById(blogCandidate.id);
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
    static async createPostByBlogId(postCandidate: PostsInputDTO): Promise<PostEntity> {
        return await PostsService.createPost({ ...postCandidate });
    }
    static async updateBlogById(id: string, blogWithUpdate: BlogsInputDTO): Promise<boolean> {
        const blogCandidate = await BlogsQueryRepository.findBlogById(id);
        if (!blogCandidate) {
            return false;
        }
        await BlogsRepository.updateBlogById(id, { ...blogWithUpdate });
        return true;
    }
    static async deleteBLogById(id: string): Promise<boolean> {
        const blogCandidate = await BlogsQueryRepository.findBlogById(id);
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
