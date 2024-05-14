import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import './style.scss'
import { useSelector } from 'react-redux';

function App() {

  // const isAuthorized = useSelector(state => state.authReducer)
  const isAuthorized = useSelector(state => state.authReducer)

  return (
    <>
      <Routes>
        <Route path='/' element={<Navigate to={isAuthorized ? '/dashboard' : '/login'} />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/dashboard' element={isAuthorized ? <Dashboard /> : <Navigate to='/login' />} />
        <Route path='*' element={<Navigate to={isAuthorized ? '/dashboard' : '/login'} />} />
      </Routes>
    </>
  );
}
export default App;
