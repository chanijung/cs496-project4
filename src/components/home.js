import React, {Component, useState} from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import { withCookies, useCookies } from 'react-cookie';
import main from './home_main.png'
import Login from './Login';
import Join from './Join';
import './home.css';


class Home extends Component{
    render(){
        return(
            <div className="Home">
               <section className="HomeFirst">
                    <img src={main}
                        height="914px">
                    </img>
                </section>
            </div>
        );
    }
}

export default withCookies(Home);
