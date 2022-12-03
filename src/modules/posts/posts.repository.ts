import { Nullable } from '../../common/types';
import { generateId } from '../../common/utils/generateId';
import { PostsInputRepositoryDTO } from './posts.dto';
import { PostScheme } from './posts.schemes';

const posts: Array<PostScheme> = [];

export class PostsRepository {
    static async findAllPosts(): Promise<Array<PostScheme>> {
        return posts;
    }
    static async createPost(postDTO: PostsInputRepositoryDTO): Promise<PostScheme> {
        const id = generateId();
        const postCandidate: PostScheme = {
            id,
            ...postDTO,
        };
        posts.push(postCandidate);
        return postCandidate;
    }
    static async findPostById(id: string): Promise<Nullable<PostScheme>> {
        return posts.find((post) => post.id === id) ?? null;
    }
    static async updatePostById(id: string, postWithUpdate: PostsInputRepositoryDTO): Promise<boolean> {
        const postCandidateIndex = PostsRepository.findPostIndexById(id);
        if (postCandidateIndex === -1) {
            return false;
        }
        posts[postCandidateIndex] = {
            ...posts[postCandidateIndex],
            ...postWithUpdate,
        };
        return true;
    }
    static async deleteBLogById(id: string): Promise<boolean> {
        const postCandidateIndex = PostsRepository.findPostIndexById(id);
        if (postCandidateIndex === -1) {
            return false;
        }
        posts.splice(postCandidateIndex, 1);
        return true;
    }
    static findPostIndexById(id: string): number {
        return posts.findIndex((post) => post.id === id);
    }
    static deleteAllPosts(): void {
        posts.splice(0, posts.length);
    }
}
