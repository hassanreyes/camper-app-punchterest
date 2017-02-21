import React                from "react";
import { connect }          from "react-redux";
import Auth                 from "../auth";
import * as userActions     from "../actions/userActions";
import Nav                  from "../components/layout/nav";

class Layout extends React.Component {
    
    constructor(props){
        super(props);
        
        this.componentWillMount = this.componentWillMount.bind(this);
    }
    
    componentWillMount(){
      let auth = Auth.logIn();
      auth.then((response) => {
        this.props.dispatch(userActions.fetchUser(response.data.user));
      })
      .catch((response) => {
        console.error(response.message);
        this.props.dispatch(userActions.fetchUser(undefined));
      });
      
    }
    
    render() {
        const containerStyle = {
          marginTop: "60px"
        };
    
    return (
      <div>

        <Nav user={this.props.user}/>

        <div className="container" style={containerStyle}>
          <div className="row">
            <div className="col-lg-12">

              {this.props.children}

            </div>
          </div>
        </div>
        
      </div>

    );
  }
}

export default connect((state) => {
    const jsState = state.app.toJS();
    return {
        user: jsState.user
    };
})(Layout);