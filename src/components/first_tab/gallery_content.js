import React, {Component} from "react";
import './gallery.css';

class GalleryContent extends Component{
    constructor(props){
        super(props);
        // this.state={
            // done:this.props.done
        // }
    }

    render(){
        console.log("GalleryContent render")
        var pageTitle = this.props.pagetitle;
        var pageContent = this.props.pagecontent;
        var uploadImages = this.props.uploadImages;
        var renderGallery = this.props.renderGallery;
        
        // var member1 = this.props.member1;
        // var member2 = this.props.member2;
        // var gitUrl = this.props.gitUrl;
        // var detail = this.props.detail;
        // var submitVote = this.props.submitVote;

        console.log("pageContent in gallery_content.js: ", pageContent);
        const uploadButton = this.props.uploadButton ? <button onClick={uploadImages}>업로드</button> : <div></div>
        
        return(
            <div className="site-content">
                    <div className="page-header">
                        <h1 className="page-title">
                            {pageTitle}
                        </h1>
                    </div>
                    <div className="page-content">
                        {/* <button className="vote_submit" onClick={submitVote}>투표</button> */}
                        <div className="main-block">
                            <div className="pageContent">
                                {pageContent}
                                {uploadButton}
                                {renderGallery()}
                            </div>
                            {/* <div className="member1">
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
                            </div> */}
                        </div>
                    </div>
            </div>
        );
    }
}
export default GalleryContent