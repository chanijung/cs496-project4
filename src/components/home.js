import React, {Component, useState} from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import { withCookies, useCookies } from 'react-cookie';
import main from './home_main.jpg'
import Login from './Login';
import Join from './Join';
import './home.css';


class Home extends Component{
    render(){
        return(
            <div className="First">
               <section className="HomeFirst">
                    <img src={main}
                        height="500px">
                    </img>
                </section>
                <section className="HomeSecond">
                    홈화면내용
                </section>
            </div>
        );
    }
}

export default withCookies(Home);
