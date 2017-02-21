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
        this.props.dispatch((dispatch) => {
            
            dispatch(userActions.requestPost());
            
            axios.get('/posts')
            .then((response) => {
                dispatch(userActions.fetchPosts(response.data));
                
                if(this.props.user._id){
                    axios.get('/posts/' + this.props.user._id)
                    .then((response) => {
                        console.log(response);
                    })
                    .catch((error) => {
                       debugger;
                       console.error(error.message);
                    });
                }
            })
            .catch((error) => {
                debugger;
                dispatch(userActions.fetchRequestError(error.message));
            }); 
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
                            likePost={this.handleLikePost.bind(this)} />
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