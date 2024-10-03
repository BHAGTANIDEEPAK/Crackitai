import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Feedback() {
  const location = useLocation();
  
  // Access the feedback passed from the InterviewQuestions component
  let feedback = location.state?.feedback || 'No feedback available';
  feedback = feedback.replaceAll('*', ''); // Clean up feedback
  console.log(feedback);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-orange-200 via-pink-100 to-white">
      <div className="bg-white shadow-lg rounded-lg p-8 md:w-3/4 lg:w-1/2 border border-gray-200">
      
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Feedback</h2>
        <div className='flex justify-around'>
        <p className="text-lg text-gray-600 text-center mb-4">Your performance review is ready.</p>
        <Link to="/dashboard">
          <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold py-2 px-4 rounded-lg shadow hover:from-blue-600 hover:to-purple-600 transition duration-300 mb-3">
            Return to Dashbaord
          </button>
          </Link>

        </div>

        <pre className="text-left text-gray-700 whitespace-pre-wrap break-words bg-gray-50 p-4 rounded-lg border border-gray-300">
          {feedback}
        </pre>
        <div className="flex justify-center mt-6">
        </div>
      </div>
    </div>
  );
}

