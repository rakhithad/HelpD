import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CreateTicketPage from './pages/CreateTicketPage';
import ViewTicketsPage from './pages/ViewTicketsPage';
import TicketDetailsPage from './pages/TicketDetailsPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import SupportEngineerDashboardPage from './pages/SupportEngineerDashboardPage';
import UpdateTicketPage from './pages/UpdateTicketPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import PrivateRoute from './components/PrivateRoute';
import ProtectedRoute from './components/ProtectedRoute';


function App() {
    return (
        <Router>
            <Routes>
                
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/"element={<ProtectedRoute><HomePage /></ProtectedRoute>}/>
                <Route path="/create-ticket" element={<PrivateRoute><CreateTicketPage /></PrivateRoute>} />
                <Route path="/view-tickets" element={<PrivateRoute><ViewTicketsPage /></PrivateRoute>} />
                <Route path="/ticket/:id" element={<PrivateRoute><TicketDetailsPage /></PrivateRoute>} />
                <Route path="/admin-dashboard" element={<PrivateRoute><AdminDashboardPage /></PrivateRoute>} />
                <Route path="/engineer-dashboard" element={<PrivateRoute><SupportEngineerDashboardPage /></PrivateRoute>} />
                <Route path="/tickets/:id/edit" element={<PrivateRoute><UpdateTicketPage /></PrivateRoute>} />
            </Routes>
        </Router>
    );
}

export default App;
