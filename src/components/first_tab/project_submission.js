import React, {Component} from "react";
import './projects.css'

class ProjectSubmission extends Component{
    constructor(props){
        super(props);
    }

    render(){
        console.log("render project submission");
        return (
            <div className="main-block">
                <div className="content">
                    프로젝트 리스트
                </div>
                <form
                    onSubmit={this.handleSubmit}
                >
                    <input
                        type="text"
                        name="member1"
                        value={this.member1}
                        onChange={this.handleInputChange}
                        placeholder="Member 1"
                    />
                    <input
                        type="text"
                        name="member2"
                        value={this.member2}
                        onChange={this.handleInputChange}
                        placeholder="Member 2"
                    />
                    <input
                        type="text"
                        name="projectName"
                        value={this.projectName}
                        onChange={this.handleInputChange}
                        placeholder="Project Name"
                    />
                    <input
                        type="text"
                        name="gitUrl"
                        value={this.gitUrl}
                        onChange={this.handleInputChange}
                        placeholder="Github URL"
                    />
                    <input
                        type="text"
                        name="detail"
                        value={this.detail}
                        onChange={this.handleInputChange}
                        placeholder="Detail Explanations"
                    />
                    <button
                        type="submit"
                    >
                        제출
                    </button>
                </form>
            </div>
        );
    } 
}

export default ProjectSubmission