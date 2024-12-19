import { useState } from 'react';
import { logInUser, googleSignIn } from '../services/authService';
import { Link, useNavigate } from 'react-router-dom';
import appLogo from '../assests/images-removebg-preview.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    const { error } = await logInUser(email, password);
    setIsLoggingIn(false);

    if (error) {
      setMessage(error.message);
      console.log(error);
    } else {
      localStorage.setItem("userId", email);
      navigate('/dashboard', { state: { user: { email } } });
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoggingIn(true);
    const { data, error } = await googleSignIn({ redirectTo: "https://crackitai.netlify.app/dashboard" });
    console.log(data);
    console.log(error);
    setIsLoggingIn(false);

    if (error) {
      setMessage(error.message);
    } else {
      if (data?.user) {
        localStorage.setItem("userId", "" + data?.user);
        navigate('/dashboard', { state: { user: { email: data.user } } });
      } else if (data?.url) {
        window.location.href = data.url;
      } else {
        setMessage("Unexpected response from Google sign-in.");
      }
    }
  };

  return (
    <div className="px-6 h-screen flex justify-center items-center bg-gradient-to-br from-orange-300 to-pink-300">
      <form onSubmit={handleLogin} className="w-full max-w-md bg-white p-8 shadow-xl rounded-lg">
        <div className="text-center mb-6">
          <img src={appLogo} alt="App Logo" className="w-24 mx-auto mb-4 " />
          <h1 className="text-3xl font-semibold text-gray-800">Login</h1>
        </div>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-orange-500 text-white font-semibold py-2 rounded-lg hover:bg-orange-600 transition duration-200"
        >
          {isLoggingIn ? 'Logging in...' : 'Login'}
        </button>

        {message && <p className="mt-4 text-red-600 text-center">{message}</p>}

        <p className="mt-6 text-center text-gray-600">
          Don't have an account? <Link to="/register" className="text-orange-500 hover:underline">Register</Link>
        </p>

        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-4 text-gray-600">OR</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {/* Google Sign-In Button */}
        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition duration-200 flex items-center justify-center"
        >
           <FontAwesomeIcon icon={faGoogle} className="mr-2" /> {/* Google Icon */}
          Sign in with Google
        </button>
      </form>
    </div>
  );
}
