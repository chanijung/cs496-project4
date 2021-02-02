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
                            teamname={(this.state.famehalls[order]).team}
                            content={this.state.famehalls[order].data}></FamehallContent>
        }
        return(
            <div className="Archive">
                {content}
            </div>
        );
    }
}
export default Famehall;
