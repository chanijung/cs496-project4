import React, { Component, useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import {BrowserRouter as Router,Link} from "react-router-dom";
import CommunityContent from "./community_content"
import Observer from "../useEffect"
import axios from 'axios';
import '../second_tab/famehall.css'

class Community extends Component{
    constructor(props){
        super(props);
        console.log(this.props.userId);
        this.state = {
            communities: [],
            datas: [],
            ids: [],
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
        axios.get('/communities/all')
            .then(function(response){
                // this.state.famehalls.push(response.data);
                var i = 0;
                while(i < response.data.length){
                    var url = "/main/community/" + i;
                    a.communities.push(response.data[i]);
                    var date_info = a.communities[i].date;
                    var type = ""
                    if(a.communities[i].type == 0){
                        type = "자유글"
                    }
                    else if(a.communities[i].type == 1){
                        type = "취업/인턴"
                    }
                    else{
                        type = "창업"
                    }
                    var title_info = "[" + type + "] " + a.communities[i].title; 
                    a.datas.push(
                        <li> <Link className="famehalls" key={i} to={url}>
                                 {title_info}</Link>
                                <br/> 
                                {a.communities[i].writer} {a.communities[i].date}
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

    // handleSubmit(e){
    //     e.preventDefault();

    //     axios({
    //         method: 'post',
    //         url: '/comments/submit',
    //         data:{
    //             writer: this.state.writer,
    //             comment: this.state.comment,
    //             community_id: this.state.community_id
    //         }
    //     })
    //         .then(function(response){
    //             console.log("성공")
    //         })
    //         .catch(function(err){
    //             console.log("실패")
    //         })
    //         .then(function(){

    //         });
    // }

    // handleInputChange(event){
    //     const target = event.target;
    //     const value = target.value;
    //     const name = target.name;

    //     this.setState({
    //         [name]: value
    //     });
    // }



    render(){
        let content = null;
        var recent = window.location.href;
        console.log("href: ",window.location.href)
        const apiIndex = recent.indexOf("/community");
        const uri = recent.substring(apiIndex);
        console.log("substring: ",uri);
        if(uri.length === 10){
            content = <CommunityContent pagetitle="모아보기" pagecontent={this.state.datas} ismain={true} status={uri}></CommunityContent>
        }
        else if(this.state.communities.length != 0){
            var order = 1 * uri.substring(11);
            console.log(order);
            var data = (this.state.communities[order]);
            this.state.community_id = this.state.communities[order]._id;
            content = <CommunityContent pagetitle={data.title} pagecontent={data} ismain={false} community_id={this.state.communities[order]._id}
                                        writer={this.state.writer} status={uri}></CommunityContent>
        }
        return(
            <div className="Archive">
                {content}
                <aside className="sidebar">
                    <h2 className="sidebar_name">
                        <Link to="/main/community">
                        커뮤니티
                        </Link>
                    </h2>
                    <div className="sidebar_region">
                        <div className="block-menu-block">
                            <div className="content">
                                <div className="menu-block-wrapper">
                                    <ul className="menu">
                                        <li className="leaf">
                                            <Link to="/main/bulletinboard">
                                                자유게시판
                                            </Link>
                                        </li>
                                        <li className="leaf">
                                            <Link to="/main/employment">
                                                취업/인턴
                                            </Link>
                                        </li>
                                        <li className="leaf">
                                            <Link to="/main/startup">
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
export default Community;
