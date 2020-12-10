import React, { useCallback, useEffect, useRef, useState } from 'react';
import {Route, withRouter} from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faHome } from "@fortawesome/free-solid-svg-icons";
import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import ActivePage from './activePage';
import CompletedPage from './completedPage';
import TaskEdit from './taskEditPage';
import TaskDetail from './taskDetailPage';
import RestrictAccess from '../components/guardedRoute';
import ErrorPage from './errorPage';
import HomeRedirect from './homeRedirect';

const HomePage : React.FC<{history: any, location: any}> = (props) : JSX.Element => {
  return (
  <Route>
    <div>
      <SideNavContainer {...props} />
      <div className="main-style">
        <Route path='/error' component={ErrorPage} />
        <Route exact path='/' component={HomeRedirect} />
        <Route path='/active' component={ActivePage} />
        <Route path='/completed' component={CompletedPage} />
        <RestrictAccess path='/details' component={TaskDetail} />
        <Route path='/task' component={TaskEdit} />
      </div>
    </div>
  </Route>
  );
}

const SideNavContainer : React.FC<{history: any, location: any}> = (props) : JSX.Element => {
  const {history, location} = props;
  const [toggle, setToggle] = useState(false);
  const ref = useRef(null);

  const clickListener = useCallback((e: MouseEvent) => {
    // bang operator after ref.current means it cannot be null n TS shoulddn't complain. 
    if(!(ref.current! as any).contains(e.target)) {
      setToggle(false)
    }
  }, []);

  useEffect(() => {
    document.addEventListener('click', clickListener);
    return () => document.removeEventListener('click', clickListener);
  })

  function handleToggle() {
    if(toggle) setToggle(false);
  }

  return (
    <div ref={ref} >
      <SideNav
        style={{
          backgroundColor: 'midnightblue',
          position: 'fixed',
        }}
        expanded={toggle}
        onToggle={setToggle}
        onSelect={(selected) => {
          const to = '/' + selected;
          if (location.pathname !== to && location.pathname !== '/') {
            history.replace(to);
          } else if (location.pathname !== to && location.pathname === '/') {
            history.push(to);
          }
        }}
      >
        <SideNav.Toggle />
        <SideNav.Nav defaultSelected="active">
          <NavItem eventKey="active"
            onClick={handleToggle}
          >
            <NavIcon>
              <FontAwesomeIcon icon={faHome}/>
            </NavIcon>
            <NavText>
              Active Tasks
            </NavText>
          </NavItem>
          <NavItem eventKey="completed"
            onClick={handleToggle}
          >
            <NavIcon>
              <FontAwesomeIcon icon={faCheck} />
            </NavIcon>
            <NavText>
              Completed Tasks
            </NavText>
          </NavItem>
        </SideNav.Nav>
      </SideNav>
    </div>
  );
}

export default withRouter(HomePage);