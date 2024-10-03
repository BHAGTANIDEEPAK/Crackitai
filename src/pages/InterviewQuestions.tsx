// import { useEffect, useState, useRef } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";

// export default function InterviewQuestions() {
//   const location = useLocation();
//   const videoRef = useRef<HTMLVideoElement | null>(null);
//   const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
//     null
//   );
//   const [isRecording, setIsRecording] = useState(false);
//   const [recordedText, setRecordedText] = useState<string[]>([]);
//   const [data, setData] = useState<string[]>([]);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [feedback, setFeedback] = useState<any[]>([]);
//   const [overallRating, setOverallRating] = useState<number | null>(null);
//   const [stream, setStream] = useState<MediaStream | null>(null);
//   const [isLoading, setIsLoading] = useState(false); // Loader state

//   const questions = Array.isArray(location.state?.questions)
//     ? location.state.questions
//     : [
//         "Question 1: What is JavaScript?",
//         "Question 2: Explain closures in JavaScript.",
//         "Question 3: What is a promise?",
//         "Question 4: Describe the event loop.",
//         "Question 5: How does prototypal inheritance work?",
//       ];

//   const navigate = useNavigate(); // Initialize useNavigate

//   useEffect(() => {
//     async function setupMedia() {
//       try {
//         const mediaStream = await navigator.mediaDevices.getUserMedia({
//           video: true,
//           audio: true,
//         });
//         setStream(mediaStream);
//         const recorder = new MediaRecorder(mediaStream);
//         recorder.ondataavailable = handleDataAvailable;
//         setMediaRecorder(recorder);

//         if (videoRef.current) {
//           videoRef.current.srcObject = mediaStream;
//         }
//       } catch (err) {
//         console.error("Error accessing media devices:", err);
//       }
//     }

//     setupMedia();

//     return () => {
//       stopMediaStream(); // Ensure media stream is stopped on unmount
//     };
//   }, []);

//   const handleDataAvailable = (event: BlobEvent) => {
//     // Handle the video blob if needed
//   };

//   const startRecording = () => {
//     if (mediaRecorder) {
//       mediaRecorder.start();
//       setIsRecording(true);
//     }
//   };

//   const stopRecording = () => {
//     if (mediaRecorder) {
//       mediaRecorder.stop();
//       setIsRecording(false);
//     }
//   };

//   const stopMediaStream = () => {
//     if (stream) {
//       // Stop all audio and video tracks
//       stream.getTracks().forEach((track) => {
//         track.stop(); // Stop the track and release resources
//       });
//       setStream(null); // Clear the stream state
//       console.log("All media tracks have been stopped.");
//     }
//     if (videoRef.current) {
//       videoRef.current.srcObject = null; // Clear the video stream
//     }
//   };

//   const saveToLocalStorage = (answers: string[]) => {
//     localStorage.setItem("userAnswers", JSON.stringify(answers));
//   };

//   const handleNextQuestion = () => {
//     if (currentQuestionIndex < questions.length - 1) {
//       setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
//     } else {
//       handleFinish(); // Call handleFinish if it's the last question
//     }
//   };

//   const handleSubmitAnswers = async () => {
//     const answers = localStorage.getItem("userAnswers");
//     if (!answers) {
//       alert("No answers saved!");
//       return;
//     }

//     const userAnswers = JSON.parse(answers);
//     setIsLoading(true); // Show loader

//     const partsArray = questions.map((question: string, index: number) => ({
//       text: `The following is a question and response from a user. Your task is to evaluate the user's answer, provide feedback in the following format: 
//       1. What was the user's response?
//       2. What should be the correct response?
//       3. Where can the user improve?
//       4. Give a rating out of 10.

//       Question: ${question}
//       User Response: ${userAnswers[index]}`,
//     }));

//     const requestBody = { contents: [{ parts: partsArray }] };

//     try {
//       const response = await axios.post(
//         `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyA2lxPX0CyzqoLlISol6Z9zdbJUv5fs31I`,
//         requestBody,
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       console.log(response);
//       const feedbackData = response.data.candidates[0].content.parts[0].text; // Extract feedback text
//       setData(feedbackData);

//       stopMediaStream(); // Stop the media stream before navigating
//       navigate("/interview/feedback", { state: { feedback: feedbackData } });
//       const feedbackEntries = feedbackData
//         .split("**Overall:**")[0]
//         .split(/\n\n/)
//         .filter((item: any) => item.trim() !== ""); // Split feedback per question

