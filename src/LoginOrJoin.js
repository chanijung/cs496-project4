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
import axios from 'axios';
import Cookies from 'js-cookie';
import Projects from './components/first_tab/projects';
import Gallery from './components/first_tab/gallery';
import Archive from './components/second_tab/archive';
import Famehall from './components/second_tab/famehall';
import Helpful from './components/second_tab/helpful';

class LoginOrJoin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username:null,
            userToken: Cookies.get('user'),
            hasToken: Cookies.get('user') != null
        };
        this.setHasToken = this.setHasToken.bind(this);
        this.getHasToken = this.getHasToken.bind(this);
        this.removeCookie = this.removeCookie.bind(this);
        console.log(this.state);
    }

// The effect is fired only when cookies has changed.
    // useEffect(() => {
    //     if (this.state.cookies.user && this.state.cookies.user !== 'undefined') {
    //         this.state.hasCookie = true;
    //     }
    //     }, [ this.state.cookies ]);
    
    setHasToken(token){
        if(token != null){
            this.setState(() => {
                return {userToken: Cookies.get('user'),
                    hasToken: true};
            });
        }
        else{
            this.setState(() => {
                return {userToken: null,
                    hasToken: false};
            })
        }
        console.log(this.state);
        // this.state.hasToken = true;
    }

    getHasToken(){
        return this.state.hasToken;
    }

    removeCookie(){
        this.setState(() => {
            return {userToken: null,
                    hasToken: false};
        });
        Cookies.remove('user');
        console.log(this.state);
        console.log(Cookies.get('user'));
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
                {/* <Observer value={this.state.userToken} didUpdate={this.setHasToken} /> */}
                {/* <h1>Login or Join</h1> */}
                <Router>
                {!this.state.hasToken ? <Redirect to="/login" /> : <Redirect to="/main" />}
                {/* <Router> */}
                {/* <Switch> */}
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
                                        getHasToken = {this.getHasToken}
                                    />
                                );
                            }}
                        />
                        <Route
                            exact path="/join"
                            component={Join}
                        />
                        <Route
                            path="/main"
                            render={routerProps => {
                                return (
                                    <Navigation
                                        {...routerProps}
                                        // setHasCookie={setHasCookie}
                                        removeCookie={
                                            this.removeCookie
                                            // setHasCookie();
                                        }
                                    />
                                );
                            }}
                        />
                        <Route exact path="/main" component={Home}/>
                        <Route path="/main/projects" component={Projects}/>
                        <Route path="/main/archive" component={Archive}/>
                        <Route path="/main/helpful" component={Helpful}/>
                        <Route path="/main/famehall" component={Famehall}/>
                        <Route path='/main/gallery' component={Gallery}/>
                {/* </Switch> */}
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
