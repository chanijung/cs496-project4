import React, { Component, useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import {BrowserRouter as Router,Link} from "react-router-dom";
import FamehallContent from "./famehall_content"
import Observer from "../useEffect"
import axios from 'axios';
import './famehall.css'

var famehalls = [];

class Famehall extends Component{
    constructor(props){
        super(props);
        this.state = {
            famehalls:[],
            datas: [],
            pagetitle: "명예의 전당",
            done: false
        }
        this.componentDidMount = this.componentDidMount.bind(this);
        // this.OnPageChange = this.OnPageChange.bind(this);
        // famehalls = [];
    }

    componentDidMount(){
        var a = this.state;
        var b = this;
        axios.get('/famehalls/all')
            .then(function(response){
                // this.state.famehalls.push(response.data);
                var i = 0;
                while(i < response.data.length){
                    var url = "/main/famehall/" + i;
                    a.famehalls.push(response.data[i]);
                    var week_info = a.famehalls[i].year;
                    if(week_info[4] == "w"){
                        week_info = week_info.substring(0,4) + "년 겨울학기 " + week_info.substring(6) + "주차"
                    }
                    else{
                        week_info = week_info.substring(0,4) + "년 여름학기 " + week_info.substring(6) + "주차"
                    }
                    a.datas.push(<li> <Link className="famehalls" key={i} to={url}>
                    {week_info}    {a.famehalls[i].projectName}</Link></li>);
                    i = i + 1;
                }
                b.setState(()=>{
                    return {
                        done:true
                    }
                })
            })
            .catch(function(err){
                console.log(err);
            })
            .then(function(){

            });
    }

    render(){
        let content = null;
        var recent = window.location.href;
        console.log("href: ",window.location.href)
        const apiIndex = recent.indexOf("/famehall");
        const uri = recent.substring(apiIndex);
        console.log("substring: ",uri);
        if(uri.length === 9){
            content = <FamehallContent pagetitle="명예의 전당" pagecontent={this.state.datas} teamname={['왜안되지']}></FamehallContent>
        }
        else{
            var order = 1 * uri.substring(10);
            console.log(order);
            var url = ((this.state.famehalls[order]).gitUrl);
            content = <FamehallContent pagetitle={(this.state.famehalls[order]).projectName} 
                            pagecontent={<Link href="" onClick={()=>window.open(url, '_blank')}>{this.state.famehalls[order].gitUrl}</Link>}
                            teamname={(this.state.famehalls[order]).team}></FamehallContent>
        }
        return(
            <div className="Archive">
                {content}
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
