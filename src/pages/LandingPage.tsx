
import { Link } from 'react-router-dom';
import video from '../assests/Updated_crackit_ai_intro.mp4'

export default function Dashboard() {
  return (
    <div className="h-screen flex flex-col items-center justify-between bg-gradient-to-r from-orange-200 via-pink-100 to-white">
      {/* Header Section */}
      <header className="w-full py-4 bg-white shadow-md flex justify-between items-center px-8">
        <div className="text-3xl font-bold text-orange-600">CrackIt AI</div>
        {/* <nav className="space-x-8 text-gray-700">
          <Link to="/interview-copilot" className="hover:text-orange-500">Interview Copilot™</Link>
          <Link to="/resume-builder" className="hover:text-orange-500">AI Resume Builder</Link>
          <Link to="/mock-interview" className="hover:text-orange-500">AI Mock Interview</Link>
          <Link to="/resources" className="hover:text-orange-500">Resources</Link>
          <Link to="/questions" className="hover:text-orange-500">Question Bank</Link>
        </nav> */}
        <div className="flex space-x-4">
          <Link to="/login" className="text-gray-700 hover:text-orange-500 mt-2">Sign In</Link>
          <Link to="/register">
            <button className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600 transition">Sign Up</button>
          </Link>
        </div>
      </header>

      {/* Middle Section */}
      <main className="w-3/4 flex flex-col items-center mt-8">
        {/* Video Section */}
        <div className="w-64 h-64 bg-gray-200 rounded-lg shadow-md flex items-center justify-center mb-6">
          <video
            className="w-full h-full object-cover rounded-lg"
            src={video} // Replace with real video link
            controls
            autoPlay
            muted
          >
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Text and Buttons */}
          <h1 className="text-4xl font-bold text-gray-900 text-center">
            Crush job interviews with AI.<br />Your AI-Powered Interview Copilot
          </h1>
          <p className="text-lg text-gray-600 mt-1 text-center">
            Real-Time Guidance to Ace Every Interview
          </p>
  

        <div className="flex space-x-4 mt-8">
          <Link to="/login">
          <button className="bg-orange-500 text-white py-2 px-6 rounded-lg hover:bg-orange-600 transition">
            Start Your Interview Prep
          </button>
          </Link>
          {/* <Link to="/login">
            <button className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition">
              Login
            </button>
          </Link>
          <Link to="/register">
            <button className="bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-600 transition">
              Sign Up
            </button>
          </Link> */}
        </div>
      </main>

      {/* Footer Section */}
      <footer className="w-full text-center py-4 mt-8 bg-gray-100 text-gray-500">
        <p>&copy; 2024 Crackit AI. All rights reserved.</p>
      </footer>
    </div>
  );
}
