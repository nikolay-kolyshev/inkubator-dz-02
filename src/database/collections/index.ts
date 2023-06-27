import { BannedTokenSchemaDefault } from '../../modules/auth/auth.schemas';
import { BlogSchemeDefault } from '../../modules/blogs/blogs.schemes';
import { CommentsSchemaDefault } from '../../modules/comments/comments.schemas';
import { PostSchemeDefault } from '../../modules/posts/posts.schemes';
import { UserSchemaDefault } from '../../modules/users/users.schemes';
import { databaseClient } from '../index';

const database = databaseClient.db();

export const usersCollection = database.collection<UserSchemaDefault>('users');
export const bannedTokensCollection = database.collection<BannedTokenSchemaDefault>('auth');
export const blogsCollection = database.collection<BlogSchemeDefault>('blogs');
export const postsCollection = database.collection<PostSchemeDefault>('posts');
export const commentsCollection = database.collection<CommentsSchemaDefault>('users');
