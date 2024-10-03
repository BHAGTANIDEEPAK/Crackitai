// import { useState } from 'react';
// import { logInUser } from '../services/authService';
// import { useNavigate } from 'react-router-dom';

// export default function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [message, setMessage] = useState('');
//   const navigate = useNavigate();

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const { error } = await logInUser(email, password);
//     if (error) {
//       setMessage(error.message);
//       console.log(error);
//     } else {
//       navigate('/dashboard');
//     }
//   };

//   return (
//     <div className="h-screen flex justify-center items-center">
//       <form onSubmit={handleLogin} className="w-1/3 bg-white p-6 shadow-md rounded">
//         <h1 className="text-xl mb-4">Login</h1>
//         <input
//           type="email"
//           placeholder="Email"
//           className="w-full p-2 mb-4 border"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           className="w-full p-2 mb-4 border"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <button type="submit" className="w-full bg-blue-500 text-white p-2">Login</button>
//         {message && <p className="mt-4">{message}</p>}
//       </form>
//     </div>
//   );
// }

import { useState } from 'react';
import { logInUser } from '../services/authService';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false); // New state for logging in status
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true); // Set logging in state to true
    const { error } = await logInUser(email, password);
    setIsLoggingIn(false); // Reset logging in state after the request

    if (error) {
      setMessage(error.message);
      console.log(error);
    } else {
      navigate('/dashboard',{state:{user:{email}}});
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
          {isLoggingIn ? 'Logging in...' : 'Login'} {/* Change text based on logging state */}
        </button>
        
        {message && <p className="mt-4 text-red-600 text-center">{message}</p>}
        
        <p className="mt-4 text-center text-gray-600">
          Don't have an account? <Link to="/register" className="text-orange-500 hover:underline">Register</Link>
        </p>
      </form>
    </div>
  );
}
