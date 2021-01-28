import React, { Component, useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import {BrowserRouter as Router,Link} from "react-router-dom";
import CommunityContent from "./community_content"
import Observer from "../useEffect"
import axios from 'axios';
import '../second_tab/famehall.css'

class Bulletinboard extends Component{
    constructor(props){
        super(props);
        this.state = {
            communities: [],
            datas: [],
            pagecontent: [],
            done: false,

            writer: '',
            comment: '',
            community_id: '',
            update: false
        }
        this.componentDidMount = this.componentDidMount.bind(this);
        // this.OnPageChange = this.OnPageChange.bind(this);
        // famehalls = [];
    }

    componentDidMount(){
        var a = this.state;
        var b = this;
        axios.get('/communities/bulletin', {
            params: {
                type: 0
            }
        })
            .then(function(response){
                // this.state.famehalls.push(response.data);
                var i = 0;
                while(i < response.data.length){
                    var url = "/main/bulletinboard/" + i;
                    a.communities.push(response.data[i]);
                    var date_info = a.communities[i].date;
                    var f_date = date_info.substring(0,10);
                    var s_date = date_info.substring(11,19);
                    date_info = f_date + " " +  s_date;
                    var title_info = "[자유글] " + a.communities[i].title; 
                    a.datas.push(
                        <li> <Link className="famehalls" key={i} to={url}>
                                 {title_info}</Link>
                                 <div className="date_info">
                                    <div className="date_com"> {date_info}</div>
                                </div>
                                </li>);
                    i = i + 1;
                }
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
            axios.get('/users/id', {
                params: {
                    id: this.props.userId
                }
            })
                .then(function(response){
                    b.setState(()=>{
                        return{
                            writer: response.data.name
                        }
                    })
                    
                })
    }

    render(){
        let content = null;
        var recent = window.location.href;
        console.log("href: ",window.location.href)
        const apiIndex = recent.indexOf("/bulletinboard");
        const uri = recent.substring(apiIndex);
        console.log("substring: ",uri);
        if(uri.length === 14){
            content = <CommunityContent pagetitle="자유게시판" pagecontent={this.state.datas} ismain={true} status={uri}></CommunityContent>
        }
        else{
            var order = 1 * uri.substring(15);
            console.log(order);
            var data = (this.state.communities[order]);
            content = <CommunityContent pagetitle={data.title} pagecontent={data} ismain={false} community_id={this.state.communities[order]._id}
                                        writer={this.state.writer} status={uri}></CommunityContent>
        }
        return(
            <div className="Archive">
                {content}
                <aside className="sidebar">
                    <h2 className="sidebar_name">
                        <Link className="sidebarname" to="/main/community">
                        커뮤니티
                        </Link>
                    </h2>
                    <div className="sidebar_region">
                        <div className="block-menu-block">
                            <div className="content">
                                <div className="menu-block-wrapper">
                                    <ul className="menu">
                                        <li >
                                            <Link className="leaf" to="/main/bulletinboard">
                                                자유게시판
                                            </Link>
                                        </li>
                                        <li>
                                            <Link className="leaf" to="/main/employment">
                                                취업/인턴
                                            </Link>
                                        </li>
                                        <li>
                                            <Link className="leaf" to="/main/startup">
                                                창업
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
export default Bulletinboard;
