import React, {Component, useState, setState} from 'react';
import {BrowserRouter as Router,Link} from "react-router-dom";
import { withCookies } from 'react-cookie';
import './projects.css';
import Cookies from 'js-cookie';
import ProjectsContent from "./projects_content";
import ProjectListItem from "./project_list_item";


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

            done:false,

            projectCount: 0
          };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.displayProjects = this.displayProjects.bind(this);
        this.displayAPI = this.displayAPI.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }


    async submitAPI(project){
        
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
            const response = await this.submitAPI({
                team: [this.state.member1, this.state.member2],
                projectName: this.state.projectName,
                gitUrl: this.state.gitUrl,
                detail: this.state.detail
            });

            if (response.result === 'ok') {
                alert('test post 성공');
                var project = {
                    semester: this.state.semester,
                    classNum: this.state.classNum,
                    member1: this.state.member1,
                    member2: this.state.member2,
                    projectName: this.state.projectName,
                    gitUrl: this.state.gitUrl,
                    detail: this.state.detail
                }
                this.state.projects.push(project);
                console.log("mem1: ", this.state.member1)
                console.log("mem2: ", this.state.member2);
                // this.state.summaries.push(<li> <Link className="projects" key={this.state.projectCount} to={"/main/projects/" + this.state.projectCount}>
                // {this.state.projectName}    {this.state.member1} {this.state.member2}</Link></li>);
                // this.state.summaries.push(<ProjectListItem projectCount={this.state.projectCount} projectName={this.state.projectName} member1={this.state.member1} member2={this.state.member2}></ProjectListItem>);
                this.state.summaries.push(
                    <li>
                        <Link className="project_item" key={this.state.projectCount} to={"/main/projects/" + this.state.projectCount}>{this.state.projectName}</Link>
                        <div>{this.state.member1}</div>
                        <div>{this.state.member2}</div>
                    </li>
                )
                console.log("handlesubmit summaires: ", this.state.summaries);
                this.state.projectCount += 1;
                console.log("before setstate in handle submit: ", this.state.done);
                this.setState({done: false})
                console.log("after setstate in handle submit: ", this.state.done);
            } else {
                alert('test post 실패');
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
    }
    
    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
    }

    async displayProjects(){
        try {
            console.log("displayprojects start")
            const response = await this.displayAPI();
            // console.log("after executing displayAPI");
            if (response.result === 'ok') {
                console.log("get projects/all succeeded");

                    var b = this;  
                    var a = this.state;  
                    var i = 0;
                    var projectsData = response.projects;
                    while(i < projectsData.length){
                        console.log(i,"th data: ",projectsData[i]);
                        var url = "/main/projects/" + i;
                        a.projects.push(projectsData[i]);
                        // a.summaries.push(<li> <Link className="projects" key={i} to={url}>
                        // {projectsData[i].projectName}    {projectsData[i].team[0]} {projectsData[i].team[1]}</Link></li>);
                        // a.summaries.push(<ProjectListItem projectCount={i} projectName={projectsData[i].projectName} member1={projectsData[i].team[0]} member2={projectsData[i].team[1]}></ProjectListItem>)
                        this.state.summaries.push(
                            <li>
                                <Link className="project_item" key={i} to={"/main/projects/" + i}>{projectsData[i].projectName}</Link>
                                <div>{projectsData[i].team[0]}</div>
                                <div>{projectsData[i].team[1]}</div>
                            </li>
                        )
                        console.log("summaries in displayprojects: ", a.summaries);
                        i = i + 1;
                    }
                    a.projectCount = i;
                    a.pagecontent = a.summaries;
                    console.log("before setstate",this.state.done)
                    this.setState({done: true})
                    // this.setState(() => {
                    //     return {
                    //         done: true
                    //     }
                    // })
                    console.log("after setstate",this.state.done)
                    console.log("pagecontent = summaries = ", a.pagecontent);
                    console.log("projects completed: ", a.projects);
            }
        }
        catch (err) {
            console.log("get projects/all failed");
            console.error('login error', err);
        }
    }



    componentDidMount(){
        this.displayProjects();
    }

    render(){

        console.log("render project.js");

        var content;
        var recent = window.location.href;

        const projectSubmission = 
            <div className="main-block">
                <div className="content">
                </div>
                <form onSubmit={this.handleSubmit}>
                    <input
                        type="text"
                        name="member1"
                        // value={this.member1}
                        onChange={(e)=>{this.state.member1 = e.target.value}}
                        placeholder="Member 1"
                    />
                    <input
                        type="text"
                        name="member2"
                        // value={this.member2}
                        onChange={(e)=>{this.state.member2 = e.target.value}}
                        placeholder="Member 2"
                    />
                    <input
                        type="text"
                        name="projectName"
                        // value={this.projectName}
                        onChange={(e)=>{this.state.projectName = e.target.value}}
                        placeholder="Project Name"
                    />
                    <input
                        type="text"
                        name="gitUrl"
                        // value={this.gitUrl}
                        onChange={(e)=>{this.state.gitUrl = e.target.value}}
                        placeholder="Github URL"
                    />
                    <input
                        type="text"
                        name="detail"
                        // value={this.detail}
                        onChange={(e)=>{this.state.detail = e.target.value}}
                        placeholder="Detail Explanations"
                    />
                    <button
                        type="submit"
                    >
                        제출
                    </button>
                </form>
            </div>
        
        if (this.state.summaries.length === 0){
            content = <ProjectsContent pagetitle="Loading..."></ProjectsContent>
        }
        else{
            const apiIndex = recent.indexOf("/projects");
            const uri = recent.substring(apiIndex);
            if(uri.length === 9){
                content = <div>
                            <div>
                                {projectSubmission}
                            </div>
                            <ProjectsContent pagetitle="프로젝트" pagecontent={this.state.summaries} done={true}></ProjectsContent> 
                        </div> 
                        // summaries 대신 pagecontent?
            }
            else{
                var order = 1 * uri.substring(10);
                console.log(this.state.projects);
                var url = ((this.state.projects[order]).gitUrl);
                content = <ProjectsContent pagetitle={(this.state.projects[order]).projectName} 
                                            member1={(this.state.projects[order]).team[0]}
                                            member2={(this.state.projects[order]).team[1]}
                                            gitUrl={<Link href="" onClick={() => window.open(url, '_blank')}>{(this.state.projects[order]).gitUrl}</Link>}
                                            detail={(this.state.projects[order]).detail} 
                                            done={true}></ProjectsContent>
            }
        }

        return(
            <div className="Projects">
                <div>
                {content}
                </div>
                
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
