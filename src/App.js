import './App.css';
import LoginPage from './pages/Login/LoginPage';
import RegisterPage from './pages/Register/RegisterPage';
import PageLayout from './layouts/PageLayout';
import DashboardPage from './pages/Dashboard/DashboardPage';
import { Route, Routes } from 'react-router-dom';
function App() {
  return (
    <PageLayout>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/signup' element={<RegisterPage />} />
        <Route path='/dashboard' element={<DashboardPage />} />
      </Routes>
    </PageLayout>
  );
}

export default App;
