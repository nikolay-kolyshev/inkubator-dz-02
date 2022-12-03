import { STATUS_CODES } from '../../common/constants';
import { Nullable, ServiceMethodResult } from '../../common/types';
import { BlogsRepository } from '../blogs/blogs.repository';
import { BlogScheme } from '../blogs/blogs.schemes';
import { PostsInputDTO } from './posts.dto';
import { PostsRepository } from './posts.repository';
import { PostScheme } from './posts.schemes';

export class PostsService {
    static async findAllPosts(): Promise<Array<PostScheme>> {
        return PostsRepository.findAllPosts();
    }
    static async createPost(postDTO: PostsInputDTO): Promise<PostScheme> {
        const foundedBlog = (await BlogsRepository.findBlogById(postDTO.blogId)) as BlogScheme;
        return PostsRepository.createPost({ ...postDTO, blogName: foundedBlog.name });
    }
    static async findPostById(id: string): Promise<Nullable<PostScheme>> {
        return PostsRepository.findPostById(id);
    }
    static async updatePostById(id: string, postWithUpdate: PostsInputDTO): Promise<ServiceMethodResult<boolean>> {
        const foundedPost = await PostsRepository.findPostById(id);
        if (!foundedPost) {
            return {
                error: {
                    message: 'Post not found',
                    code: STATUS_CODES.NOT_FOUND,
                },
            };
        }
        const foundedBlog = (await BlogsRepository.findBlogById(postWithUpdate.blogId)) as BlogScheme;
        await PostsRepository.updatePostById(id, { ...postWithUpdate, blogName: foundedBlog.name });
        return {
            response: true,
        };
    }
    static async deleteBLogById(id: string): Promise<boolean> {
        return PostsRepository.deleteBLogById(id);
    }
}
