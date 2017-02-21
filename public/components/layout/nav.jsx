import React                                from "react";
import { IndexLink, Link, browserHistory }  from "react-router";
import NewPost                              from "../posts/newPost";

export default class Nav extends React.Component {
    
    constructor(props){
        super(props);
        
        this.handleGoUser = this.handleGoUser.bind(this);
        this.renderProfileLinks = this.renderProfileLinks.bind(this);
        this.renderAppLinks = this.renderAppLinks.bind(this);
    }
    
    handleGoUser(e){
        e.preventDefault();
        
        browserHistory.push( { pathname: '/userPosts', query : { user_id : this.props.user._id } });   
    }
    
    renderAppLinks(){
        
        const user = this.props.user;
        
        let newPostModalItem = user._id ? <NewPost/> : null;
        let myPostsItem = user._id ? <li> <a href="/#" onClick={this.handleGoUser}>My Posts</a></li> : null;
        let newPostsItem = user._id ? <li> <a name="newPost" className="new-post-anchor" onClick={()=>{ $('#newPostModal').modal('show') }}>New Post</a> </li> : null;

        return (
            <ul className="nav navbar-nav">
                {myPostsItem}
                {newPostsItem}
                {newPostModalItem}
            </ul>
        );
    }
    
    renderProfileLinks(){
        
        const user = this.props.user;
        if(user._id) {
            return (
                <ul className="nav navbar-nav navbar-right">
                    <li className="dropdown">
                        <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                            <img className="app-navbar-img" alt="LogOut" src={user.photoURL}/> <span className="caret"></span>
                        </a>
                        <ul className="dropdown-menu">
                            <li><a href="/auth/logOut">Log Out</a></li>
                        </ul>
                    </li>
                </ul>
            );
        } else {
            return (
                <ul className="nav navbar-nav navbar-right">
                    <li>
                        <button className="btn btn-primary navbar-btn" role="button" onClick={()=>{location.href="/auth/twitter"}}>
                            <i className="fa fa-twitter" aria-hidden="true"></i> Twitter
                        </button>
                    </li>
                </ul>
            );
        }
    }
    
    render() {
        
        let linksItem = this.renderAppLinks();
        let profileItem = this.renderProfileLinks();
        
        return (
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="navbar-header">
                      <IndexLink className="navbar-brand" to="/">
                        <span className="banner-title">Punchterest <img className="app-navbar-icon" alt="Punchterest" src="https://res.cloudinary.com/hassan/image/upload/v1486435562/punch_icon.svg"/></span>
                      </IndexLink>
                    </div>
                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                    
                        {linksItem}
                    
                        {profileItem}
                    
                    </div>
                </div>
            </nav>
        );
    }
}