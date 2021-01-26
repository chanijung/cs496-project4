import React, { Component, useState } from "react";
import {BrowserRouter as Router,Link} from "react-router-dom";
import axios from 'axios';
import './famehall.css'

var famehalls = [];

class Famehall extends Component{
    constructor(props){
        super(props);
        famehalls = [];
    }

    componentDidMount(){
        var a = this.state;
        axios.get('/famehalls/all')
            .then(function(response){
                // this.state.famehalls.push(response.data);
                famehalls.push(response.data);
                console.log(famehalls);
            })
            .catch(function(err){
                console.log(err);
            })
            .then(function(){

            });
    }

    render(){
        var datas = [];
        var i = 0;
        while(i < famehalls.length){
            datas.push(<a className="famehalls">
                {famehalls.find(i).team}
                {/* {famehalls.get(i).projectName}
                {famehalls.get(i).gitUrl}
                {famehalls.get(i).year} */}
            </a>)
            i = i + 1;
        }
        return(
            <div className="Archive">
                <div className="site-content">
                    <div className="page-header">
                        <h1 className="page-title">
                            명예의 전당
                        </h1>
                        {/* <u1 className="breadcrumb">
                            홈 > 강의자료(이런거)
                        </u1> */}
                    </div>
                    <div className="page-content">
                        <div className="main-block">
                            <div className="content">
                                {datas}
                            </div>
                        </div>
                    </div>
                </div>

                <aside className="sidebar">
                    <h2 className="sidebar_name">
                        아카이브
                    </h2>
                    <div className="sidebar_region">
                        <div className="block-menu-block">
                            <div className="content">
                                <div className="menu-block-wrapper">
                                    <ul className="menu">
                                        <li className="firstleaf">
                                            <Link to="/main/archive">
                                                강의 자료
                                            </Link>
                                        </li>
                                        <li className="second leaf">
                                            <Link to="/main/helpful">
                                                팁/사이트
                                            </Link>
                                        </li>
                                        <li className="third leaf">
                                            <Link to="/main/famehall">
                                                명예의 전당
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
        );
    }
}
export default Famehall;
