import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CreateTicketPage from './pages/CreateTicketPage';
import ViewTicketsPage from './pages/ViewTicketsPage';
import TicketDetailsPage from './pages/TicketDetailsPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import SupportEngineerDashboardPage from './pages/SupportEngineerDashboardPage';
import UpdateTicketPage from './pages/UpdateTicketPage';
import AuthProvider from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
//import ProtectedRoute from './components/ProtectedRoute';

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignUpPage />} />
                    <Route path="/"element={<><HomePage /></>}/>
                    <Route path="/create-ticket" element={<><CreateTicketPage /></>} />
                    <Route path="/view-tickets" element={<><ViewTicketsPage /></>} />
                    <Route path="/ticket/:id" element={<><TicketDetailsPage /></>} />
                    <Route path="/admin-dashboard" element={<><AdminDashboardPage /></>} />
                    <Route path="/engineer-dashboard" element={<><SupportEngineerDashboardPage /></>} />
                    <Route path="/tickets/:id/edit" element={<><UpdateTicketPage /></>} />
                </Routes>
            </Router>
        </AuthProvider>
        
    );
}

export default App;
