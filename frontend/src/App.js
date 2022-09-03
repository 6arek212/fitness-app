import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import useAuthContext from './hooks/useAuthContext';
import Home from './pages/Home';
import Login from './pages/Login';

function App() {
  const { token } = useAuthContext()

  return (
    <div className="App">
      <BrowserRouter>

        <Routes>
          <Route path='/' element={token ? <Home /> : <Navigate to='/login' />} />
          <Route path='/login' element={!token ? <Login /> : <Navigate to='/' />} />
        </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;
