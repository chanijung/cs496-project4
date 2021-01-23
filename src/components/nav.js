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
            <a className="Nav_title" href="/home" onClick={function(e){
              e.preventDefault();
              this.props.onChangePage('home');
            }.bind(this)}>몰입캠프</a>
          </div>
          <div className="Navi">
            <a className="Navs" href="/first" onClick={function(e){
              e.preventDefault();
              this.props.onChangePage('first');
            }.bind(this)}>첫번째</a>
            <a className="Navs" href="/second" onClick={function(e){
              e.preventDefault();
              this.props.onChangePage('first');
            }.bind(this)}>두번째</a>
            <a className="Navs" href="/third"onClick={function(e){
              e.preventDefault();
              this.props.onChangePage('first');
            }.bind(this)}>세번째</a>
            <a className="Navs" color="yellow" >지원하기</a>
          </div>
        </div>
    </div>
    );
  }
}

export default Navigation;
