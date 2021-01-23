// eslint-disable
import React, {useState, setState} from 'react';
import Navigation from './components/nav';
import First from './components/first';
import Home from './components/home';
import './App.css';
import axios from 'axios';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username:null,
            mode:'home'
        };
    }

    componentDidMount(){
        // fetch("http://localhost:3002")
        // // fetch('api')
        // // fetch('')
        // .then(res=>res.json())
        // .then(data=>this.setState({username:data.username}));

        // fetch("http://localhost:3002/users")
        // .then(res=>res.json())
        // .then(data=>this.setState({username:data.username}));
        // axios.post('http://localhost:3002/users/join',{
        //     uid:"1016chani",
        //     pwd:"1234",
        //     name:"Chani Jung",
        //     semester:"2020w",
        //     class:1
        // });
    }

    render(){
        var content;
        if(this.state.mode === 'home'){
            console.log("home");
            content = <Home />;
        }
        else if(this.state.mode === 'first'){
            console.log("first");
            content = <First />;
        }
        const {username} = this.state;
        return (
            <div className="App">
                <Navigation onChangePage={function(new_mode){
                    this.setState({mode: new_mode});
                    }.bind(this)}/>
                {content}
            </div>
        );
        ;
    }
}

export default App;
