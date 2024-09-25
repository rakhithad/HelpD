import { useState } from 'react';
import { auth } from '../firebase'; // Your firebase config
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const SignUpPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('customer'); // Default role is 'customer'
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            
            // Save user in MongoDB with their role
            await fetch('http://localhost:5000/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    uid: user.uid,
                    email,
                    password,
                    role,
                }),
            });

            console.log('User signed up and saved:', user);
            setEmail('');
            setPassword('');
        } catch (error) {
            console.error('Error signing up:', error);
        }
    };
    const handleDoneClick = () => {
        // Navigate to the admin page
        navigate('/admin-dashboard');
    };

    return (
        <div>
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                />
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="customer">Customer</option>
                    <option value="admin">Admin</option>
                    <option value="support_engineer">Support Engineer</option>
                </select>
                <button type="submit">Sign Up</button>
                <button onClick={handleDoneClick}>Done</button>
            </form>
        </div>
    );
};

export default SignUpPage;
