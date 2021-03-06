import React, {Component, useState, setState} from 'react';
import {BrowserRouter as Router,Link} from "react-router-dom";
import { withCookies } from 'react-cookie';
import './projects.css';
import Cookies from 'js-cookie';
import ProjectsContent from "./projects_content";
import ProgressBar from "./progressBar";


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

            projectCount: 0,

            vote:[]
          };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.displayProjects = this.displayProjects.bind(this);
        this.displayAPI = this.displayAPI.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.handleVoteChange = this.handleVoteChange.bind(this);
        this.submitVote = this.submitVote.bind(this);
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
        console.log("handlesubmit")
        e.preventDefault();
        this.setState({done: false})
        try {
            const response = await this.submitAPI({
                team: [this.state.member1, this.state.member2],
                projectName: this.state.projectName,
                gitUrl: this.state.gitUrl,
                detail: this.state.detail,
                votes: 0
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
                    detail: this.state.detail,
                }
                this.state.projects.push(project);
                console.log("mem1: ", this.state.member1)
                console.log("mem2: ", this.state.member2);
                // this.state.summaries.push(<li> <Link className="projects" key={this.state.projectCount} to={"/main/projects/" + this.state.projectCount}>
                // {this.state.projectName}    {this.state.member1} {this.state.member2}</Link></li>);
                // this.state.summaries.push(<ProjectListItem projectCount={this.state.projectCount} projectName={this.state.projectName} member1={this.state.member1} member2={this.state.member2}></ProjectListItem>);
                this.state.summaries.push(
                    <li className="project_summary">
                        <div className="project-info">
                        <Link className="project_name" key={this.state.projectCount} to={"/main/projects/" + this.state.projectCount}>{this.state.projectName}</Link>
                        <div className="member">{this.state.member1}, {this.state.member2}</div>
<<<<<<< HEAD
                        </div>
                        {/* <div className="member">{this.state.member2}</div> */}
                        <input className="vote-box"
=======
                        {/* <div className="member">{this.state.member2}</div> */}
                        <input
>>>>>>> 68bbf4abec4beeadf35089c21e90d1c0e2ac61da
                            name={this.state.gitUrl}
                            type="checkbox"
                            onChange={this.handleVoteChange} />
                        <ProgressBar bgcolor="#6a1b9a" completed={0} />
                    </li>
                )
                console.log("handlesubmit summaires: ", this.state.summaries);
                this.state.projectCount += 1;
                console.log("before setstate in handle submit: ", this.state.done);
                this.setState({done: true})
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

    handleVoteChange(event){
        // console.log("vote before: ", this.state.vote);
        const target = event.target;
        const value = target.value;
        const gitUrl = target.name;
        const checked = target.checked;
        // console.log("checked: ", checked);
        if (checked){
            this.state.vote.push(gitUrl);   
            console.log("pushed into vote: ", this.state.vote); 
        }
        else{
            const index = this.state.vote.indexOf(gitUrl);
            if (index > -1) {
              this.state.vote.splice(index, 1);
            }
        }
        // console.log("vote after: ", this.state.vote);
        
    }

    async submitVote(){
        //Send voting to server
        var gitUrl;
        for (var i=0; i<this.state.vote.length; i++){
            console.log()
            gitUrl = this.state.vote[i];
            try{
                const response = await fetch('/projects/vote', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({gitUrl: gitUrl})
                }).then(response => response.json());

                if (response.result === 'ok'){
                    console.log("post vote success");
                    this.displayProjects();
                }
                else{console.log("post vote fail")}
            }
            catch (err) {
                console.log("post vote error")
            }
        }
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
                    a.projects = [];
                    a.summaries = [];
                    a.projectCount = 0;
                    while(i < projectsData.length){
                        console.log(i,"th data: ",projectsData[i]);
                        var url = "/main/projects/" + i;
                        a.projects.push(projectsData[i]);
                        // a.summaries.push(<li> <Link className="projects" key={i} to={url}>
                        // {projectsData[i].projectName}    {projectsData[i].team[0]} {projectsData[i].team[1]}</Link></li>);
                        // a.summaries.push(<ProjectListItem projectCount={i} projectName={projectsData[i].projectName} member1={projectsData[i].team[0]} member2={projectsData[i].team[1]}></ProjectListItem>)
                        this.state.summaries.push(
<<<<<<< HEAD
                            <li className="project_summary">
                                <div className="project-info">
                                    <Link className="project_name" key={i} to={"/main/projects/" + i}>{projectsData[i].projectName}</Link>
                                    <div className="member">{projectsData[i].team[0]}, {projectsData[i].team[1]}</div>
                                </div>
                                {/* <div className="member">{projectsData[i].team[1]}</div> */}
                                <input className="vote-box"
=======
                            <li project_summary>
                                <Link className="project_name" key={i} to={"/main/projects/" + i}>{projectsData[i].projectName}</Link>
                                <div className="member">{projectsData[i].team[0]}, {projectsData[i].team[1]}</div>
                                {/* <div className="member">{projectsData[i].team[1]}</div> */}
                                <input
>>>>>>> 68bbf4abec4beeadf35089c21e90d1c0e2ac61da
                                    name={projectsData[i].gitUrl}
                                    type="checkbox"
                                    onChange={this.handleVoteChange} />
                                <ProgressBar bgcolor="#6a1b9a" completed={projectsData[i].votes} />
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
                {/* <div className="subtitle"> */}
                {/* </div> */}
                <form className="submit_form" onSubmit={this.handleSubmit}>
                        <div className="item">
                        팀원
                            <div className="input_box">
                                <input
                                    style={{width:"20%"}}
                                    type="text"
                                    name="member1"
                                    // value={this.member1}
                                    onChange={(e)=>{this.state.member1 = e.target.value}}
                                />
                                <input
                                    style={{width:"20%"}}
                                    type="text"
                                    name="member2"
                                    // value={this.member2}
                                    onChange={(e)=>{this.state.member2 = e.target.value}}
                                />
                            </div>
                        </div>
                        프로젝트 이름
                        <div className="input_box">
                            <input
                                style={{width:"40%"}}
                                type="text"
                                name="projectName"
                                // value={this.projectName}
                                onChange={(e)=>{this.state.projectName = e.target.value}}
                            />
                        </div>
                        Github 주소
                        <div className="input_box">
                            <input
                                style={{width:"40%"}}
                                type="text"
                                name="gitUrl"
                                // value={this.gitUrl}
                                onChange={(e)=>{this.state.gitUrl = e.target.value}}
                            />
                        </div>
                        설명
                        <div className="input_box">
                            <input
                                style={{width:"40%"}}
                                type="text"
                                name="detail"
                                // value={this.detail}
                                onChange={(e)=>{this.state.detail = e.target.value}}
                            />
                        </div>
                        {/* <textarea className="input_box"
                            name="detail"
                            onChange={(e)=>{this.state.detail = e.target.value}}
                            rows={5}
                            cols={5}
                        /> */}
                        <button className="submit" type="submit">
                            프로젝트 제출하기
                        </button>
                </form>
                

            </div>
        
        // if (this.state.summaries.length === 0){
        if (this.state.done === false){
            content = <ProjectsContent pagetitle="프로젝트"></ProjectsContent>
        }
        else{
            const apiIndex = recent.indexOf("/projects");
            const uri = recent.substring(apiIndex);
            if(uri.length === 9){
                content = <div>
                            {/* <div>
                                {projectSubmission}
                            </div> */}
                            <ProjectsContent pagetitle="프로젝트" pagecontent={this.state.summaries} done={true} submitVote={this.submitVote} projectSubmission={projectSubmission} vote_submit={true}></ProjectsContent> 
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
                                            done={true}
                                            vote_submit={false}></ProjectsContent>
            }
        }

        return(
            <div className="wrapper">
                <div className="Projects">
                    <div>
                    {content}
                    </div>
                    
                    <aside className="sidebar">
                        <h2 className="sidebar_name">
                            <div className="sidebarname">
                                분반 커뮤니티
                            </div>
                        </h2>
                            <ul className="menu">
<<<<<<< HEAD
                                <li >
                                    <Link className="leaf" to="/main/projects">
=======
                                <li className="leaf">
                                    <Link to="/main/projects">
>>>>>>> 68bbf4abec4beeadf35089c21e90d1c0e2ac61da
                                        프로젝트
                                    </Link>
                                </li>
                                <li>
                                    <Link className="leaf" to="/main/gallery">
                                        갤러리
                                    </Link>
                                </li>
                            </ul>
                    </aside>
            </div>
            </div>
        );
    }
}

export default withCookies(Project);
