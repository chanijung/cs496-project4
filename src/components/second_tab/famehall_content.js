import React, {Component} from "react";
import './famehall.css'

class FamehallContent extends Component{
    constructor(props){
        super(props);
        // console.log(props.pagecontent)
    }

    render(){
        var pageTitle = this.props.pagetitle;
        var pageContent = this.props.pagecontent;
        var teamName = this.props.teamname;
        console.log(teamName.length);
        var teamInfo = <div></div>;
        if(teamName.length !== 1){
            var team = "팀원: " + teamName[0] + ", " + teamName[1];
            teamInfo = <div>{team}</div>;
        }

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
                            <div className="content">
                                {teamInfo}
                                <div>
                                    {pageContent}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        );
    }
}
export default FamehallContent