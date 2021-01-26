import React, {Component, useState, setState} from 'react';
import {BrowserRouter as Router,Link} from "react-router-dom";
import { withCookies } from 'react-cookie';
import './projects.css';
import Cookies from 'js-cookie';
import ProjectsContent from "./projects_content";
import ProjectSubmission from "./project_submission";


class Project extends Component{
    constructor(props){
        super(props);
        this.state = {
            //For submitting project
            member1: '',
            member2: '',
            projectName: '',
            gitUrl: '',
            detail: '',

            //For displaying project submissions
            projects : [],
            summaries: [],
            pagetitle: "프로젝트",
            pagecontent: [],

            done:false
          };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.displayProjects = this.displayProjects.bind(this);
        this.displayAPI = this.displayAPI.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    async testAPI(project){
        
        return fetch('/projects/submit', {
            credentials:'same-origin', //or 'include'
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project)
        }).then(response => response.json());

    };

    async handleSubmit (e) {
        e.preventDefault();
        
        try {
            const response = await this.testAPI({
                team: [this.state.member1, this.state.member2],
                projectName: this.state.projectName,
                gitUrl: this.state.gitUrl,
                detail: this.state.detail
            });

            if (response.result === 'ok') {
                alert('test post 성공');
            } else {
                throw new Error(response.error);
            }
        } catch (err) {
            alert('test post error');
            console.error('test post error', err);
        }
    };

    async displayAPI(){
        return fetch('/projects/all')
        .then(response => response.json());
        // .then(async function(response){
        //     // this.state.projects.push(response.data);
        //     console.log("on projects/all response")
        //     var i = 0;
        //     var projectsData = await response.json().projects;
        //     console.log(projectsData);
        //     // projectsData.map((myData) => {
        //     //     console.log("data: ",myData);
        //     //     var url = "/main/projects/" + i;
        //     //     a.projects.push(response.data[i]);
        //     //     a.summaries.push(<li> <Link className="projects" key={i} to={url}>
        //     //     {a.projects[i].projectName}    {a.projects[i].member1} {a.projects[i].member2}</Link></li>);
        //     //     });
        //     while(i < projectsData.length){
        //         console.log(i,"th data: ",projectsData[i]);
        //         var url = "/main/projects/" + i;
        //         a.projects.push(projectsData[i]);
        //         a.summaries.push(<li> <Link className="projects" key={i} to={url}>
        //         {a.projects[i].projectName}    {a.projects[i].member1} {a.projects[i].member2}</Link></li>);
        //         i = i + 1;
        //     }
        //     a.pagecontent = a.summaries;
        //     console.log("projects received: ", a.projects);
        // })
        // .catch(function(err){
        //     console.log("get projects/all error")
        //     console.log(err);
        // })
    }
    
    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
        // console.log("name: ", name, "/ value: ", value);
        // console.log(this.state);
    }

    async displayProjects(){
        try {
            const response = await this.displayAPI();
            console.log("after executing displayAPI");
            if (response.result === 'ok') {
                console.log("get projects/all succeeded");

                // .then(async function(response){
                    // this.state.projects.push(response.data);
                    // console.log("on projects/all response")
                    var b = this;  
                    var a = this.state;  
                    var i = 0;
                    var projectsData = response.projects;
                    console.log("projectsData: ",projectsData);
                    // projectsData.map((myData) => {
                    //     console.log("data: ",myData);
                    //     var url = "/main/projects/" + i;
                    //     a.projects.push(response.data[i]);
                    //     a.summaries.push(<li> <Link className="projects" key={i} to={url}>
                    //     {a.projects[i].projectName}    {a.projects[i].member1} {a.projects[i].member2}</Link></li>);
                    //     });
                    while(i < projectsData.length){
                        console.log(i,"th data: ",projectsData[i]);
                        var url = "/main/projects/" + i;
                        a.projects.push(projectsData[i]);
                        a.summaries.push(<li> <Link className="projects" key={i} to={url}>
                        {a.projects[i].projectName}    {a.projects[i].member1} {a.projects[i].member2}</Link></li>);
                        i = i + 1;
                    }
                    b.setState(() => {
                        return {
                            done: true
                        }
                    })
                    a.pagecontent = a.summaries;
                    console.log("projects completed: ", a.projects);
            }
        }
        catch (err) {
            console.log("get projects/all failed");
            console.error('login error', err);
        }
    }

    // componentWillMount(){
    //     this._asyncRequest = this.displayProjects().then();
    // }

    // componentWillUnmount(){
    //     if (this._asyncRequest) {
    //         this._asyncRequest.cancel();
    //     }
    // }

    componentDidMount(){
        this.displayProjects();
        // axios.get('/projects/all')
        //     .then(function(response){
        //         // this.state.projects.push(response.data);
        //         var i = 0;
        //         while(i < response.data.length){
        //             var url = "/main/projects/" + i;
        //             a.projects.push(response.data[i]);
        //             a.summaries.push(<li> <Link className="projects" key={i} to={url}>
        //             {a.projects[i].projectName}    {a.projects[i].member1} {a.projects[i].member2}</Link></li>);
        //             i = i + 1;
        //         }
        //         a.pagecontent = a.summaries;
        //     })
        //     .catch(function(err){
        //         console.log(err);
        //     })
        //     .then(function(){

        //     });
    }

    render(){

        console.log("render project.js");

        let content = null;
        var recent = window.location.href;
        recent = recent.substring(21);
        console.log("recent.length: ",recent.length);
        
        if (this.state.summaries.length === 0){
            content = <ProjectsContent pagetitle="Loading..." team={["",""]}></ProjectsContent>
        }
        // while(this.state.summaries.length === 0){
        //     continue;
        // }
        else{
            if(recent.length === 14){
                console.log("length 14")
                console.log("this.state.summaries: ", this.state.summaries);
                content = <div>
                            <ProjectSubmission></ProjectSubmission>
                            <ProjectsContent pagetitle="프로젝트" pagecontent={this.state.summaries} team={["",""]}></ProjectsContent> 
                        </div> //없는 prop도 initialize해줘야 하나?
                console.log("end of lenth 14")
            }
            else{
                console.log("length not 14")
                var order = 1 * recent.substring(15);
                console.log(this.state.projects);
                var url = ((this.state.projects[order]).gitUrl);
                content = <ProjectsContent pagetitle={(this.state.projects[order]).projectName} 
                                            team={(this.state.projects[order]).team}
                                            gitUrl={<Link href="" onClick={() => window.open(url, '_blank')}>{(this.state.projects[order]).gitUrl}</Link>}
                                            detail={(this.state.projects[order]).detail} ></ProjectsContent>
            }
        }

        return(
            <div className="Projects">
                {content}
                <aside className="sidebar">
                    <h2 className="sidebar_name">
                        분반 커뮤니티
                    </h2>
                    <div className="sidebar_region">
                        <div className="block-menu-block">
                            <div className="content">
                                <div className="menu-block-wrapper">
                                    <ul className="menu">
                                        <li className="firstleaf">
                                            <Link to="/main/projects">
                                                프로젝트 제출
                                            </Link>
                                        </li>
                                        <li className="second leaf">
                                            {/* <Link to="/main/helpful"> */}
                                                자리 정하기
                                            {/* </Link> */}
                                        </li>
                                        <li className="third leaf">
                                            {/* <Link to="/main/famehall"> */}
                                                갤러리
                                            {/* </Link> */}
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

export default withCookies(Project);
// export default First;
