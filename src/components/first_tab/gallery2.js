import React, {Component, useState, setState} from 'react';
import {BrowserRouter as Router,Link} from "react-router-dom";
import { withCookies } from 'react-cookie';
import './gallery.css';
import Cookies from 'js-cookie';
import ImageUploader from "react-images-upload";
 

class Gallery extends Component{
    constructor(props){
        super(props);
        this.state={
            pictures:[],
            // img:null
        }
        // this.onClick = this.onClick.bind(this);
        this.onDrop=this.onDrop.bind(this)
    }

    onDrop(pictureFiles, pictureDataURLs) {
        this.setState({
          pictures: this.state.pictures.concat(pictureFiles)
        });
    }

    // onChange(e){
    //     this.state.img = e.target.files[0];
    // }
    
    // onClick(){
    //     const formData = new FormData();
    //     formData.append('file', this.state.img);
    //     // 서버의 upload API 호출
    //     const res = await axios.post("/gallery/upload", formData);
    //     console.log(res);
    // }


    render(){
        return(
            <div className="Gallery">
            <ImageUploader
                withIcon={true}
                buttonText="Choose images"
                onChange={this.onDrop}
                imgExtension={[".jpg", ".gif", ".png", ".gif"]}
                maxFileSize={5242880}
                withPreview={true}
            />
                {/* <div>
                    <input type="img" onChange={onChange}/>
                    <button onClick={onClick}>제출</button>
                </div> */}
                
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
                                            <Link to="/main/gallery">
                                                갤러리
                                            </Link>
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

export default withCookies(Gallery);