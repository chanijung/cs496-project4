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
            pagecontent: [],
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
                    a.datas.push(<li> <Link className="famehalls" key={i} to={url}>
                    {a.famehalls[i].year}    {a.famehalls[i].projectName}</Link></li>);
                    i = i + 1;
                }
                a.pagecontent = a.datas;
                b.setState(()=>{
                    return {
                        done:true
                    }
                })
                // console.log(a.pagecontent);
            })
            .catch(function(err){
                console.log(err);
            })
            .then(function(){

            });
    }

    // OnPageChange(){
    //     console.log("___________________");
    //     var recent_path = window.location.href;
    //     recent_path = recent_path.substring(21);
    //     var order = 1;
    //     if(recent_path.substring(15) != ""){
    //         order *= recent_path.substring(15);
    //         console.log(this.state.famehalls);
    //         this.state.pagetitle = this.state.famehalls[order].projectName;
    //         this.state.pagecontent = this.state.famehalls[order].gitUrl;
    //     }
    // }

    render(){
        let content = null;
        var recent = window.location.href;
        console.log("href: ",window.location.href)
        const apiIndex = recent.indexOf("/famehall");
        const uri = recent.substring(apiIndex);
        console.log("substring: ",uri);
        if(uri.length === 9){
            content = <FamehallContent pagetitle="명예의 전당" pagecontent={this.state.datas}></FamehallContent>
        }
        else{
            var order = 1 * uri.substring(10);
            console.log(order);
            var url = 'https://' + ((this.state.famehalls[order]).gitUrl);
            content = <FamehallContent pagetitle={(this.state.famehalls[order]).projectName} 
                            pagecontent={<Link href="" onClick={()=>window.open(url, '_blank')}>{(this.state.famehalls[order]).gitUrl}</Link>}></FamehallContent>
        }
        return(
            <div className="Archive">
                {/* <Observer value={window.location.href} didUpdate={this.OnPageChange}></Observer> */}
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
