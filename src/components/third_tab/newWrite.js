import React, {Component, setState} from "react";
import axios from 'axios';
import './newWrite.css'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

class NewWrite extends Component{
    constructor(props){
        super(props);
        this.state = {
            writer: "",
            type: 0,
            title: "",
            content: "",
            done: false
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleRadio = this.handleRadio.bind(this)
    }
    
    componentDidMount(){
        var a = this.state;
        var b = this;
        axios.get('/users/id', {
            params: {
                id: this.props.userId
            }
        })
            .then(function(response){
                b.setState(()=>{
                    return{
                        writer: response.data.name
                    }
                })
                
            })
    }

    handleSubmit(e){
        e.preventDefault();
        var a = this.state;
        var b = this;
        if(this.state.title == ""){
            alert("글 제목을 작성해 주세요");
            return;
        }
        else if(this.state.content == ""){
            alert("글 내용을 작성해 주세요");
            return;
        }
        axios({
            method: 'post',
            url: '/communities/newwrite',
            params:{
                writer: this.state.writer,
                content: this.state.content,
                type: this.state.type,
                title: this.state.title
            }
        })
        .then(function(response){
            console.log("성공")
            b.setState(()=>{
                return{
                    comment:"",
                    title:"",
                    done:true
                }
            })
            alert("성공");

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

    handleRadio(event){
        const target = event.target;
        const value = target.value;
        if(value === "free"){
            this.state.type = 0
        }
        else if(value === "employment"){
            this.state.type = 1
        }
        else if(value === "startup"){
            this.state.type = 2
        }
        
    }

    render(){
        return(
            <div className="NewWrite">
                <div> 새글쓰기</div>
                
                <form
                    onSubmit={this.handleSubmit}>
                    <input
                        type="text"
                        name="title"
                        value={this.state.title}
                        onChange={this.handleInputChange}
                        placeholder="글 제목"
                    />
                    <br/>
                    <FormControl component="fieldset">
                    <FormLabel component="legend">카테고리</FormLabel>
                    <RadioGroup row aria-label="position" name="position" defaultValue="free"
                                onChange={this.handleRadio}>
                        <FormControlLabel
                        value="free"
                        control={<Radio color="primary" />}
                        label="자유글"
                        labelPlacement="end"
                        />
                        <FormControlLabel
                        value="employment"
                        control={<Radio color="primary" />}
                        label="취업/인턴"
                        labelPlacement="end"
                        />
                        <FormControlLabel
                        value="startup"
                        control={<Radio color="primary" />}
                        label="창업"
                        labelPlacement="end"
                        />
                        </RadioGroup>
                    </FormControl>
                    <br/>
                    <input
                        type="text"
                        name="content"
                        value={this.state.comment}
                        onChange={this.handleInputChange}
                        placeholder="글 내용"
                    />
                    <br />
                    <button
                        type="submit"
                        >
                            작성하기
                        </button>
                </form>
            </div>
        );
    }
}
export default NewWrite