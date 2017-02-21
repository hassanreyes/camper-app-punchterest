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
    
    handleLikePost(user, post_id){
        const url = `/posts/like/${user._id}/${post_id}/${this.props.user._id}`;
        axios.get(url)
        .then((response) => {
            this.props.dispatch(userActions.fetchPosts(response.data));
            console.log(response);
        })
        .catch((error) => {
            console.error(error.message);
        });
    }
    
    handleUnlikePost(user, post_id){
        const url = `/posts/unlike/${user._id}/${post_id}/${this.props.user._id}`;
        axios.get(url)
        .then((response) => {
            this.props.dispatch(userActions.fetchPosts(response.data));
            console.log(response);
        })
        .catch((error) => {
            console.error(error.message);
        });
    }
    
    
    handleGoUser(user_id){
        browserHistory.push( { pathname: '/userPosts', query : { user_id : user_id } });
    }
    
    componentWillMount(){
        const url = `/posts/${this.props.user_id}`;
        axios.get(url)
        .then((response) => {
            this.props.dispatch(
                userActions.fetchUserPosts(
                    response.data.user, response.data.posts
                )
            );
        })
        .catch((error) => {
            console.error(error.message);
        });
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
                            <Post id={post.post_id} userId={prop} photoURL={post.photoURL}
                                imageURL={post.imageURL} description={post.description}
                                likesCount={post.likesCount} liked={post.liked > 0} 
                                user={this.props.user} goUser={this.handleGoUser.bind(this)}
                                unlikedPost ={this.handleUnlikePost.bind(this)} 
                                likePost={this.handleLikePost.bind(this)} />
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