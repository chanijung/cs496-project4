import React from 'react';
import './nav.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import icon from './icon.PNG';

function Navigation() {
  return (
    <div className="Navigation">
       <header>
           <div className="Nav">
              <div>
                <img 
                    className="Icon"
                    src={icon}
                    width='40'
                    height='40'
                    />
                <span className="Nav_title">몰입캠프</span>
               </div>
               <div className="Navi">
                   <a className="Navs" >첫번째</a>
                   <a className="Navs" >두번째</a>
                   <a className="Navs">세번째</a>
                   <a className="Navs" color="yellow">지원하기</a>
               </div>
           </div>
       </header>
    </div>
  );
}

export default Navigation;
