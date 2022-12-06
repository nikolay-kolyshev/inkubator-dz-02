import { STATUS_CODES } from '../../common/constants';
import { ServiceMethodResult } from '../../common/types';
import { generateDate } from '../../common/utils/generateDate';
import { generateId } from '../../common/utils/generateId';
import { BlogsQueryRepository } from '../blogs/blogs.query-repository';
import { BlogScheme } from '../blogs/blogs.schemes';
import { PostsInputDTO } from './posts.dto';
import { PostEntity } from './posts.entities';
import { PostsQueryRepository } from './posts.query-repository';
import { PostsRepository } from './posts.repository';

export class PostsService {
    static async createPost(postDTO: PostsInputDTO): Promise<PostEntity> {
        const foundedBlog = await BlogsQueryRepository.findBlogById(postDTO.blogId);
        const id = generateId();
        await PostsRepository.createPost({
            id,
            blogName: foundedBlog!.name,
            createdAt: generateDate(),
            ...postDTO,
        });
        const createdPost = await PostsQueryRepository.findPostById(id);
        if (!createdPost) {
            throw new Error('Post was not created');
        }
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
    static async updatePostById(id: string, postWithUpdate: PostsInputDTO): Promise<ServiceMethodResult<boolean>> {
        const foundedPost = await PostsQueryRepository.findPostById(id);
        if (!foundedPost) {
            return {
                error: {
                    message: 'Post not found',
                    code: STATUS_CODES.NOT_FOUND,
                },
            };
        }
        const foundedBlog = (await BlogsQueryRepository.findBlogById(postWithUpdate.blogId)) as BlogScheme;
        await PostsRepository.updatePostById(id, {
            ...postWithUpdate,
            blogName: foundedBlog.name,
        });
        return {
            response: true,
        };
    }
    static async deleteBLogById(id: string): Promise<boolean> {
        const foundedPost = await PostsQueryRepository.findPostById(id);
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
