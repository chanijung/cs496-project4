import React, { Component } from "react";
import axios from 'axios';
import './famehall.css'

class Famehall extends Component{

    componentDidMount(){
        axios.get('/archive')
            .then(function(response){
                console.log(response);
            })
            .catch(function(err){
                console.log(err);
            })
            .then(function(){

            });
    }

    render(){
        var famehalls = [];
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
                                명예의 전당 리스트
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
                                            <a href="/archive">
                                                강의 자료
                                            </a>
                                        </li>
                                        <li className="second leaf">
                                            <a href="/helpful">
                                                팁/사이트
                                            </a>
                                        </li>
                                        <li className="third leaf">
                                            <a href="/famehall">
                                                명예의 전당
                                            </a>
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
