import React, {Component, useState, setState} from 'react';
import {BrowserRouter as Router,Link} from "react-router-dom";
import { withCookies } from 'react-cookie';
import './gallery.css';
import Cookies from 'js-cookie';
import ImageUploader from "react-images-upload";
import GalleryContent from './gallery_content';
import PropTypes from 'prop-types';
import FlipMove from 'react-flip-move';
import UploadIcon from './UploadIcon.svg';
 
const styles = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    width: "100%"
  };

const galleryStyle = {
    border:"2px",
    width:"300px",
    height:"auto",
    margin:"10px"
}

const ERROR = {
    NOT_SUPPORTED_EXTENSION: 'NOT_SUPPORTED_EXTENSION',
    FILESIZE_TOO_LARGE: 'FILESIZE_TOO_LARGE'
}

class Gallery extends Component{
    constructor(props){
        super(props);
        this.state = {
            pictures: [...props.defaultImages],
            files: [],
            fileErrors: [],
            gallery: [],
            done:false
          };
        this.inputElement = '';
        this.onDropFile = this.onDropFile.bind(this);
        this.onUploadClick = this.onUploadClick.bind(this);
        this.triggerFileUpload = this.triggerFileUpload.bind(this);
        this.uploadImages = this.uploadImages.bind(this);
        this.renderGallery = this.renderGallery.bind(this);
        this.renderGalleryPictures = this.renderGalleryPictures.bind(this);
    }

    componentDidUpdate(prevProps, prevState, snapshot){
        if(prevState.files !== this.state.files){
          this.props.onChange(this.state.files, this.state.pictures);
        }
      }
    
    /*
    Load image at the beggining if defaultImage prop exists
    */
    componentWillReceiveProps(nextProps){
    if(nextProps.defaultImages !== this.props.defaultImages){
        this.setState({pictures: nextProps.defaultImages});
        console.log("pictures: ",this.state.pictures);
    }
    }

    /*
        Check file extension (onDropFile)
    */
    hasExtension(fileName) {
    const pattern = '(' + this.props.imgExtension.join('|').replace(/\./g, '\\.') + ')$';
    return new RegExp(pattern, 'i').test(fileName);
    }

  /*
   Handle file validation
   */
    onDropFile(e) {
        const files = e.target.files;
        const allFilePromises = [];
        const fileErrors = [];

        // Iterate over all uploaded files
        for (let i = 0; i < files.length; i++) {
            let file = files[i];
            let fileError = {
                name: file.name,
            };
            // Check for file extension
            if (!this.hasExtension(file.name)) {
                fileError = Object.assign(fileError, {
                type: ERROR.NOT_SUPPORTED_EXTENSION
                });
                fileErrors.push(fileError);
                continue;
            }
            // Check for file size
            if(file.size > this.props.maxFileSize) {
                fileError = Object.assign(fileError, {
                type: ERROR.FILESIZE_TOO_LARGE
                });
                fileErrors.push(fileError);
                continue;
            }

            allFilePromises.push(this.readFile(file));
        }

        this.setState({
            fileErrors
        });

        const {singleImage} = this.props;

        Promise.all(allFilePromises).then(newFilesData => {
            const dataURLs = singleImage?[]:this.state.pictures.slice();
            const files = singleImage?[]:this.state.files.slice();

            newFilesData.forEach(newFileData => {
                dataURLs.push(newFileData.dataURL);
                files.push(newFileData.file);
            });

            //Add uploaded files to to pictures and filse state
            this.setState({pictures: dataURLs, files: files});
            console.log("pictures: ",this.state.pictures);
        });
    }

  onUploadClick(e) {
    // Fixes https://github.com/JakeHartnell/react-images-upload/issues/55
    e.target.value = null;
  }

