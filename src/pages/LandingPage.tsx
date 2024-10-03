// import { Link } from 'react-router-dom';

// export default function Home() {
//   return (
//     <div className="h-screen flex flex-col items-center justify-center bg-gray-100 py-4">
//       {/* Header Section */}
//       <div className="w-full bg-blue-600 text-white p-5 shadow-md">
//         <h1 className="text-xl text-center font-bold ">AI-Based Mock Interview Platform</h1>
//         <p className="text-lg text-center mt-2">
//           Get Ready for Real Interviews with AI-Powered Mock Sessions
//         </p>
//       </div>

//       {/* Main Content */}
//       <main className="w-3/4 bg-white rounded shadow-lg mt-8 p-8 flex flex-col lg:flex-row items-center justify-between">
//         {/* Left Section: Text Explanation */}
//         <div className="w-full lg:w-1/2 mb-8 lg:mb-0">
//           <h2 className="text-3xl font-bold mb-4">Ace Your Next Interview with AI</h2>
//           <p className="text-lg mb-4 pr-4">
//             Our platform offers personalized AI-based mock interviews tailored to your desired role.
//             Simply sign up, specify the job type (e.g., Full Stack Developer), add the required tech
//             stack, and let our AI interview you with 5-6 curated questions.
//           </p>
//           <p className="text-lg mb-4">
//             After completing the interview, you'll receive feedback with ratings on your responses,
//             correct answers, and detailed guidance on where you went wrong.
//           </p>
//           <div className="flex space-x-4">
//             {/* Link to Register */}
//             <Link to="/register">
//               <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition">
//                 Register
//               </button>
//             </Link>

//             {/* Link to Login */}
//             <Link to="/login">
//               <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700 transition">
//                 Login
//               </button>
//             </Link>
//           </div>
//         </div>

//         {/* Right Section: Image */}
//         <div className="w-full lg:w-1/2">
//           <img
//             src="https://via.placeholder.com/500" // Replace with relevant image
//             alt="AI Mock Interview"
//             className="w-full h-auto rounded-lg shadow-md"
//           />
//         </div>
//       </main>

//       {/* Footer Section */}
//       <footer className="w-full text-center mt-8 text-gray-700">
//         <p>&copy; 2024 AI Interview Platform. All rights reserved.</p>
//       </footer>
//     </div>
//   );
// }

import { Link } from 'react-router-dom';
import video from '../assests/Untitled video - Made with Clipchamp (15).mp4'

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
        <p className="text-lg text-gray-600 mt-4 text-center">
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