//       const feedbackArray = feedbackEntries.map((entry: any) => {
//         const parts = entry.split("\n");
//         return {
//           question: parts[0].replace(/.*Question:/, "").trim(),
//           userAnswer: parts[0]?.replace(/.*User Response:/, "").trim() || "",
//           correctAnswer:
//             parts[0]?.replace(/.*Correct Response:/, "").trim() || "",
//           feedback:
//             parts[0]?.replace(/.*Where can the user improve:/, "").trim() || "",
//           rating: parseFloat(parts[0]?.replace(/.*Rating:/, "").trim()) || 0,
//         };
//       });

//       setFeedback(feedbackArray);
//       setOverallRating(
//         response.data.candidates[0].content.parts[0].text.includes("Overall")
//           ? 0
//           : null
//       ); // Adjust as needed for overall rating
//     } catch (error) {
//       console.error("Error submitting answers:", error);
//     } finally {
//       setIsLoading(false); // Hide loader
//     }
//   };

//   const handleMicrophoneClick = () => {
//     if (!isRecording) {
//       startRecording();
//       const recognition = new (window as any).webkitSpeechRecognition();
//       recognition.lang = "en-US";
//       recognition.interimResults = false;

//       recognition.onresult = (event: any) => {
//         const result = event.results[0][0].transcript;
//         const newText = [...recordedText];
//         newText[currentQuestionIndex] = result; // Save response to current question index
//         setRecordedText(newText);
//         saveToLocalStorage(newText); // Save the answers after each recording
//       };

//       recognition.start();
//     } else {
//       stopRecording();
//     }
//   };

//   const handleFinish = async () => {
//     stopRecording();
//     await handleSubmitAnswers();
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center bg-gradient-to-r from-orange-200 via-pink-100 to-white">
//       <div className="flex flex-col lg:flex-row p-6 space-y-8 lg:space-y-0 lg:space-x-8 bg-gray-50 w-full max-w-6xl rounded-lg shadow-lg">
//         {/* Left Side: Questions and Answers */}
//         <div className="w-full lg:w-1/2">
//           <div className="bg-white p-6 rounded-lg shadow-md space-y-6 border border-gray-200">
//             <div className="border-b pb-4">
//               <h2 className="text-2xl font-semibold text-gray-900">
//                 {questions[currentQuestionIndex]}
//               </h2>
//               <div className="flex items-center space-x-4 mt-4">
//                 <button
//                   className={`p-3 rounded-lg shadow-md transition-all ${
//                     isRecording
//                       ? "bg-red-600 hover:bg-red-700"
//                       : "bg-green-600 hover:bg-green-700"
//                   } text-white focus:ring-4 focus:ring-green-300 focus:outline-none`}
//                   onClick={handleMicrophoneClick}
//                 >
//                   {isRecording ? "Stop Recording" : "Record Answer"}
//                 </button>
//                 {isRecording && (
//                   <p className="text-red-600 font-semibold">
//                     Answer is being recorded...
//                   </p>
//                 )}
//               </div>
//             </div>

//             <div className="flex justify-between mt-6">
//               <button
//                 className={`bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg transition-all shadow-md focus:ring-4 focus:ring-blue-300 focus:outline-none ${
//                   isRecording ? "opacity-50 cursor-not-allowed" : ""
//                 }`}
//                 onClick={handleNextQuestion}
//                 disabled={isRecording} // Disable if recording is active
//                 title="Move to the next question"
//               >
//                 Next Question
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Right Side: Video */}
//         <div className="w-full lg:w-1/2 flex flex-col items-center space-y-6">
//           <div className="bg-white p-6 rounded-lg shadow-md w-full flex flex-col items-center">
//             <h2 className="text-2xl font-semibold text-gray-900 mb-4">
//               Your Video Feed
//             </h2>
//             <video
//               ref={videoRef}
//               autoPlay
//               playsInline
//               muted
//               className="w-full lg:w-3/4 rounded-lg shadow-lg border border-gray-200"
//               style={{ aspectRatio: "16/9" }}
//             />
//             <div className="w-full flex justify-center mt-4">
//               <button
//                 className={`bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg shadow-md transition-all focus:ring-4 focus:ring-blue-300 focus:outline-none ${
//                   isSubmitting ? "opacity-50 cursor-not-allowed" : ""
//                 }`}
//                 onClick={handleFinish}
//                 disabled={isSubmitting}
//                 title="Finish the interview and submit answers"
//               >
//                 {isSubmitting ? "Submitting..." : "Finish Interview"}
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Loading Indicator */}
//         {isLoading && (
//           <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//             <div className="loader">Loading...</div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// import { useEffect, useState, useRef } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";

