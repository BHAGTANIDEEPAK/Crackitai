import { useLocation, useNavigate } from 'react-router-dom'; 
import { logOutUser } from '../services/authService'; 

export default function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const userName = location.state?.user?.email; // Replace this with the actual user name from your auth state or context

  const handleLogout = async () => {
    await logOutUser();
    navigate('/login');
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-300 to-purple-300 p-6">
      <div className="absolute top-4 right-4">
        <button
          className="bg-red-500 text-white p-2 rounded shadow-md hover:bg-red-600 transition duration-200"
          onClick={handleLogout}
        >
          Log Out
        </button>
      </div>
      
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Welcome, {userName}!</h1>

      <button 
        className="bg-blue-500 text-white p-3 rounded shadow-md hover:bg-blue-600 transition duration-200 mt-4 mb-4"
        onClick={() => navigate('/interview')}
      >
        Add New Interview
      </button>

      <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md mt-3">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Interview History</h2>
        <p className="text-gray-600">Coming Soon...</p>
      </div>
    </div>
  );
}
