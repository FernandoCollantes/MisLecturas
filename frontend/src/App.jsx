import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

import { AlertProvider } from './context/AlertContext';
import { ConfirmationProvider } from './context/ConfirmationContext';

import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import BookListPage from './pages/BookListPage';

function App() {
    return (
        <AuthProvider>
            <AlertProvider>
                <ConfirmationProvider>
                    <div className="app-container">
                        <main style={{ padding: '0' }}>
                            <Routes>
                                {/* Public Routes */}
                                <Route path="/login" element={<LoginPage />} />
                                <Route path="/register" element={<RegisterPage />} />

                                {/* Private Routes */}
                                <Route path="/" element={<ProtectedRoute />}>
                                    <Route index element={<DashboardPage />} />
                                    <Route path="dashboard" element={<DashboardPage />} />
                                    <Route path="books" element={<BookListPage />} />
                                </Route>
                            </Routes>
                        </main>
                    </div>
                </ConfirmationProvider>
            </AlertProvider>
        </AuthProvider>
    );
}

export default App;
