import { Routes, Route } from 'react-router-dom';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import VerifySignupPage from './pages/VerifySignupPage';
import InterviewForm from './pages/InterviewForm';
import PrivateRoute from './components/PrivateRoute';

const App = () => {
    return (
        <Routes>
            <Route path="/signup" element={<SignupPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path="/signup/verify" element={<VerifySignupPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={
                <PrivateRoute>
                    <HomePage />
                </PrivateRoute>
            } />
            <Route path="/interview-form" element={
                <PrivateRoute>
                    <InterviewForm />
                </PrivateRoute>
            } />
        </Routes>
    );
};

export default App;
