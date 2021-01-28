import React, {Component} from "react";
import {BrowserRouter as Router,Link} from "react-router-dom";
import '../second_tab/famehall.css'
import axios from 'axios';

class CommunityContent extends Component{
    constructor(props){
        super(props);
        this.state = {
            comment: "",
            comments: [],
            done: false,
            status: null
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.displayComments = this.displayComments.bind(this);
        this.state.status = this.props.status;
        // console.log(props.pagecontent)
        // this.displayComments();
    }

    async displayComments(){
        console.log("display")
        this.state.comments = [];
        if(!this.props.ismain){
            var a = this.state;
            var b = this;
            a.comments = []
            await axios({
                method: 'get',
                url: '/comments/all',
                params:{
                    id: b.props.community_id
                }
            })
                .then(function(response){
                    a.comments = []
                    var i = 0;
                    while(i < response.data.length){
                        a.comments.push(
                            <li>
                                <div>
                                {response.data[i].writer}   {response.data[i].date}
                                <br/>
                                {response.data[i].content}
                                </div>
                                <br/>
                            </li>
                        )
                        console.log("a.comments: ", a.comments)
                        i = i + 1;
                    }
                    b.setState(()=>{
                        return{
                            done:true
                        }
                    })
                })
                .catch(function(err){
                    console.log(err);
                })
        }
    }

    // componentDidMount(){
    //     console.log("componentDidMount")
    //     this.displayComments();
    // }

    handleSubmit(e){
        e.preventDefault();
        var a = this.state;
        var b = this;
        axios({
            method: 'post',
            url: '/comments/submit',
            params:{
                writer: this.props.writer,
                content: a.comment,
                community_id: this.props.community_id
            }
        })
            .then(function(response){
                console.log("성공")
                b.displayComments();
                a.comment = "";
            })
            .catch(function(err){
                console.log("실패")
            })
            .then(function(){

            });
    }

    handleInputChange(event){
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    render(){
        if(this.props.status !== this.state.status){
            this.state.status = this.props.status
            this.displayComments();
        }
        var pageTitle = this.props.pagetitle;
        var pageContent = this.props.pagecontent;
        var ismain = this.props.ismain;
       
        if(ismain){
            return(
                <div className="site-content">
                        <div className="page-header">
                            <div className="header">
                            <h1 className="page-title">
                                {pageTitle}
                            </h1>
                            <div className="new_write">
                                <Link className="new_write_btn" to="/main/newwrite">
                                    글 쓰기
                                </Link>
                            </div>
                            </div>
                            {/* <u1 className="breadcrumb">
                                홈 > 강의자료(이런거)
                            </u1> */}
                        </div>
                        <div className="page-content">
                            <div className="main-block">
                                <div className="contents">
                                    
                                        {pageContent}
                                    
                                </div>
                            </div>
                        </div>
                    </div>
            );
        }
        else{
            if(!this.state.callcomment){
                this.state.callcomment = true;
                this.displayComments();
            }
            console.log("render comment")
            // this.componentDidMount();
            // this.displayComments();
            var content = pageContent.content;
            var writer = pageContent.writer;
            var date = pageContent.date;
            var f_date = date.substring(0,10);
            var s_date = date.substring(11,19);
            date = f_date + "  " +  s_date;
            var type = pageContent.type;
            var title = "[";
            if(type == 0){
                title = "[자유글] " + pageTitle;
            }
            else if(type == 1){
                title = "[인턴/취업] " + pageTitle;
            }
            else{
                title = "[창업] " + pageTitle;
            }
            var info = "작성자: " + writer;
            var info2 = "날짜: " + date;
            return(
                <div className="site-content">
                    <div className="page-header">
                        <h1 className="page-title">
                            {title}
                        </h1>
                        <u1 className="breadcrumb">
                            <div>{info}</div>
                            <div>{info2}</div>
                        </u1>
                    </div>
                    <div className="page-content">
                        <div className="main-block">
                            <div className="content">
                                <div>
                                    {content}
                                </div>
                            </div>
                        </div>
                    </div>
                    <form onSubmit={this.handleSubmit}>
                        <input
                            type="text"
                            name="comment"
                            value={this.state.comment}
                            onChange={this.handleInputChange}
                            placeholder="댓글을 입력하세요"
                        />
                        <button type="submit">
                            댓글 작성
                        </button>
                    </form>
                    <div className="comments">
                        {this.state.comments}
                    </div>
                </div>
            );
        }
        
    }
}
export default CommunityContent