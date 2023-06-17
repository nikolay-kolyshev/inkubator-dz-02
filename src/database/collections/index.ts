import { BlogSchemeDefault } from '../../modules/blogs/blogs.schemes';
import { PostSchemeDefault } from '../../modules/posts/posts.schemes';
import { UserSchemaDefault } from '../../modules/users/users.schemes';
import { databaseClient } from '../index';

const database = databaseClient.db();

export const blogsCollection = database.collection<BlogSchemeDefault>('blogs');
export const postsCollection = database.collection<PostSchemeDefault>('posts');
export const usersCollection = database.collection<UserSchemaDefault>('users');
export const commentsCollection = database.collection<UserSchemaDefault>('users');
