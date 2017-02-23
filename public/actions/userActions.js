import axios                from "axios";

/*----------------------------------
*
* Complex Actions
*
*----------------------------------*/
export function getPosts(dispatch, showRequesting = false)
{
    dispatch((dispatch) => {
        
        //Start requesting state
        if(showRequesting) dispatch(requestPost());
        
        //Get all user's posts
        axios.get('/posts')
        .then((response) => {
            //fetch posts
            dispatch(fetchPosts(response.data));
        })
        .catch((error) => {
            //dispatch error
            dispatch(fetchRequestError(error.message));
        });   
    });
}

export function getUserPosts(dispatch, userId)
{
    //get given user's posts
    const url = `/posts/${userId}`;
    axios.get(url)
    .then((response) => {
        dispatch(
            //fetch posts
            fetchUserPosts(
                response.data.user, response.data.posts
            )
        );
    })
    .catch((error) => {
        //TODO:: Dispatch Error as an Action
        console.error(error.message);
    });
}

/*----------------------------------
* 
* Basic Action objects creators
*
*----------------------------------*/

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