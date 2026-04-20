import { BrowserRouter as Router, Routes, Route,Navigate } from 'react-router-dom';

import MainPage from '../pages/MainPage';
import SettingPage from '../pages/SettingPage';
import StatsPage from '../pages/StatsPage';
import HistoryPage from '../pages/HistoryPage';
import MainLayout from '../components/layouts/MainLayout';
import NotFoundPage from '../pages/NotFoundPage';
import AuthPage from '../pages/AuthPage';
import ProtectedRoute from './ProtectedRoute';
import AccountPage from '../pages/AccountPage';

const AppRoute = () => {
  return (
    <Router>
      <Routes>
        <Route element={ <ProtectedRoute/> }>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route index path='/home' element={<MainPage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/stats" element={<StatsPage />} />
            <Route path="/settings" element={<SettingPage />} />
            <Route path="/settings/account" element={<AccountPage />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/auth" element={<AuthPage/>} />
      </Routes>
    </Router>
  );
};

export default AppRoute;