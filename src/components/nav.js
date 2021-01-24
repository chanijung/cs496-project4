import React, { Component } from 'react';
import './nav.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import icon from './icon.PNG';

class Navigation extends Component{
  render(){
    return(
      <div className="Navigation">
        <div className="Nav">
          <div>
            <img 
                className="Icon"
                src={icon}
                width='40'
                height='40'
                />
            <a className="Nav_title" href="/">몰입캠프</a>
          </div>
          <div className="Navi">
            <li className="navilist"><a className="Navs" href="/first">첫번째</a></li>
            <li className="navilist"><a className="Navs" href="/archive">아카이브</a>
              <ul className="hidden">
                <a href="/archive">강의자료</a>
                <br/>
                <a href="/helpful">팁/사이트</a>
                <br/>
                <a href="framehall">명예의 전당</a>
              </ul>
            </li>
            <li className="navilist"><a className="Navs" href="/third">세번째</a></li>
            <li className="navilist"><a className="Navs" color="yellow" href="" onClick={()=> window.open('https://madcamp.io/apply', '_blank')}>지원하기</a></li>
          </div>
        </div>
    </div>
    );
  }
}
//I'm goedo kid.

export default Navigation;
