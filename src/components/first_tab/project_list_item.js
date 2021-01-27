import React, {Component} from "react";
import {BrowserRouter as Link} from "react-router-dom";
import './project_list_item.css';

class ProjectListItem extends Component{
    constructor(props){
        super(props);
    }

    render(){
        var projectName = this.props.projectName;
        var member1 = this.props.member1;
        var member2 = this.props.member2;
        var projectCount = this.props.projectCount;

        console.log("in projectlistitem render")
        console.log(projectName)
        console.log(member1)
        console.log(member2)
        console.log(projectCount)

        return(
            // <li>
            //     <Link className="project_item" key={projectCount} to={"/main/projects/" + projectCount}>{projectName}</Link>
            //     <div>{member1}</div>
            //     <div>{member2}</div>
            // </li>
            <li>
                <Link className="project_item" key={projectCount} to={"/main/projects/" + projectCount}>{projectName}</Link>
                <Link to="/main/projects">hello</Link>
                <div>{member1}</div>
                <div>{member2}</div>
            </li>
        );
    }
}

export default ProjectListItem