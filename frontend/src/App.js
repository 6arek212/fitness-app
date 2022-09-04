import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import useAuthContext from './hooks/useAuthContext';
import Customers from './pages/Customers';
import Home from './pages/Home';
import Login from './pages/Login';
import Navbar from './components/Navbar'
import VerticalNav from './components/VerticalNav';



const WithNav = () => {
  return (
      <div className="main">
        <Navbar />

        <div className="main-container">

          <div className="left">
            <VerticalNav />
          </div>

          <div className="right">
            <Outlet className='right' />
          </div>
        </div>
      </div>
  );
};

const WithoutNav = () => <Outlet />



function App() {
  const { token } = useAuthContext()

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>

          <Route element={<WithNav />}>
            <Route path='/' element={token ? <Home /> : <Navigate to='/login' />} />

            <Route path='/customers' element={token ? <Customers /> : <Navigate to='/login' />} />
          </Route>

          <Route element={<WithoutNav />}>
            <Route path='/login' element={!token ? <Login /> : <Navigate to='/' />} />
          </Route>

        </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;
