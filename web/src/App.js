import React, { lazy, Suspense, useContext, useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Loading from './components/Loading';
import User from './pages/User';
import { PrivateRoute } from './components/PrivateRoute';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import NotFound from './pages/NotFound';
import Setting from './pages/Setting';
import EditUser from './pages/User/EditUser';
import AddUser from './pages/User/AddUser';
import { API, showError, showNotice } from './helpers';
import PasswordResetForm from './components/PasswordResetForm';
import GitHubOAuth from './components/GitHubOAuth';
import PasswordResetConfirm from './components/PasswordResetConfirm';
import { UserContext } from './context/User';
import Message from './pages/Message';
import Channel from './pages/Channel';
import EditChannel from './pages/Channel/EditChannel';
import EditMessage from './pages/Message/EditMessage';
import Webhook from './pages/Webhook';
import EditWebhook from './pages/Webhook/EditWebhook';

const About = lazy(() => import('./pages/About'));

function App() {
  const [userState, userDispatch] = useContext(UserContext);

  const loadUser = () => {
    let user = localStorage.getItem('user');
    if (user) {
      let data = JSON.parse(user);
      userDispatch({ type: 'login', payload: data });
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <Routes>
      <Route
        path='/'
        element={
          <Navigate to="/login" replace />
        }
      />
      <Route
        path='/user'
        element={
          <PrivateRoute>
            <User />
          </PrivateRoute>
        }
      />
      <Route
        path='/user/edit/:id'
        element={
          <Suspense fallback={<Loading></Loading>}>
            <EditUser />
          </Suspense>
        }
      />
      <Route
        path='/user/edit'
        element={
          <Suspense fallback={<Loading></Loading>}>
            <EditUser />
          </Suspense>
        }
      />
      <Route
        path='/user/add'
        element={
          <Suspense fallback={<Loading></Loading>}>
            <AddUser />
          </Suspense>
        }
      />
      <Route
        path='/user/reset'
        element={
          <Suspense fallback={<Loading></Loading>}>
            <PasswordResetConfirm />
          </Suspense>
        }
      />
      <Route
        path='/channel'
        element={
          <PrivateRoute>
            <Channel />
          </PrivateRoute>
        }
      />
      <Route
        path='/channel/edit/:id'
        element={
          <Suspense fallback={<Loading></Loading>}>
            <EditChannel />
          </Suspense>
        }
      />
      <Route
        path='/channel/add'
        element={
          <Suspense fallback={<Loading></Loading>}>
            <EditChannel />
          </Suspense>
        }
      />
      <Route
        path='/webhook'
        element={
          <PrivateRoute>
            <Webhook />
          </PrivateRoute>
        }
      />
      <Route
        path='/webhook/edit/:id'
        element={
          <Suspense fallback={<Loading></Loading>}>
            <EditWebhook />
          </Suspense>
        }
      />
      <Route
        path='/webhook/add'
        element={
          <Suspense fallback={<Loading></Loading>}>
            <EditWebhook />
          </Suspense>
        }
      />
      <Route
        path='/message'
        element={
          <PrivateRoute>
            <Message />
          </PrivateRoute>
        }
      />
      <Route
        path='/editor'
        element={
          <PrivateRoute>
            <EditMessage />
          </PrivateRoute>
        }
      />
      <Route
        path='/editor/:id'
        element={
          <PrivateRoute>
            <EditMessage />
          </PrivateRoute>
        }
      />
      <Route
        path='/login'
        element={
          <Suspense fallback={<Loading></Loading>}>
            <LoginForm />
          </Suspense>
        }
      />
      <Route
        path='/register'
        element={
          <Suspense fallback={<Loading></Loading>}>
            <RegisterForm />
          </Suspense>
        }
      />
      <Route
        path='/reset'
        element={
          <Suspense fallback={<Loading></Loading>}>
            <PasswordResetForm />
          </Suspense>
        }
      />
      <Route
        path='/oauth/github'
        element={
          <Suspense fallback={<Loading></Loading>}>
            <GitHubOAuth />
          </Suspense>
        }
      />
      <Route
        path='/setting'
        element={
          <PrivateRoute>
            <Suspense fallback={<Loading></Loading>}>
              <Setting />
            </Suspense>
          </PrivateRoute>
        }
      />
      <Route
        path='/about'
        element={
          <Suspense fallback={<Loading></Loading>}>
            <About />
          </Suspense>
        }
      />
      <Route path='*' element={NotFound} />
    </Routes>
  );
}

export default App;
