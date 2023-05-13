import React, {FC} from 'react';
import './App.css';
import HeaderContainer from './components/Header/HeaderContainer.js';
import Navbar from './components/Navbar/Navbar.js';
import { Route, Routes } from 'react-router-dom';
import DialogsContainer from './components/Content/Dialogs/DialogsContainer';
import UsersContainer from './components/Content/Users/UsersContainer';
import ProfileContainer from './components/Content/Profile/ProfileContainer.js';
import LoginContainer from './components/Content/Login/LoginContainer';
import { initialiseApp } from './redux/app-reducer';
import { useEffect } from 'react';
import { ConnectedProps, connect } from 'react-redux';
import Preloader from './common/Preloader/Preloader.js';
import backPhoto from './assets/forest.jpeg'
import { RootState } from './redux/redux-store';


const App: FC<PropsFromRedux> = ({initialiseApp, isInitialised}) => {
  
  useEffect(() => {
    initialiseApp()
  }, []);

  // Show the loading page during app initialisation

  if (!isInitialised) {
    return <Preloader />
  }

  // Show the main page, which consist of header, navbar and 
  // content element that changes according to the route

  return (<div>
    <div className = 'background'>
      <img src={backPhoto}/>
    </div>
    <div className = 'app-wraper'>
      <HeaderContainer />
      <Navbar />
      <div className = 'app-wraper-content'>
        <Routes>
          <Route path='/dialogs' element={<DialogsContainer/>} />
          <Route path='/profile' element={<ProfileContainer />} />
          <Route path='/profile/:userId' element={<ProfileContainer />} />
          <Route path='/users' element={<UsersContainer />} />
          <Route path='/dialogs/:chatId' element={<DialogsContainer />} />
          <Route path='/login' element={<LoginContainer />} />
          <Route path='/' element={<LoginContainer />} />
        </Routes>
      </div>
    </div>
    </div>
  )  
}

let mapStateToProps = (state: RootState) => {
  return {
      isInitialised: state.app.isInitialised
  }
}
let connector = connect(mapStateToProps, {initialiseApp})

export default connector(App)

type PropsFromRedux = ConnectedProps<typeof connector>