// export default function InterviewQuestions() {
//   const location = useLocation();
//   const videoRef = useRef<HTMLVideoElement | null>(null);
//   const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
//   const [isRecording, setIsRecording] = useState(false);
//   const [recordedText, setRecordedText] = useState<string[]>([]);
//   const [interimText, setInterimText] = useState<string>(""); // Store interim speech text
//   const [data, setData] = useState<string[]>([]);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [feedback, setFeedback] = useState<any[]>([]);
//   const [overallRating, setOverallRating] = useState<number | null>(null);
//   const [stream, setStream] = useState<MediaStream | null>(null);
//   const [isLoading, setIsLoading] = useState(false); // Loader state

//   const questions = Array.isArray(location.state?.questions)
//     ? location.state.questions
//     : [
//         "Question 1: What is JavaScript?",
//         "Question 2: Explain closures in JavaScript.",
//         "Question 3: What is a promise?",
//         "Question 4: Describe the event loop.",
//         "Question 5: How does prototypal inheritance work?",
//       ];

//   const navigate = useNavigate(); // Initialize useNavigate

//   useEffect(() => {
//     async function setupMedia() {
//       try {
//         const mediaStream = await navigator.mediaDevices.getUserMedia({
//           video: true,
//           audio: true,
//         });
//         setStream(mediaStream);
//         const recorder = new MediaRecorder(mediaStream);
//         recorder.ondataavailable = handleDataAvailable;
//         setMediaRecorder(recorder);

//         if (videoRef.current) {
//           videoRef.current.srcObject = mediaStream;
//         }
//       } catch (err) {
//         console.error("Error accessing media devices:", err);
//       }
//     }

//     setupMedia();

//     return () => {
//       stopMediaStream(); // Ensure media stream is stopped on unmount
//     };
//   }, []);

//   const handleDataAvailable = (event: BlobEvent) => {
//     // Handle the video blob if needed
//   };

//   const startRecording = () => {
//     if (mediaRecorder) {
//       mediaRecorder.start();
//       setIsRecording(true);
//     }
//   };

//   const stopRecording = () => {
//     if (mediaRecorder) {
//       mediaRecorder.stop();
//       setIsRecording(false);
//     }
//   };

//   const stopMediaStream = () => {
//     if (stream) {
//       // Stop all audio and video tracks
//       stream.getTracks().forEach((track) => {
//         track.stop(); // Stop the track and release resources
//       });
//       setStream(null); // Clear the stream state
//       console.log("All media tracks have been stopped.");
//     }
//     if (videoRef.current) {
//       videoRef.current.srcObject = null; // Clear the video stream
//     }
//   };

//   const saveToLocalStorage = (answers: string[]) => {
//     localStorage.setItem("userAnswers", JSON.stringify(answers));
//   };

//   const handleNextQuestion = () => {
//     if (currentQuestionIndex < questions.length - 1) {
//       setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
//     } else {
//       handleFinish(); // Call handleFinish if it's the last question
//     }
//   };

//   const handleSubmitAnswers = async () => {
//     const answers = localStorage.getItem("userAnswers");
//     if (!answers) {
//       alert("No answers saved!");
//       return;
//     }

//     const userAnswers = JSON.parse(answers);
//     setIsLoading(true); // Show loader

//     const partsArray = questions.map((question: string, index: number) => ({
//       text: `The following is a question and response from a user. Your task is to evaluate the user's answer, provide feedback in the following format: 
//       1. What was the user's response?
//       2. What should be the correct response?
//       3. Where can the user improve?
//       4. Give a rating out of 10.

//       Question: ${question}
//       User Response: ${userAnswers[index]}`,
//     }));

//     const requestBody = { contents: [{ parts: partsArray }] };

//     try {
//       const response = await axios.post(
//         `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyA2lxPX0CyzqoLlISol6Z9zdbJUv5fs31I`,
//         requestBody,
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       console.log(response);
//       const feedbackData = response.data.candidates[0].content.parts[0].text; // Extract feedback text
//       setData(feedbackData);

