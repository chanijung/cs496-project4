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
        // console.log(this.props.pagecontent);
        
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
                                {pageContent}
                            </div>
                        </div>
                    </div>
                </div>
        );
    }
}
export default FamehallContent