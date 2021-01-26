import React, {Component} from "react";
import './projects.css'

class ProjectsContent extends Component{
    constructor(props){
        super(props);
    }

    render(){
        var pageTitle = this.props.pagetitle;
        var pageContent = this.props.pagecontent;
        var member1 = this.props.member1;
        var member2 = this.props.member2;
        var gitUrl = this.props.gitUrl;
        var detail = this.props.detail;
        
        return(
            <div className="site-content">
                    <div className="page-header">
                        <h1 className="page-title">
                            {pageTitle}
                        </h1>
                        {/* <u1 className="breadcrumb">
                            홈 > 강의자료(이런거)
                        </u1> */}
                    </div>
                    <div className="page-content">
                        <div className="main-block">
                            <div className="pageContent">
                                {pageContent}
                            </div>
                            <div className="member1">
                                {member1}
                            </div>
                            <div className="member2">
                                {member2}
                            </div>
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