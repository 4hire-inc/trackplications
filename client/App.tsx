import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import HeaderDisplay from './components/HeaderDisplay';
import HomePage from './pages/HomePage';
import AppSummaryDisplay from './pages/AppSummaryDisplay';
import AppDetailDisplay from './pages/AppDetailDisplay';
import AddAppDisplay from './pages/AddAppDisplay';
import EditAppDisplay from './pages/EditAppDisplay';
import AuthorizationPage from './pages/AuthorizationPage';

const App = () => {
  const [ userInfo, updateUserInfo ] = useState({
    userId: '',
    userName: ''
  });
  const [ appsList, updateAppsList ] = useState([]);
  const [ activeApp, setActiveApp ] = useState({});

  return(
    <React.Fragment>
      <HeaderDisplay userState={userInfo} />
      <div className="page-container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/summary" element={<AppSummaryDisplay appsList={appsList} setActiveApp={setActiveApp} />} />
          <Route path="/appdetail" element={<AppDetailDisplay activeApp={activeApp} />} />
          <Route path='/addapp' element={<AddAppDisplay updateAppsList={updateAppsList} />} />
          <Route path='/editapp' element={<EditAppDisplay activeApp={activeApp} setActiveApp={setActiveApp} />} />
          <Route path='/auth' element={<AuthorizationPage updateUserInfo ={updateUserInfo} updateAppsList={updateAppsList} />} />
        </Routes>
      </div>
    </React.Fragment>
  );
};

export default App;