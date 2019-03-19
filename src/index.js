import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import UserSignIn from './components/UserSignIn'
import SignInHandler from "./components/SignInHandler";
import MinderSignIn from "./components/MinderSignIn";
import RegisterHandler from "./components/RegisterHandler"
import RegisterUser from "./components/UserRegister"
import RegisterMinder from "./components/MinderRegister"
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={SignInHandler} />
            <Route exact path="/usersignin" component={UserSignIn} />
            <Route exact path="/mindersignin" component={MinderSignIn} />
            <Route exact path="/register" component={RegisterHandler} />
            <Route exact path="/registeruser" component={RegisterUser} />
            <Route exact path="/registerminder" component={RegisterMinder} />
            <Route exact path="/app" component={App} />
        </Switch>
    </BrowserRouter>,
    
    
    document.getElementById('root')
    
    );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