  /*
     Read a file and return a promise that when resolved gives the file itself and the data URL
   */
    readFile(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            // Read the image via FileReader API and save image result in state.
            reader.onload = function (e) {
                // Add the file name to the data URL
                let dataURL = e.target.result;
                dataURL = dataURL.replace(";base64", `;name=${file.name};base64`);
                resolve({file, dataURL});
            };

            reader.readAsDataURL(file);
        });
    }

  /*
   Remove the image from state
   */
    removeImage(picture) {
        const removeIndex = this.state.pictures.findIndex(e => e === picture);
        const filteredPictures = this.state.pictures.filter((e, index) => index !== removeIndex);
        const filteredFiles = this.state.files.filter((e, index) => index !== removeIndex);

        this.setState({pictures: filteredPictures, files: filteredFiles}, () => {
            this.props.onChange(this.state.files, this.state.pictures);
            console.log("pictures: ",this.state.pictures);
        });
        
    }

    /*
    Check if any errors && render
    */
    renderErrors() {
        const { fileErrors } = this.state;
        return fileErrors.map((fileError, index) => {
        return (
            <div className={'errorMessage ' + this.props.errorClass} key={index} style={this.props.errorStyle}>
            * {fileError.name} {fileError.type === ERROR.FILESIZE_TOO_LARGE ? this.props.fileSizeError: this.props.fileTypeError}
            </div>
        );
        });
    }

    /*
    Render the upload icon
    */
    renderIcon() {
        if (this.props.withIcon) {
        return <img src={UploadIcon} className="uploadIcon"	alt="Upload Icon" />;
        }
    }

    /*
    Render label
    */
    renderLabel() {
        if (this.props.withLabel) {
        return <p className={this.props.labelClass} style={this.props.labelStyles}>{this.props.label}</p>
        }
    }

    /*
    Render preview images
    */
    renderPreview() {
        return (
        <div className="uploadPicturesWrapper">
            <FlipMove enterAnimation="fade" leaveAnimation="fade" style={styles}>
            {this.renderPreviewPictures()}
            </FlipMove>
        </div>
        );
    }

    //Return image components of those in 'pictures' state.
    renderPreviewPictures() {
        return this.state.pictures.map((picture, index) => {
            return (
                <div key={index} className="uploadPictureContainer">
                <div className="deleteImage" onClick={() => this.removeImage(picture)}>X</div>
                <img src={picture} className="uploadPicture" alt="preview"/>
                </div>
            );
        });
    }

    /*
    On button click, trigger input file to open
    */
    triggerFileUpload() {
        this.inputElement.click();
    }

    clearPictures() {
        this.setState({pictures: []})
        console.log("pictures: ",this.state.pictures);
    }

    async uploadImages(){
        //post image urls in pictures state

        for (var i=0; i<this.state.pictures.length; i++){
            try {
                console.log("pictures i",this.state.pictures[i]);
                const response = await fetch('/gallery/upload', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({dataUrl: this.state.pictures[i]})
                }).then(response => response.json());
                if (response.result === 'ok'){
                    console.log("post upload success");
                    // this.displayProjects();
                }
                else{console.log("post upload fail")}
            }
            catch (err) {
                console.log("post upload error")
            }
        }
        this.displayImages();
    }

    //Add Image documnets to 'gallery' state.
    async displayImages(){
        try {
            console.log("displayImages start")
            const response = await fetch('/gallery/all').then(response => response.json());

            if (response.result === 'ok') {
                console.log("get gallery/all succeeded");
                this.state.gallery = [];
                var galleryData = response.images;
                var i=0;
                while (i<galleryData.length){
                    console.log(i,"th data: ",galleryData[i]);
                    this.state.gallery.push(galleryData[i]);
                    console.log("this.state.gallery: ", this.state.gallery);
                    i = i+1;
                }
                this.setState({done: true})
            }
            else{
                console.log("get gallery/all response not ok")
            }
        }
        catch (err) {
            console.log("get gallery/all failed");
            console.error('get gallery/all error', err);
        }
    }

    /*
    Render preview images
    */
   renderGallery() {
       console.log("renderGallery")
        return (
            <div className="uploadPicturesWrapper">
                <FlipMove enterAnimation="fade" leaveAnimation="fade" style={styles}>
                {this.renderGalleryPictures()}
                </FlipMove>
            </div>
        );
    }

    //Return image components of those in 'pictures' state.
    renderGalleryPictures() {
        console.log("renderGalleryPictures");
        return this.state.gallery.map((picture) => {
            return (
                <div className="uploadPictureContainer">
                <img src={picture.dataUrl} className="uploadPicture" alt="gallery" width="300" style={galleryStyle}/>
                </div>
                );
        });
    }

    componentDidMount(){
        this.displayImages();
    }

    render(){
        const imageUploader = 
            <div className={"fileUploader " + this.props.className} style={this.props.style}>
                <div className="fileContainer" style={this.props.fileContainerStyle}>
                    {this.renderIcon()}
                    {this.renderLabel()}
                    <div className="errorsContainer">
                        {this.renderErrors()}
                    </div>
                    <button
                        type={this.props.buttonType}
                        className={"chooseFileButton " + this.props.buttonClassName}
                        style={this.props.buttonStyles}
                        onClick={this.triggerFileUpload}
                    >
                        {this.props.buttonText}
                    </button>
                    <input
                        type="file"
                        ref={input => this.inputElement = input}
                        name={this.props.name}
                        multiple={!this.props.singleImage}
                        onChange={this.onDropFile}
                        onClick={this.onUploadClick}
                        accept={this.props.accept}
                    />
                    { this.props.withPreview ? this.renderPreview() : null }
                </div>
            </div>

            console.log("render gallery.js");



        var content;
        var recent = window.location.href;


        // if (this.state.done === false){
        //     content = <GalleryContent pagetitle="프로젝트"></GalleryContent>
        // }
        // else{
            const apiIndex = recent.indexOf("/gallery");
            const uri = recent.substring(apiIndex);
            if(uri.length === 8){
                content = <div>
                            <GalleryContent pagetitle="갤러리" pagecontent={imageUploader} 
                                uploadButton={true} uploadImages={this.uploadImages}
                                renderGallery={this.renderGallery}>
                            </GalleryContent> 
                            {/* done={true} */}
                        </div> 
                        // summaries 대신 pagecontent?
            }
            else{
                var order = 1 * uri.substring(10);
                // console.log(this.state.projects);
                // var url = ((this.state.projects[order]).gitUrl);
                content = <GalleryContent pagetitle={(this.state.projects[order]).projectName} uploadButton={false}></GalleryContent>
                // done={true}
            }
        // }

        return(
            <div className="Gallery">
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

Gallery.defaultProps = {
    className: '',
    fileContainerStyle: {},
    buttonClassName: "",
    buttonStyles: {},
    withPreview: true,
    accept: "image/*",
    name: "",
    withIcon: true,
    buttonText: "Choose images",
    buttonType: "button",
    withLabel: true,
    label: "Max file size: 5mb, accepted: jpg | gif | png",
    labelStyles: {},
    labelClass: "",
    imgExtension: ['.jpg', '.jpeg', '.gif', '.png'],
    maxFileSize: 5242880,
    fileSizeError: " file size is too big",
    fileTypeError: " is not a supported file extension",
    errorClass: "",
    style: {},
    errorStyle: {},
    singleImage: false,
    onChange: () => {},
    defaultImages: []
  };
  
  Gallery.propTypes = {
    style: PropTypes.object,
    fileContainerStyle: PropTypes.object,
    className: PropTypes.string,
    onChange: PropTypes.func,
    onDelete: PropTypes.func,
    buttonClassName: PropTypes.string,
    buttonStyles: PropTypes.object,
    buttonType: PropTypes.string,
    withPreview: PropTypes.bool,
    accept: PropTypes.string,
    name: PropTypes.string,
    withIcon: PropTypes.bool,
    buttonText: PropTypes.string,
    withLabel: PropTypes.bool,
    label: PropTypes.string,
    labelStyles: PropTypes.object,
    labelClass: PropTypes.string,
    imgExtension: PropTypes.array,
    maxFileSize: PropTypes.number,
    fileSizeError: PropTypes.string,
    fileTypeError: PropTypes.string,
    errorClass: PropTypes.string,
    errorStyle: PropTypes.object,
    singleImage: PropTypes.bool,
    defaultImages: PropTypes.array
  };

export default withCookies(Gallery);