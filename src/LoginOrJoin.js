// eslint-disable
import React, {useState, setState, useEffect} from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import {BrowserRouter as Router,Link} from "react-router-dom";
import { withCookies, useCookies } from 'react-cookie';
import Navigation from './components/nav';
import Home from './components/home';
import Observer from './components/useEffect';
import Login from './components/Login';
import Join from './components/Join';
import axios from 'axios';
import Cookies from 'js-cookie';
import Projects from './components/first_tab/projects';
import Famehall from './components/second_tab/famehall'
import Community from './components/third_tab/community'
import Bulletinboard from './components/third_tab/bulletinboard'
import NewWrite from './components/third_tab/newWrite';
import Employment from './components/third_tab/employment'
import Startup from './components/third_tab/startup'
import Gallery from './components/first_tab/gallery';
import './LoginOrJoin.css';
import madcamp from './components/madcamp.png'
// import {BrowserRouter as Router,Link} from "react-router-dom";

class LoginOrJoin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username:null,
            userToken: Cookies.get('user'),
            hasToken: Cookies.get('user') != null
        };
        this.setHasToken = this.setHasToken.bind(this);
        this.getHasToken = this.getHasToken.bind(this);
        this.removeCookie = this.removeCookie.bind(this);
        console.log(this.state);
    }

// The effect is fired only when cookies has changed.
    // useEffect(() => {
    //     if (this.state.cookies.user && this.state.cookies.user !== 'undefined') {
    //         this.state.hasCookie = true;
    //     }
    //     }, [ this.state.cookies ]);
    
    setHasToken(token, user_id){
        if(token != null){
            this.setState(() => {
                return {userToken: Cookies.get('user'),
                    hasToken: true,
                    username: user_id};
            });
        }
        else{
            this.setState(() => {
                return {userToken: null,
                    hasToken: false,
                    username: null};
            })
        }
        console.log(this.state);
        // this.state.hasToken = true;
    }

    getHasToken(){
        return this.state.hasToken;
    }

    removeCookie(){
        this.setState(() => {
            return {userToken: null,
                    hasToken: false};
        });
        Cookies.remove('user');
        console.log(this.state);
        console.log(Cookies.get('user'));
    }

    componentDidMount(){
        // axios.post('/users/join',{
        //     uid:"1016chani",
        //     pwd:"1234",
        //     name:"Chani Jung",
        //     semester:"2020w",
        //     class:1
        // });

    }
    
    

    
    render(){
        return (
            <div>
            
              {/* <div className="Navi">
                <li className="navilist"><Link className="Navs" to="/main/projects">분반 커뮤니티</Link></li>
                <li className="navilist"><Link className="Navs" to="/main/archive">아카이브</Link>
                  <ul className="hidden">
                    <Link to="/main/archive">강의자료</Link>
                    <br/>
                    <Link to="/main/helpful">팁/사이트</Link>
                    <br/>
                    <Link to="/main/famehall">명예의 전당</Link>
                  </ul>
                </li>
                <li className="navilist"><Link className="Navs" to="/main/third">세번째</Link></li>
                <li className="navilist"><Link className="Navs" color="yellow" to="" onClick={()=> window.open('https://madcamp.io/apply', '_blank')}>지원하기</Link></li>
                <li className="navilist"><Link className="Navs" href="" onClick={removeCookie}>로그아웃</Link></li>
    
              </div> */}
            
        
        
                <div className="loj">
                    <Router>
                    {!this.state.hasToken ? <Redirect to="/login" /> : <Redirect to="/main" />}
                            <Route
                                exact path="/login"
                                render={routerProps => {
                                    return(
                                        <Community
                                            {...routerProps}
                                            userId ={this.state.username}
                                        />
                                    );
                                }}  />
                        <Route path="/main/bulletinboard" 
                                render={routerProps => {
                                    return(
                                        <Bulletinboard
                                         {...routerProps}
                                         userId={this.state.username}
                                         />
                                    );
                                }}
                            />
                            <Route
                                exact path="/join"
                                component={Join}
                            />
                            <Route
                                path="/"
                                render={routerProps => {
                                    return(
                                        <Employment
                                         {...routerProps}
                                         userId={this.state.username}
                                         />
                                    );
                                }}
                        />
                        <Route path="/main/newwrite" 
                                render={routerProps => {
                                    return(
                                        <NewWrite
                                         {...routerProps}
                                         userId={this.state.username}
                                         />
                                    );
                                }}
                        />
                        <Route path="/main/startup" 
                                render={routerProps => {
                                    return(
                                        <Startup
                                         {...routerProps}
                                         userId={this.state.username}
                                         />
                                    );
                                }}
                            />
                            <Route exact path="/main" component={Home}/>
                            <Route path="/main/projects" component={Projects}/>
                            <Route path="/main/archive" component={Archive}/>
                            <Route path="/main/helpful" component={Helpful}/>
                            <Route path="/main/famehall" component={Famehall}/>
                            <Route path='/main/gallery' component={Gallery}/>
                    </Router>
                </div>
                </div>
        );
        ;
    }
}

export default withCookies(LoginOrJoin);
