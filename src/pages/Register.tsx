import { useState } from 'react';
import { signUpUser } from '../services/authService';
import { Link, useNavigate } from 'react-router-dom';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault(); 
    setIsLoading(true);
    setMessage('');
    const { error } = await signUpUser(email, password);
    
    setIsLoading(false);

    if (error) {
      setMessage(`Error: ${error.message}`);
    } else {
      setMessage('Sign up successful!');
      setTimeout(() => {
        navigate('/'); // Redirect to login page after sign-up
      }, 2000);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gradient-to-br from-orange-300 to-pink-300">
      <form onSubmit={handleSignUp} className="w-3/4 max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl bg-white p-8 shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Register</h1>
        
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        
        <button
          type="submit"
          className={`w-full text-white font-semibold py-2 rounded ${isLoading ? 'bg-gray-500 cursor-not-allowed' : 'bg-orange-500 hover:bg-orange-600 transition duration-200'}`}
          disabled={isLoading}
        >
          {isLoading ? 'Registering...' : 'Sign Up'}
        </button>
        
        {message && (
          <p className={`mt-4 text-center ${message.includes('Error') ? 'text-red-500' : 'text-green-500'}`}>
            {message}
          </p>
        )}
        
        <p className="mt-4 text-center text-gray-600">
          Already have an account? <Link to="/login" className="text-orange-500 hover:underline">Login</Link>
        </p>
      </form>
    </div>
  );
}
