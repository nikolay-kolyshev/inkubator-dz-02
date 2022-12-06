import { BlogSchemeDefault } from '../../modules/blogs/blogs.schemes';
import { PostSchemeDefault } from '../../modules/posts/posts.schemes';
import { databaseClient } from '../index';

const database = databaseClient.db();

export const blogsCollection = database.collection<BlogSchemeDefault>('blogs');
export const postsCollection = database.collection<PostSchemeDefault>('posts');
