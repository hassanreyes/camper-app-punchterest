import React                from "react";
import { connect }          from "react-redux";
import { browserHistory }   from "react-router";
import axios                from "axios";
import * as userActions     from "../actions/userActions";
import Post                 from "../components/posts/post";

class AllPosts extends React.Component {
    
    constructor(props){
        super(props);
    }
    
    handleLikePost(userId, post_id){
        const url = `/posts/like/${userId}/${post_id}`;
        axios.get(url)
        .then((response) => {
            userActions.getPosts(this.props.dispatch);
        })
        .catch((error) => {
            console.error(error.message);
        });
    }
    
    handleUnlikePost(userId, post_id){
        const url = `/posts/unlike/${userId}/${post_id}`;
        axios.get(url)
        .then((response) => {
            userActions.getPosts(this.props.dispatch);
        })
        .catch((error) => {
            console.error(error.message);
        });
    }
    
    handleGoUser(user_id){
        browserHistory.push( { pathname: '/userPosts', query : { user_id : user_id } });
    }
    
    handleRemovePost(post_id){
        const url = `/posts/${post_id}`;
        axios.delete(url)
        .then((response) => {
            userActions.getPosts(this.props.dispatch);
        })
        .catch((error) => {
            console.error(error.message);
        });
    }
    
    componentWillMount(){
        //Request and fetch all user´s posts
        userActions.getPosts(this.props.dispatch, true);
    }
    
    componentDidUpdate(){
        //Delay layout refresh to let components be rendered
         window.setTimeout(() => {
            $('.grid').masonry({
              itemSelector: '.grid-item',
            });
            $('.grid').masonry( 'reloadItems' );
            $('.grid').masonry( 'layout' );
        }, 1000);
    }
    
    render() {
        let postElements = [];
        for(let prop in this.props.posts) {
            let post = this.props.posts[prop];
            postElements.push(<div className="grid-item" key={prop}>
                        <Post id={post.post_id} userId={post._id} photoURL={post.photoURL}
                            imageURL={post.imageURL} description={post.description}
                            likesCount={post.likesCount} liked={post.liked > 0} 
                            user={this.props.user} goUser={this.handleGoUser}
                            unlikedPost ={this.handleUnlikePost.bind(this)} 
                            likePost={this.handleLikePost.bind(this)} 
                            removePost={this.handleRemovePost.bind(this)}/>
                    </div>);
        }
        
        let gridElement = this.props.requesting ? 
            <i className="fa fa-spinner fa-spin fa-5x" aria-hidden="true"></i>
            :
            <div className="grid">
                {postElements}
            </div>;
        
        return (
            <div>
                {gridElement}
            </div>
        );
    }
}

export default connect((state) => {
    const jsState = state.app.toJS();
    return {
        posts: jsState.posts,
        requesting: jsState.requesting,
        user: jsState.user
    };
})(AllPosts);