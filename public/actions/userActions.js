export function fetchUser(user){
    return {
        type: 'FETCH_USER',
        payload: {
            user: user
        }
    };
}

export function fetchNewPost(post){
    return {
        type: 'FETCH_NEW_POST',
        payload: {
            post: post
        }
    };
}

export function requestPost(){
    return {
        type: 'REQUEST_POSTS',
        payload: {
            requesting: true
        }
    };
}

export function fetchPosts(posts){
    return {
        type: 'FETCH_POSTS',
        payload: {
            posts: posts,
            requesting: false
        }
    };
}

export function fetchRequestError(error){
    return {
        type: 'FETCH_ERROR',
        payload: {
            error: error,
            requesting: false
        }
    };
}

export function fetchUserPosts(user, posts){
    return {
        type: 'FETCH_USER_POSTS',
        payload: {
            user: user,
            posts: posts
        }
    };
}