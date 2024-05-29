export {default} from 'next-auth/middleware';

export const config = {
    matcher: ['/hikes/add', '/profile', '/hikes/saved', '/messages']
};