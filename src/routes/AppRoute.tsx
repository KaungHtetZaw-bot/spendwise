import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import MainPage from '../pages/MainPage';
import SettingPage from '../pages/SettingPage';
import StatsPage from '../pages/StatsPage';
import HistoryPage from '../pages/HistoryPage';
import MainLayout from '../components/layouts/MainLayout';
import NotFoundPage from '../pages/NotFoundPage';
import AuthPage from '../pages/AuthPage';
import ProtectedRoute from './ProtectedRoute';

const AppRoute = () => {
  return (
    <Router>
      <Routes>
        <Route element={ <ProtectedRoute/> }>
          <Route element={<MainLayout />}>
            <Route index element={<MainPage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/stats" element={<StatsPage />} />
            <Route path="/settings" element={<SettingPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Route>
        <Route path="/auth" element={<AuthPage/>} />
      </Routes>
    </Router>
  );
};

export default AppRoute;