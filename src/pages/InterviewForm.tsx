import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function InterviewForm() {
  const [position, setPosition] = useState('');
  const [techStack, setTechStack] = useState('');
  const [experience, setExperience] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const API_KEY = 'AIzaSyA2lxPX0CyzqoLlISol6Z9zdbJUv5fs31I'; // Replace with your actual API key

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Prepare the request payload
      const requestBody = {
        contents: [
          {
            parts: [
              {
                text: `Generate 5 interview questions for a ${position} position with ${techStack} tech stack and ${experience} experience level. Your response should be only questions formatted like: Question1: What is a promise in JS? And i want only 5 question no extra line or nothing because i will be passing this data to the api as it is so it must contain 5 questions in the response.`
              }
            ]
          }
        ]
      };

      // Call Gemini AI's API to generate questions
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${API_KEY}`,
        requestBody,
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );
      console.log(response);

      // Access the generated questions from the response
      const questions = response.data.candidates[0].content.parts[0].text;
      const questionsArray = questions.split('\n'); // Adjust based on the actual response structure
      if(questionsArray[questionsArray.length-1] == ""){
        questionsArray.pop();
      }
      console.log(questionsArray);

      // Navigate to the questions page with the generated questions
      navigate('/interview/questions', { state: { questions: questionsArray } });
    } catch (err) {
      // Handle error gracefully
      setError('Error generating questions, please try again.');
      console.error(err); // Log the error for debugging
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-300 to-purple-300 p-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Add Interview</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-6 shadow-lg rounded">
        <input
          type="text"
          placeholder="Position"
          className="w-full p-3 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={position}
          required
          onChange={(e) => setPosition(e.target.value)}
        />
        <input
          type="text"
          placeholder="Tech Stack"
          className="w-full p-3 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={techStack}
          required
          onChange={(e) => setTechStack(e.target.value)}
        />
        <input
          type="number"
          placeholder="Experience Level"
          className="w-full p-3 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={experience}
          required
          onChange={(e) => setExperience(e.target.value)}
        />
        <button
          type="submit"
          className={`w-full text-white p-3 rounded shadow-md ${loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'} transition duration-200`}
          disabled={loading}
        >
          {loading ? 'Generating Questions...' : 'Submit'}
        </button>
        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
      </form>
    </div>
  );
}
