import React, {Component} from "react";
import './projects.css';

class ProjectsContent extends Component{
    constructor(props){
        super(props);
        this.state={
            done:this.props.done
        }
    }

    render(){
        console.log("ProjectsContent render")
        var pageTitle = this.props.pagetitle;
        var pageContent = this.props.pagecontent;
        var member1 = this.props.member1;
        var member2 = this.props.member2;
        var gitUrl = this.props.gitUrl;
        var detail = this.props.detail;
        var submitVote = this.props.submitVote;
        var projectSubmission = this.props.projectSubmission;
        var vote_submit = this.props.vote_submit;

        console.log("pageContent in projects_content.js: ", pageContent);
        
        return(
            <div className="site-content">
                    <div className="page-header">
                        <h1 className="page-title">
                            {pageTitle}
                        </h1>
                    </div>
                    <div className="content">
                        <div className="main-block">
                            <div className="pageContent">
                                {projectSubmission}
<<<<<<< HEAD
                                {/* {vote_submit? <button className="vote_submit" onClick={submitVote}>투표</button> : <div></div>} */}
                                <div className="page-content1">
                                    {pageContent}
                                </div>
=======
                                <br/><br/>
>>>>>>> 68bbf4abec4beeadf35089c21e90d1c0e2ac61da
                                {vote_submit? <button className="vote_submit" onClick={submitVote}>투표</button> : <div></div>}
                            </div>
                            <div className="member1">
                                {member1}, {member2}
                            </div>
                            {/* <div className="member2">
                                {member2}
                            </div> */}
                            <div className="gitUrl">
                                {gitUrl}
                            </div>
                            <div className="detail">
                                {detail}
                            </div>
                        </div>
                    </div>
            </div>
        );
    }
}
export default ProjectsContent