import { useState } from 'react';
import { signUpUser, googleSignIn } from '../services/authService'; // Import googleSignIn from authService
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

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

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    const { data, error } = await googleSignIn({ redirectTo: "https://crackitai.netlify.app/dashboard" });
    console.log(data);
    console.log(error);
    setIsLoading(false);

    if (error) {
      setMessage(error.message);
    } else {
      if (data?.user) {
        localStorage.setItem("userId", ""+data?.user);
        navigate('/dashboard', { state: { user: { email: data.user } } });
      } else if (data?.url) {
        window.location.href = data.url;
      } else {
        setMessage("Unexpected response from Google sign-in.");
      }
    }
  };

  return (
    <div className="px-6 h-screen flex justify-center items-center bg-gradient-to-br from-teal-300 to-cyan-300">
      <form onSubmit={handleSignUp} className="w-full max-w-md bg-white p-8 shadow-xl rounded-lg">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-semibold text-gray-800">Create an Account</h1>
          <p className="text-gray-500 mt-2">Join us to access awesome features!</p>
        </div>
        
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        
        <button
          type="submit"
          className={`w-full text-white font-semibold py-2 rounded ${isLoading ? 'bg-gray-500 cursor-not-allowed' : 'bg-teal-500 hover:bg-teal-600 transition duration-200'}`}
          disabled={isLoading}
        >
          {isLoading ? 'Registering...' : 'Sign Up'}
        </button>
        
        {message && (
          <p className={`mt-4 text-center ${message.includes('Error') ? 'text-red-500' : 'text-green-500'}`}>
            {message}
          </p>
        )}

        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-4 text-gray-600">OR</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition duration-200 flex items-center justify-center"
        >
        <FontAwesomeIcon icon={faGoogle} className="mr-2" /> {/* Google Icon */}
          Sign in with Google
        </button>
        
        <p className="mt-4 text-center text-gray-600">
          Already have an account? <Link to="/login" className="text-teal-500 hover:underline">Login</Link>
        </p>
      </form>
    </div>
  );
}
