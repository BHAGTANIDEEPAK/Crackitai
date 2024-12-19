// import { useState } from 'react';
// import { logInUser } from '../services/authService';
// import { Link, useNavigate } from 'react-router-dom';

// export default function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [message, setMessage] = useState('');
//   const [isLoggingIn, setIsLoggingIn] = useState(false); // New state for logging in status
//   const navigate = useNavigate();

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoggingIn(true); // Set logging in state to true
//     const { error } = await logInUser(email, password);
//     setIsLoggingIn(false); // Reset logging in state after the request

//     if (error) {
//       setMessage(error.message);
//       console.log(error);
//     } else {
//       localStorage.setItem("userId",email);
//       navigate('/dashboard',{state:{user:{email}}});
//     }
//   };

//   return (
//     <div className="h-screen flex justify-center items-center bg-gradient-to-br from-orange-300 to-pink-300">
//       <form onSubmit={handleLogin} className="w-3/4 max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl bg-white p-8 shadow-lg rounded-lg">
//         <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Login</h1>
        
//         <input
//           type="email"
//           placeholder="Email"
//           className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
        
//         <input
//           type="password"
//           placeholder="Password"
//           className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
        
//         <button type="submit" className="w-full bg-orange-500 text-white font-semibold py-2 rounded hover:bg-orange-600 transition duration-200">
//           {isLoggingIn ? 'Logging in...' : 'Login'} {/* Change text based on logging state */}
//         </button>
        
//         {message && <p className="mt-4 text-red-600 text-center">{message}</p>}
        
//         <p className="mt-4 text-center text-gray-600">
//           Don't have an account? <Link to="/register" className="text-orange-500 hover:underline">Register</Link>
//         </p>
//       </form>
//     </div>
//   );
// }

import { useState } from 'react';
import { logInUser, googleSignIn } from '../services/authService'; // Import googleSignIn from authService
import { Link, useNavigate } from 'react-router-dom';

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
        // If data contains a user, we can safely access data.user
        localStorage.setItem("userId", ""+data?.user);
        navigate('/dashboard', { state: { user: { email: data.user } } });
      } else if (data?.url) {
        // If data contains a URL (OAuth flow URL), redirect to it
        window.location.href = data.url;
      } else {
        setMessage("Unexpected response from Google sign-in.");
      }
    }
  };
  
  

  return (
    <div className="h-screen flex justify-center items-center bg-gradient-to-br from-orange-300 to-pink-300">
      <form onSubmit={handleLogin} className="w-3/4 max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl bg-white p-8 shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Login</h1>
        
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
        
        <button type="submit" className="w-full bg-orange-500 text-white font-semibold py-2 rounded hover:bg-orange-600 transition duration-200">
          {isLoggingIn ? 'Logging in...' : 'Login'}
        </button>
        
        {message && <p className="mt-4 text-red-600 text-center">{message}</p>}
        
        <p className="mt-4 text-center text-gray-600">
          Don't have an account? <Link to="/register" className="text-orange-500 hover:underline">Register</Link>
        </p>

        {/* Google Sign-In Button */}
        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="w-full mt-4 bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition duration-200"
        >
          Sign in with Google
        </button>
      </form>
    </div>
  );
}
