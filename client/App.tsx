import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './stylesheets/styles.scss';
import HeaderDisplay from './components/HeaderDisplay';
import HomePage from './pages/HomePage';
import AppSummaryDisplay from './pages/AppSummaryDisplay';
import AppDetailDisplay from './pages/AppDetailDisplay';
import AddAppDisplay from './pages/AddAppDisplay';
import EditAppDisplay from './pages/EditAppDisplay';
import AuthenticationPage from './pages/AuthenticationPage';
import NotFound from './pages/NotFound';
import { activeAppMock, appsListMock } from './mockData';

const App = () => {
  const [ userInfo, updateUserInfo ] = useState({
    userId: '',
    userName: 'Guest'
  });
  const [ appsList, updateAppsList ] = useState([]);
  const [ activeApp, setActiveApp ] = useState({
    app_id: '',
    user_id: '',
    company: '',
    location: '',
    position: '',
    notes: '',
    status_id: '',
    offer_id: '',
    modified_at: '',
    status_name: '',
    status_rank: 0,
    status_modifed_at: '' });

  return(
    <React.Fragment>
      <HeaderDisplay userInfo={userInfo} />
      <main>
        <div className="page-container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/summary" element={<AppSummaryDisplay appsList={appsList} updateAppsList={updateAppsList} setActiveApp={setActiveApp} />} />
            <Route path="/appdetail" element={<AppDetailDisplay activeApp={activeApp} />} />
            <Route path='/addapp' element={<AddAppDisplay appsList={appsList} activeApp={activeApp} updateAppsList={updateAppsList} />} />
            <Route path='/editapp' element={<EditAppDisplay activeApp={activeApp} setActiveApp={setActiveApp} appsList={appsList} updateAppsList={updateAppsList}/>} />
            <Route path='/authenticate' element={<AuthenticationPage updateUserInfo={updateUserInfo}/>} />
            <Route path='/*' element={<NotFound />} />
          </Routes>
        </div>
      </main>
    </React.Fragment>
  );
};

export default App;