import React, { Component } from 'react';
import {BrowserRouter as Router,Link} from "react-router-dom";
import './nav.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import icon from './icon.PNG';
import madcamp from './madcamp.png'

import LoginOrJoin from '../LoginOrJoin';

const Navigation = ({removeCookie}) => {

  var recent = window.location.href;
  var indexLogin = recent.indexOf('/login');
  var indexJoin = recent.indexOf('/join');

  if(indexLogin != -1 || indexJoin!=-1){
    return(
    <div className="Navigation">
        <div className="Nav">
          <div>
            <img
                className="Icon"
                src={madcamp}
                width='40'
                height='40'
                />
            <Link className="Nav_title" to="/main">몰입캠프</Link>
          </div>
        </div>
    </div>
    )
  }
  else{
    return(
      <div className="Navigation">
        <div className="Nav">
          <div>
            <img
                className="Icon"
                src={madcamp}
                width='40'
                height='40'
                />
            <Link className="Nav_title" to="/main">몰입캠프</Link>
          </div>
          <div className="Navi">
            <li className="navilist"><Link className="Navs" to="/main/projects">분반 커뮤니티</Link></li>
            <li className="navilist"><Link className="Navs" to="/main/famehall">명예의 전당</Link>
              {/* <ul className="hidden">
                <Link to="/main/archive">강의자료</Link>
                <br/>
                <Link to="/main/helpful">팁/사이트</Link>
                <br/>
                <Link to="/main/famehall">명예의 전당</Link>
              </ul> */}
            </li>
            <li className="navilist"><Link className="Navs" to="/main/community">커뮤니티</Link></li>
            <li className="navilist"><Link className="Navs" color="yellow" onClick={()=> window.open('https://madcamp.io/apply', '_blank')}>지원하기</Link></li>
            <li className="navilist"><Link className="Navs" href="" onClick={removeCookie}>로그아웃</Link></li>

          </div>
        </div>
    </div>
    );
  }
}
//I'm goedo kid.

export default Navigation;
