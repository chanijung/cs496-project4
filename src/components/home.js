import React, {Component, useState} from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import { withCookies, useCookies } from 'react-cookie';
import Login from './Login';
import Join from './Join';
import '../App.css';


class Home extends Component{
    render(){
        return(
            <div className="First">
                Home
            </div>
        );
    }
}

export default withCookies(Home);
