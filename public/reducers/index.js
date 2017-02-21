import { Map, OrderedMap }          from 'immutable';
import { normalize, schema }        from 'normalizr';
import { post }                     from '../schema';

const initState = Map({
    user: Map(),
    posts: OrderedMap(),
    userPosts: Map(),
    likes: OrderedMap(),
    requesting: false,
    error: undefined
});

export default function reducer(state = initState, action) {
    switch(action.type){
        case 'FETCH_USER':
            return state.set('user', Map(action.payload.user));
        case 'FETCH_NEW_POST':
            const nPost = normalize({...action.payload.post, post_id: action.payload.post._id}, post);
            return state.updateIn(['posts'], posts => posts.merge(Map(nPost.entities.posts)));
        case 'REQUEST_POSTS':
            return state.set('requesting', action.payload.requesting);
        case 'FETCH_POSTS':
            const nPosts = normalize(action.payload, { posts: new schema.Array(post) });
            return state.set('requesting', action.payload.requesting).set('posts', OrderedMap(nPosts.entities.posts));
        case 'FETCH_ERROR':
            return state.set('error', action.payload.error).set('requesting', action.payload.requesting);
        case 'FETCH_USER_POSTS':
            const nUserPosts = normalize(action.payload, { posts: new schema.Array(post) });
            const user = Map(action.payload.user);
            return state.set('userPosts',  user.set('posts', OrderedMap(nUserPosts.entities.posts)));
    }
    return state;
}