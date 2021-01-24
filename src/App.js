// eslint-disable
import React, {useState, setState, useEffect} from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import { withCookies, useCookies } from 'react-cookie';
import Navigation from './components/nav';
import First from './components/first';
import Home from './components/home';
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
            mode:'home',
            userToken: Cookies.get('user'),
            hasToken:false
        };
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
        var content;
        if(this.state.mode === 'home'){
            console.log("home");
            content = <Home />;
        }
        else if(this.state.mode === 'first'){
            console.log("first");
            content = <First />;
        }
        const {username} = this.state;
        return (
            <div className="App">
                <Navigation onChangePage={function(new_mode){
                    this.setState({mode: new_mode});
                    }.bind(this)}/>
                {content}
                <Observer value={this.state.userToken} didUpdate={this.setHasToken} />
            </div>
        );
        ;
    }
}

export default App;
