import React from "react";

export default class Post extends React.Component {
    
    handleLikeIt(e) {
        if(this.props.user && this.props.user._id){
            if(this.props.liked)
                this.props.unlikedPost(this.props.userId, this.props.id);
            else
                this.props.likePost(this.props.userId, this.props.id);
        }
    }
    
    handleGoUser(e){
        if(this.props.userId && this.props.goUser){
            this.props.goUser(this.props.userId);
        }
    }
    
    handleRemove(e){
        if(this.props.user && this.props.user._id){
            this.props.removePost(this.props.id);
        }
    }
    
    render() {
        
        let likeButtonClassName = "btn btn-default ";
        
        if(this.props.user === undefined || this.props.user._id === undefined) 
            likeButtonClassName += "disabled";
        
        let likeIconClassName = this.props.liked ? "fa fa-thumbs-up liked" : "fa fa-thumbs-o-up";
            
        let removeButton = this.props.userId === this.props.user._id 
                            ? <button className={likeButtonClassName} onClick={this.handleRemove.bind(this)}>
                                <i className="fa fa-trash" aria-hidden="true"></i>
                            </button>
                            : null;
        
        return (
            <div className="thumbnail">
              <img id="imageURLPreview" src={this.props.imageURL} alt={this.props.description}
              onError={(e) => e.target.src = "http://res.cloudinary.com/hassan/image/upload/v1486438820/punch_watermark_meblzh.svg"}/>
              <div className="caption">
                <div className="row">
                    <p className="post-description">{this.props.description}</p>
                </div>
                <div className="row like-row">
                    <div className="col-sm-4">
                        <a href="#" onClick={this.handleGoUser.bind(this)}>
                            <img className="app-navbar-img" alt="." src={this.props.photoURL}/>
                        </a>
                    </div>
                    <div className="col-sm-4">
                        <div className="row" >
                            <button className={likeButtonClassName} onClick={this.handleLikeIt.bind(this)}>
                                <i className={likeIconClassName} aria-hidden="true"></i> <span className="badge">{this.props.likesCount}</span>
                            </button>
                        </div>
                    </div>
                    <div className="col-sm-4">
                        {removeButton}
                    </div>
                </div>
              </div>
            </div>
        );
    }
}