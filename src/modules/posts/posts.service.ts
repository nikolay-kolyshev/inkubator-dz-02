import { STATUS_CODES } from '../../common/constants';
import { Nullable, ServiceMethodResult } from '../../common/types';
import { generateDate } from '../../common/utils/generateDate';
import { generateId } from '../../common/utils/generateId';
import { BlogsRepository } from '../blogs/blogs.repository';
import { BlogScheme } from '../blogs/blogs.schemes';
import { PostsInputDTO } from './posts.dto';
import { PostEntity } from './posts.entities';
import { PostsRepository } from './posts.repository';
import { PostScheme } from './posts.schemes';

export class PostsService {
    static async findAllPosts(): Promise<Array<PostEntity>> {
        const posts = await PostsRepository.findAllPosts();
        return posts.map((post) => ({
            id: post.id,
            title: post.title,
            content: post.content,
            shortDescription: post.shortDescription,
            blogId: post.blogId,
            blogName: post.blogName,
            createdAt: post.createdAt,
        }));
    }
    static async createPost(postDTO: PostsInputDTO): Promise<PostEntity> {
        const foundedBlog = (await BlogsRepository.findBlogById(postDTO.blogId)) as BlogScheme;
        if (!foundedBlog) {
            throw new Error('Blog not found');
        }
        const id = generateId();
        await PostsRepository.createPost({
            id: generateId(),
            blogName: foundedBlog.name,
            createdAt: generateDate(),
            ...postDTO,
        });
        const createdPost = (await PostsRepository.findPostById(id)) as PostScheme;
        return {
            id: createdPost.id,
            title: createdPost.title,
            shortDescription: createdPost.shortDescription,
            content: createdPost.content,
            blogId: createdPost.blogId,
            blogName: createdPost.blogName,
            createdAt: createdPost.createdAt,
        };
    }
    static async findPostById(id: string): Promise<Nullable<PostScheme>> {
        return await PostsRepository.findPostById(id);
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
        await PostsRepository.updatePostById(id, {
            ...postWithUpdate,
            blogName: foundedBlog.name,
            createdAt: generateDate(),
        });
        return {
            response: true,
        };
    }
    static async deleteBLogById(id: string): Promise<boolean> {
        const foundedPost = await PostsRepository.findPostById(id);
        if (!foundedPost) {
            return false;
        }
        try {
            await PostsRepository.deleteBLogById(id);
            return true;
        } catch (e) {
            return false;
        }
    }
}
