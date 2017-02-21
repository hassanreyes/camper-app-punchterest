import React        from "react";
import ReactDOM     from "react-dom";
import { Router, Route, IndexRoute, browserHistory } from "react-router";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import thunk        from "redux-thunk";
import { Provider } from "react-redux";
import reducers      from "./reducers";

import Layout       from "./pages/layout";
import AllPosts     from "./pages/allPosts";
import UserPosts    from "./pages/userPosts";


//Redux inialitation
const thunkMidd = applyMiddleware(thunk);
const middleware = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() 
    ? compose(thunkMidd, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()) 
    : thunkMidd;
    
const reducer = combineReducers({
    app: reducers,
    routing: routerReducer
});

var store = createStore(reducer, middleware);

const history = syncHistoryWithStore(browserHistory, store);

const onEnterAuthTwitter = (nextSate, replace) => {
    //After callback redirect to /home
    replace('/home');
};

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={Layout}>
              <IndexRoute component={AllPosts}></IndexRoute>
              <Route path="home" name="allPosts" component={AllPosts}></Route>
              <Route path="userPosts" name="userPosts" component={UserPosts}></Route>
              <Route path="auth/twitter/callback" onEnter={onEnterAuthTwitter}></Route>
            </Route>
        </Router>
    </Provider>,
  document.getElementById('app')
);
