import React                from "react";
import { connect }          from "react-redux";
import { browserHistory }   from "react-router";
import axios                from "axios";
import * as userActions     from "../actions/userActions";
import Post                 from "../components/posts/post";

class UserPosts extends React.Component {
    
    constructor(props){
        super(props);
        
        this.componentDidUpdate = this.componentDidUpdate.bind(this);
    }
    
    handleLikePost(userId, post_id){
        let url = `/posts/like/${userId}/${post_id}`;
        axios.get(url)
        .then((response) => {
            //update list of user posts
            userActions.getUserPosts(this.props.dispatch, this.props.user_id);
        })
        .catch((error) => {
            console.error(error.message);
        });
    }
    
    handleUnlikePost(userId, post_id){
        let url = `/posts/unlike/${userId}/${post_id}`;
        axios.get(url)
        .then((response) => {
            //update list of user posts
            userActions.getUserPosts(this.props.dispatch, this.props.user_id);
        })
        .catch((error) => {
            console.error(error.message);
        });
    }
    
    handleGoUser(user_id){
        browserHistory.push( { pathname: '/userPosts', query : { user_id : user_id } });
    }
    
    handleRemovePost(user, post_id){
        const url = `/posts/${post_id}`;
        axios.delete(url)
        .then((response) => {
            //update list of user posts
            userActions.getUserPosts(this.props.dispatch, this.props.user_id);
        })
        .catch((error) => {
            console.error(error.message);
        });
    }
    
    componentWillMount(){
        //Request and fetch user´s posts
        userActions.getUserPosts(this.props.dispatch, this.props.user_id);
    }
    
    componentDidUpdate(){
        //Delay layout refresh to let components be rendered
         window.setTimeout(() => {
            $('.grid').masonry({
              itemSelector: '.grid-item',
            });
            $('.grid').masonry( 'reloadItems' );
            $('.grid').masonry( 'layout' );
        }, 500);
    }
    
    render() {
        let postElements = [];

        if(this.props.userPosts.posts){
            for(let prop in this.props.userPosts.posts) {
                let post = this.props.userPosts.posts[prop];
                postElements.push(<div className="grid-item" key={prop}>
                            <Post id={post.post_id} userId={post._id} photoURL={post.photoURL}
                                imageURL={post.imageURL} description={post.description}
                                likesCount={post.likesCount} liked={post.liked > 0} 
                                user={this.props.user} goUser={this.handleGoUser.bind(this)}
                                unlikedPost ={this.handleUnlikePost.bind(this)} 
                                likePost={this.handleLikePost.bind(this)} 
                                removePost={this.handleRemovePost.bind(this)}/>
                        </div>);
            }   
        }
        
        return (
            <div>
                <h2> {this.props.userPosts.displayName} Posts </h2>
            
                <div className="grid">
                    {postElements}
                </div>
            </div>
        );
    }
}

export default connect((state) => {
    const jsState = state.app.toJS();
    return {
        user_id: state.routing.locationBeforeTransitions.query.user_id,
        userPosts: jsState.userPosts,
        user: jsState.user
    };
})(UserPosts);