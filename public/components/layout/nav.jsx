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
        let myPostsItem = user._id ? <li> <a className="app-menu-item" href="/#" onClick={this.handleGoUser}>My Posts</a></li> : null;
        let newPostsItem = user._id ? <li> <a className="app-menu-item new-post-anchor" name="newPost" onClick={()=>{ $('#newPostModal').modal('show') }}>New Post</a> </li> : null;

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
                            <img alt="LogOut" src={user.photoURL}/> <span className="caret"></span>
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
                      <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#app-navbar-collapse" aria-expanded="false">
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                      </button>
                      <IndexLink className="navbar-brand" to="/">
                        <span className="banner-title">Punchterest <img className="app-navbar-icon" alt="Punchterest" src="https://res.cloudinary.com/hassan/image/upload/v1486435562/punch_icon.svg"/></span>
                      </IndexLink>
                    </div>
                    <div className="collapse navbar-collapse" id="app-navbar-collapse">
                    
                        {linksItem}
                    
                        {profileItem}
                    
                    </div>
                </div>
            </nav>
        );
    }
}