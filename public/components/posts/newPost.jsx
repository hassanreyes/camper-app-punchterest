import React                from "react";
import { connect }          from "react-redux";
import axios                from "axios";
import * as userActions     from "../../actions/userActions";

class NewPost extends React.Component {
    
    constructor(props){
        super(props);
        
        this.defaultImageURL = 'http://res.cloudinary.com/hassan/image/upload/v1486438820/punch_watermark_meblzh.svg';
        
        this.state = { imageURL: '', description: ''};
    }
    
    handleImageURLChange(e){
        this.setState({ imageURL: e.target.value });
    }
    
    handleDescriptionChange(e){
        this.setState({ description: e.target.value });
    }
    
    handlePostIt(e){
        axios.post('/post', this.state)
        .then((response) => {
          //Clear fields
          this.setState({ imageURL: '', description: ''});
          //Update application state (redux store state)
          userActions.getPosts(this.props.dispatch);
          //Hide modal
          $('#newPostModal').modal('hide');
        })
        .catch((response) => {
            console.error(response.message);
        });
    }
    
    render() {
        return (
            <div className="modal fade" id="newPostModal" role="dialog" aria-labelledby="newPostLabel">
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 className="modal-title" id="newPostLabel">New Punch</h4>
                  </div>
                  <div className="modal-body">
                    <div className="row">
                      <div className="col-sm-12 col-md-12">
                        <div className="thumbnail">
                          <div>
                          <img className="app-thumbnail-img" id="imageURLPreview" src={this.state.imageURL} alt={this.state.description}
                            onError={(e) => e.target.src = "http://res.cloudinary.com/hassan/image/upload/v1486438820/punch_watermark_meblzh.svg"}/>
                          </div>
                          <div className="caption">
                            <div className="form-group">
                                <label htmlFor="imageURL">Image URL</label>
                                <input type="text" className="form-control" id="imageURL" 
                                    value={this.state.imageURL}
                                    onChange={this.handleImageURLChange.bind(this)} />
                                <label htmlFor="description">Description</label>
                                <textarea className="form-control" id="description" rows="3" maxLength="49"
                                    value={this.state.description}
                                    onChange={this.handleDescriptionChange.bind(this)}/>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary" onClick={this.handlePostIt.bind(this)}>Post It</button>
                  </div>
                </div>
              </div>
            </div>
        );
    }
}

export default connect()(NewPost);
