import { schema } from 'normalizr';

const post = new schema.Entity('posts', {}, { idAttribute: 'post_id' });
const like = new schema.Entity('likes', {}, { idAttribute: '_id' });
const user = new schema.Entity('user', {}, { idAttribute: '_id' });

export { post, like, user };


