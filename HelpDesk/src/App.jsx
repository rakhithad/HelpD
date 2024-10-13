import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import React from 'react';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import CreateTicketPage from './pages/CreateTicketPage';
import ViewTicketsPage from './pages/ViewTicketsPage';
import TicketDetailsPage from './pages/TicketDetailsPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import SupportEngineerDashboardPage from './pages/SupportEngineerDashboardPage';
import UpdateTicketPage from './pages/UpdateTicketPage';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import SignUpPage from './pages/SignUp';
import LoginPage from './pages/Login';
import ManageUsers from './pages/ManageUsers';
import UserAccount from './pages/UserAccount';
import EntrancePage from './pages/EntrancePage';





function App() {
    const [user, setUser] = React.useState(null);

    React.useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        return () => unsubscribe();
    }, []);


    return (
        <Router>
            <Routes>
                <Route path="/navbar" element={<Navbar />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/home"element={user ? <HomePage /> : <Navigate to="/login" />}/>
                <Route path="/create-ticket" element={<><CreateTicketPage /></>} />
                <Route path="/view-tickets" element={<><ViewTicketsPage /></>} />
                <Route path="/ticket/:id" element={<><TicketDetailsPage /></>} />
                <Route path="/admin-dashboard" element={<><AdminDashboardPage /></>} />
                <Route path="/manage-users" element={<><ManageUsers /></>} />
                <Route path="/engineer-dashboard" element={<><SupportEngineerDashboardPage /></>} />
                <Route path="/tickets/:id/edit" element={<><UpdateTicketPage /></>} />
                <Route path="/user-account" element={<><UserAccount /></>} />
                <Route path="/" element={<><EntrancePage /></>} />
            </Routes>
        </Router>
    );
}

export default App;
