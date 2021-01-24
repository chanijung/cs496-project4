// eslint-disable
import React, {useState, setState, useEffect} from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import {BrowserRouter as Router,Link} from "react-router-dom";
import { withCookies, useCookies } from 'react-cookie';
import Navigation from './components/nav';
import Home from './components/home';
import Observer from './components/useEffect';
import Login from './components/Login';
import Join from './components/Join';
import './App.css';
import axios from 'axios';
import Cookies from 'js-cookie';
import App from './App.js'

class LoginOrJoin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username:null,
            mode:'home',
            userToken: Cookies.get('user'),
            hasToken:false
        };
        this.setHasToken = this.setHasToken.bind(this);
    }

// The effect is fired only when cookies has changed.
    // useEffect(() => {
    //     if (this.state.cookies.user && this.state.cookies.user !== 'undefined') {
    //         this.state.hasCookie = true;
    //     }
    //     }, [ this.state.cookies ]);
        
    setHasToken(userToken){
        if (userToken && userToken !== 'undefined') {
            this.state.hasToken = true;
        }
    }

    componentDidMount(){
        // axios.post('/users/join',{
        //     uid:"1016chani",
        //     pwd:"1234",
        //     name:"Chani Jung",
        //     semester:"2020w",
        //     class:1
        // });

    }

    
    render(){
        return (
            
            <div className="LOJ">
                <Observer value={this.state.userToken} didUpdate={this.setHasToken} />
                <h1>Login or Join</h1>
                <Router>
                {!this.state.hasToken ? <Redirect to="/login" /> : <Redirect to="/app" />}
                {/* <Router> */}
                <Switch>
                    {/* {!this.hasToken ? <Redirect to="/login" /> : <Redirect to="/app" />} */}
                        <Route
                            exact path="/login"
                            render={routerProps => {
                                return (
                                    <Login
                                        {...routerProps}
                                        // loj = {this}
                                        // setHasCookie={setHasCookie}
                                        setHasToken = {this.setHasToken}
                                    />
                                );
                            }}
                        />
                        <Route
                            exact path="/join"
                            component={Join}
                        />
                        <Route
                            exact path="/app"
                            render={routerProps => {
                                return (
                                    <App
                                        {...routerProps}
                                        // setHasCookie={setHasCookie}
                                        // removeCookie={() => {
                                        //     removeCookie('user');
                                        //     setHasCookie(false);
                                        // }}
                                    />
                                );
                            }}
                        />
                </Switch>
                {/* </Router> */}
                </Router>
            </div>
            // <div className="LOJ">
            //     {/* <Navigation onChangePage={function(new_mode){
            //         this.setState({mode: new_mode});
            //         }.bind(this)}/> */}
            //     {/* {content} */}
            //     <Observer value={this.state.userToken} didUpdate={this.setHasToken} />
            // </div>
        );
        ;
    }
}

export default withCookies(LoginOrJoin);
