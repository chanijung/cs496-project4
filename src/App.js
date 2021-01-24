// eslint-disable
import React, {useState, setState, useEffect} from 'react';
import {BrowserRouter as Router,Link} from "react-router-dom";
import { Route, Switch, Redirect } from "react-router-dom";
import { withCookies, useCookies } from 'react-cookie';
import Navigation from './components/nav';
import First from './components/first_tab/first';
import Home from './components/home';
import Archive from './components/second_tab/archive'
import Famehall from './components/second_tab/famehall'
import Helpful from './components/second_tab/helpful'
import Observer from './components/useEffect';
// import Login from './Login';
import Join from './components/Join';
import './App.css';
import axios from 'axios';
import Cookies from 'js-cookie';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username:null,
            // userToken: Cookies.get('user'),
            // hasToken:false
        };
    }

// The effect is fired only when cookies has changed.
    // useEffect(() => {
    //     if (this.state.cookies.user && this.state.cookies.user !== 'undefined') {
    //         this.state.hasCookie = true;
    //     }
    //     }, [ this.state.cookies ]);
        
    // setHasToken(userToken){
    //     if (userToken && userToken !== 'undefined') {
    //         this.state.hasToken = true;
    //     }
    // }

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
        const {username} = this.state;
        return (
            <Router>
                <Route path="/" component={Navigation}/>
                <Route exact path="/" component={Home}/>
                <Route path="/first" component={First}/>
                <Route path="/archive" component={Archive}/>
                <Route path="/helpful" component={Helpful}/>
                <Route path="/famehall" component={Famehall}/>
                {/* <Route path="/second" component={Home}/> */}
            </Router>
        );
        ;
    }
}

export default App;