//       stopMediaStream(); // Stop the media stream before navigating
//       navigate("/interview/feedback", { state: { feedback: feedbackData } });
//       const feedbackEntries = feedbackData
//         .split("**Overall:**")[0]
//         .split(/\n\n/)
//         .filter((item: any) => item.trim() !== ""); // Split feedback per question

//       const feedbackArray = feedbackEntries.map((entry: any) => {
//         const parts = entry.split("\n");
//         return {
//           question: parts[0].replace(/.*Question:/, "").trim(),
//           userAnswer: parts[0]?.replace(/.*User Response:/, "").trim() || "",
//           correctAnswer:
//             parts[0]?.replace(/.*Correct Response:/, "").trim() || "",
//           feedback:
//             parts[0]?.replace(/.*Where can the user improve:/, "").trim() || "",
//           rating: parseFloat(parts[0]?.replace(/.*Rating:/, "").trim()) || 0,
//         };
//       });

//       setFeedback(feedbackArray);
//       setOverallRating(
//         response.data.candidates[0].content.parts[0].text.includes("Overall")
//           ? 0
//           : null
//       ); // Adjust as needed for overall rating
//     } catch (error) {
//       console.error("Error submitting answers:", error);
//     } finally {
//       setIsLoading(false); // Hide loader
//     }
//   };

//   const handleMicrophoneClick = () => {
//     if (!isRecording) {
//       startRecording();
//       const recognition = new (window as any).webkitSpeechRecognition();
//       recognition.lang = "en-US";
//       recognition.interimResults = true; // Enable interim results for real-time display
//       recognition.continuous = true; // Ensures the recognition keeps going even after a pause

//       recognition.onresult = (event: any) => {
//         let interim = "";
//         for (let i = event.resultIndex; i < event.results.length; i++) {
//           const result = event.results[i][0].transcript;
//           if (event.results[i].isFinal) {
//             const newText = [...recordedText];
//             newText[currentQuestionIndex] = result; // Save final result to the current question index
//             setRecordedText(newText);
//             saveToLocalStorage(newText); // Save the answers after each recording
//             setInterimText(""); // Clear interim text after final result
//           } else {
//             interim += result; // Append interim results
//           }
//         }
//         setInterimText(interim); // Update interim text in state
//       };

//       recognition.start();
//     } else {
//       stopRecording();
//     }
//   };

//   const handleFinish = async () => {
//     stopRecording();
//     await handleSubmitAnswers();
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center bg-gradient-to-r from-orange-200 via-pink-100 to-white">
//       <div className="flex flex-col lg:flex-row p-6 space-y-8 lg:space-y-0 lg:space-x-8 bg-gray-50 w-full max-w-6xl rounded-lg shadow-lg">
//         {/* Left Side: Questions and Answers */}
//         <div className="w-full lg:w-1/2">
//           <div className="bg-white p-6 rounded-lg shadow-md space-y-6 border border-gray-200">
//             <div className="border-b pb-4">
//               <h2 className="text-2xl font-semibold text-gray-900">
//                 {questions[currentQuestionIndex]}
//               </h2>
//               <div className="flex items-center space-x-4 mt-4">
//                 <button
//                   className={`p-3 rounded-lg shadow-md transition-all ${
//                     isRecording
//                       ? "bg-red-600 text-white hover:bg-red-700"
//                       : "bg-blue-600 text-white hover:bg-blue-700"
//                   }`}
//                   onClick={handleMicrophoneClick}
//                 >
//                   {isRecording ? "Stop" : "Record"}
//                 </button>

//                 {/* Added the Next button */}
//                 <button
//                   className="bg-green-500 text-white p-3 rounded-lg shadow-md hover:bg-green-600 transition-all"
//                   onClick={handleNextQuestion}
//                   disabled={isSubmitting} // Disable when submitting
//                 >
//                   Next Question
//                 </button>
//               </div>
//             </div>

//             {/* Real-time speech text */}
//             <div className="mt-6">
//               <p className="text-sm font-medium text-gray-900">
//                 {interimText || recordedText[currentQuestionIndex] || "Speak your answer..."}
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Right Side: Video */}
//         <div className="w-full lg:w-1/2 flex items-center justify-center">
//           <video
//             ref={videoRef}
//             autoPlay
//             playsInline
//             muted
//             className="w-full max-w-md rounded-lg shadow-md"
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

import { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function InterviewQuestions() {
  const location = useLocation();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedText, setRecordedText] = useState<string[]>([]);
  const [interimText, setInterimText] = useState<string>(""); // Store interim speech text
  const [data, setData] = useState<string[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<any[]>([]);
  const [overallRating, setOverallRating] = useState<number | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isLoading, setIsLoading] = useState(false); // Loader state
  const [error,setError] = useState<string>('');
  const [recognitionInstance, setRecognitionInstance] = useState<any>(null); // Speech recognition instance
  const [audioStream, setAudioStream] = useState<MediaStream | null>(null); // Separate audio stream
  const [videoStream, setVideoStream] = useState<MediaStream | null>(null); // Separate video stream

  const questions = Array.isArray(location.state?.questions)
    ? location.state.questions
    : [
        "Question 1: What is JavaScript?",
        "Question 2: Explain closures in JavaScript.",
        "Question 3: What is a promise?",
        "Question 4: Describe the event loop.",
        "Question 5: How does prototypal inheritance work?",
      ];
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    async function setupMedia() {
      try {
        const video = await navigator.mediaDevices.getUserMedia({ video: true });
        const audio = await navigator.mediaDevices.getUserMedia({ audio: true });
        setVideoStream(video);
        setAudioStream(audio);


        const recorder = new MediaRecorder(audio); // Use only audio for recording
        recorder.ondataavailable = handleDataAvailable;
        setMediaRecorder(recorder);
  
        if (videoRef.current) {
          videoRef.current.srcObject = video;
        }
      } catch (err) {
        setError("Error accessing media devices:")
        console.error("Error accessing media devices:", err);
      }
    }

    setupMedia();

    return () => {
      stopMediaStream(); // Ensure media stream is stopped on unmount
    };
  }, []);

  const handleDataAvailable = (event: BlobEvent) => {
    // Handle the video blob if needed
  };

  const startRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.start();
      setIsRecording(true);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setIsRecording(false);
    }
  };

  const stopMediaStream = () => {
    // Stop the audio stream if it exists
    if (audioStream) {
      audioStream.getTracks().forEach((track) => {
        if (track.readyState === "live") {
          track.stop(); // Stop the live audio track
        }
      });
      setAudioStream(null); // Clear the audio stream state
      console.log("Audio tracks have been stopped.");
    }
  
    // Stop the video stream if it exists
    if (videoStream) {
      videoStream.getTracks().forEach((track) => {
        if (track.readyState === "live") {
          track.stop(); // Stop the live video track
        }
      });
      setVideoStream(null); // Clear the video stream state
      console.log("Video tracks have been stopped.");
    }
  
    // Clear the video element's source if it exists
    if (videoRef.current) {
      videoRef.current.srcObject = null; // Clear the video stream from the video element
      console.log("Video stream has been cleared from the video element.");
    }
  };

  const saveToLocalStorage = (answers: string[]) => {
    try {
      localStorage.setItem("userAnswers", JSON.stringify(answers));
    } catch (e) {
      console.error('Error saving to localStorage', e);
      setError('Unable to save answers to local storage.');
    }
  };
  

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      handleFinish(); // Call handleFinish if it's the last question
    }
  };

  const handleSubmitAnswers = async () => {
    const answers = localStorage.getItem("userAnswers");
    if (!answers) {
      alert("No answers saved!");
      return;
    }

    const userAnswers = JSON.parse(answers);
    setIsLoading(true); // Show loader

    const partsArray = questions.map((question: string, index: number) => ({
      text: `The following is a question and response from a user. Your task is to evaluate the user's answer, provide feedback in the following format: 
      1. What was the user's response?
      2. What should be the correct response?
      3. Where can the user improve?
      4. Give a rating out of 10.

      Question: ${question}
      User Response: ${userAnswers[index]}`,
    }));

    const requestBody = { contents: [{ parts: partsArray }] };

    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyA2lxPX0CyzqoLlISol6Z9zdbJUv5fs31I`,
        requestBody,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      const feedbackData = response.data.candidates[0].content.parts[0].text; // Extract feedback text
      setData(feedbackData);

      stopMediaStream(); // Stop the media stream before navigating
      navigate("/interview/feedback", { state: { feedback: feedbackData } });
      const feedbackEntries = feedbackData
        .split("**Overall:**")[0]
        .split(/\n\n/)
        .filter((item: any) => item.trim() !== ""); // Split feedback per question

      const feedbackArray = feedbackEntries.map((entry: any) => {
        const parts = entry.split("\n");
        return {
          question: parts[0].replace(/.*Question:/, "").trim(),
          userAnswer: parts[0]?.replace(/.*User Response:/, "").trim() || "",
          correctAnswer:
            parts[0]?.replace(/.*Correct Response:/, "").trim() || "",
          feedback:
            parts[0]?.replace(/.*Where can the user improve:/, "").trim() || "",
          rating: parseFloat(parts[0]?.replace(/.*Rating:/, "").trim()) || 0,
        };
      });

      setFeedback(feedbackArray);
      setOverallRating(
        response.data.candidates[0].content.parts[0].text.includes("Overall")
          ? 0
          : null
      ); // Adjust as needed for overall rating
    } catch (error) {
      console.error("Error submitting answers:", error);
    } finally {
      setIsLoading(false); // Hide loader
    }
  };

  const handleMicrophoneClick = () => {
    if (!isRecording) {
      startRecording();
      const recognition = new ((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition)();
      recognition.lang = "en-US";
      recognition.interimResults = true;
      recognition.continuous = true; // Keeps listening even after pauses

      if (!('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
        console.error('SpeechRecognition API not supported in this browser.');
        setError('Speech recognition is not supported on this device.');
        return;
      }
      

      recognition.onresult = (event: any) => {
        let interim = "";

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const result = event.results[i][0].transcript;
          console.log('Final Result:', event.results[i].isFinal, result);

          if (event.results[i].isFinal) {
            // Concatenate final results with previous response for current question
            setRecordedText((prevText) => {
              const updatedText = [...prevText]; // Copy previous text
              const currentAnswer = updatedText[currentQuestionIndex] || ""; // Get current response if any
              updatedText[currentQuestionIndex] = currentAnswer + " " + result; // Concatenate new result
              saveToLocalStorage(updatedText); // Save updated text to local storage
              return updatedText;
            });
            setInterimText(""); // Clear interim text on final result
          } else {
            interim += result; // Keep updating interim text
          }
        }

        setInterimText(interim); // Display the interim results
      };

      recognition.onerror = (event: any) => {
        console.error("Speech recognition error", event);
        setError("Error with speech recognition: " + event.error);
      };

      recognition.start();
      setRecognitionInstance(recognition); // Store the recognition instance
    } else {
      stopRecording();
      if (recognitionInstance) {
        recognitionInstance.stop();
        setRecognitionInstance(null); // Reset recognition instance
      }
    }
  };

  const handleFinish = async () => {
    stopRecording();
    await handleSubmitAnswers();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center bg-gradient-to-r from-orange-200 via-pink-100 to-white">
      <div className="flex flex-col lg:flex-row p-6 space-y-8 lg:space-y-0 lg:space-x-8 bg-gray-50 w-full max-w-6xl rounded-lg shadow-lg">
        {/* Left Side: Questions and Answers */}
        <div className="w-full lg:w-1/2">
          <div className="bg-white p-6 rounded-lg shadow-md space-y-6 border border-gray-200">
            <div className="border-b pb-4">
              <h2 className="text-2xl font-semibold text-gray-900">
                {questions[currentQuestionIndex]}
              </h2>
              <div className="flex items-center space-x-4 mt-4">
                <button
                  className={`p-3 rounded-lg shadow-md transition-all ${
                    isRecording
                      ? "bg-red-600 text-white hover:bg-red-700"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
                  onClick={handleMicrophoneClick}
                >
                  {isRecording ? "Stop" : "Record"}
                </button>

                {/* Next Button */}
                <button
                  className="bg-green-500 text-white p-3 rounded-lg shadow-md hover:bg-green-600 transition-all"
                  onClick={handleNextQuestion}
                  disabled={isSubmitting} // Disable when submitting
                >
                  Next Question
                </button>
                <p>{error}</p>
              </div>
            </div>

            {/* Real-time speech text */}
            <div className="mt-6">
              <p className="text-sm font-medium text-gray-900">
                {interimText || recordedText[currentQuestionIndex] || "Speak your answer..."}
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Video */}
        <div className="w-full lg:w-1/2 flex items-center justify-center">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full max-w-md rounded-lg shadow-md"
          />
        </div>
        {/* Loading Indicator */}
        {isLoading && (
  <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-full flex items-center justify-center bg-opacity-50 z-50">
    <div className="loader flex items-center justify-center">
      {/* Loader animation (you can customize this part) */}
      <svg
        className="animate-spin h-10 w-10 text-blue-950"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        />
      </svg>
      <p>Getting your feedback...</p>
      
    </div>
   
  </div>
)}
      </div>
    </div>
  );
}
