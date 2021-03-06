import React, { useState } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Redirect,
    Switch,
} from 'react-router-dom';
import styled from 'styled-components';
import './components-style.css';
import TaskMaster from './components/TaskMaster/TaskMaster';
import Header from './components/Header/Header';
import SideNav from './components/SideNav/SideNav';
import MyTasksPage from './components/MyTasksPage/MyTasksPage';
import SettingsPage from './components/SettingsPage/SettingsPage';
import Draggable from './components/Draggable/Draggable';
import Droppable from './components/Droppable/Droppable';
import Card from './components/Card/Card';
import Column from './components/Column/Column';
import MainPage from './components/MainPage/MainPage';
import LoginPage from './components/LoginPage/LoginPage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import Home from './components/Home/Home';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import PublicRoute from './components/PublicRoute/PublicRoute';
// import Message from './components/Message/Message';
import {
    GlobalStore,
    useGlobalStore,
} from './components/GlobalStore/GlobalStore';
//import {  } from './components/GlobalStore/GlobalStore';

function App() {
    const isLoggedIn = localStorage.getItem('email') ? true : false;
    //const [globalData, dispatch] = useGlobalStore();
    const [cards, addCard] = useState(0);
    const Wrapper = styled.div`
        width: 80%;
        padding: 32px;

        justify-content: center;
    `;

    return (
        <Router>
            <GlobalStore>
                <Switch>
                    <Route exact path="/" component={LoginPage} />
                    <Route exact path="/login" component={LoginPage} />
                    <Route exact path="/register" component={RegisterPage} />
                    <PrivateRoute
                        exact
                        path="/projectdashboard"
                        component={TaskMaster}
                        title={`dashboard`}
                    />
                    <PrivateRoute
                        exact
                        path="/mytasks"
                        component={TaskMaster}
                        title={`mytasks`}
                    />
                    <PrivateRoute
                        exact
                        path="/settings"
                        component={TaskMaster}
                        title={`settings`}
                    />
                </Switch>
                {/* <Message /> */}
            </GlobalStore>
        </Router>

        // <Wrapper>
        //     <Header />
        //     <div className="test">TEST</div>
        //     <SideNav />
        //     <MainPage id="qaz" />
        // </Wrapper>
    );
}

export default App;
