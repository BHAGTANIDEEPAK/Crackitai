// import { useLocation, useNavigate } from 'react-router-dom'; 
// import { logOutUser } from '../services/authService'; 
// import { useEffect, useState } from 'react';
// import axios from 'axios';


// export default function Dashboard() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const userName = location.state?.user?.email; // Replace this with the actual user name from your auth state or context
//   const [Interviews,setInterviews] = useState<[]>([])

//   useEffect(()=>{
//     const token = localStorage.getItem("sb-yllkntrkoceuslzbbnzo-auth-token");

// if (token) {
//   try {
//     // Parse the token string into a JavaScript object
//     const parsedToken = JSON.parse(token);

//     // Access the email from the user object
//     const email = parsedToken.user?.email;

//     // Log the email to the console
//     console.log("Email:", email);
//     localStorage.setItem("userId",email);
//   } catch (error) {
//     console.error("Error parsing token", error);
//   }
// } else {
//   console.log("Token not found in localStorage.");
// }

//     async function getInterviewHistory(){
//       try{
//         const response: any = await axios.get("http://localhost:9090/getInterviews/"+userName);
//         console.log(response.data); 
//         setInterviews(response.data);

//       }
//       catch(error){
//         console.log(error);
//       }
//     }

//     getInterviewHistory();
//     console.log(Interviews);

//   },[])

//   const handleLogout = async () => {
//     await logOutUser();
//     localStorage.clear();
//     navigate('/login');
//   };

//   return (
//     <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-300 to-purple-300 p-6">
//       <div className="absolute top-4 right-4">
//         <button
//           className="bg-red-500 text-white p-2 rounded shadow-md hover:bg-red-600 transition duration-200"
//           onClick={handleLogout}
//         >
//           Log Out
//         </button>
//       </div>
      
//       <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Welcome,{localStorage.getItem("userId")}!</h1>

//       <button 
//         className="bg-blue-500 text-white p-3 rounded shadow-md hover:bg-blue-600 transition duration-200 mt-4 mb-4"
//         onClick={() => navigate('/interview', {state: {email: userName}})}
//       >
//         Add New Interview
//       </button>

//       {
//         Interviews.length > 0 ? (
//         <div>
//           <h2 className="text-xl text-center font-semibold text-gray-800 mb-4">Interview History</h2>
//           {/* <p className="text-gray-600">Coming Soon...</p> */}
//           <div >
//               <ul className='grid grid-cols-4 gap-3'>
//                 {
//                   Interviews.map((interview:any, index:number)=>(
//                     <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md mt-3">
//                       <li key={index} className='mb-2'>
//                         <strong>Positon: </strong> {interview.Position} <br />
//                         <strong>TechStack: </strong> {interview.Techstack} <br />
//                         <strong>Experience: </strong> {interview.Experience} year <br />
//                         {/* <strong>Feedback: </strong> {interview.Feedback} */}
                      
//                      </li>
//                     </div>
//                   ))
//                 }
//               </ul>
//             </div>
//         </div>
//         ) : (
//           <p className="text-gray-600">No Interviews Found</p>
//         )
//       }
//     </div>
//   );
// }


// import { useLocation, useNavigate } from 'react-router-dom'; 
// import { logOutUser } from '../services/authService'; 
// import { useEffect, useState } from 'react';
// import axios from 'axios';

// export default function Dashboard() {
//   const navigate = useNavigate();
//   const location = useLocation();
  
//   const [userEmail, setUserEmail] = useState<string | null>(null); // State to store user email
//   const [Interviews, setInterviews] = useState<[]>([]);
//   const [isLoading, setIsLoading] = useState<boolean>(true); // Loading state

//   useEffect(() => {
//     // Start an interval to continuously check localStorage for sb-yllkntrkoceuslzbbnzo-auth-token
//     const intervalId = setInterval(() => {
//       const token = localStorage.getItem("sb-yllkntrkoceuslzbbnzo-auth-token");

//       if (token) {
//         try {
//           const parsedToken = JSON.parse(token);
//           const email = parsedToken.user?.email;
//           setUserEmail(email); // Update email when token is found
//           clearInterval(intervalId); // Clear the interval after finding the token
//         } catch (error) {
//           console.error("Error parsing token", error);
//         }
//       }
//     }, 1000); // Check every 1 second

//     return () => clearInterval(intervalId); // Clean up the interval when the component unmounts

//   }, []);

//   useEffect(() => {
//     async function getInterviewHistory() {
//       try {
//         const response: any = await axios.get(`http://localhost:9090/getInterviews/${userEmail}`);
//         console.log(response.data);
//         setInterviews(response.data);
//       } catch (error) {
//         console.log(error);
//       } finally {
//         setIsLoading(false); // Set loading to false after the API call is done
//       }
//     }
//     // If the userEmail is set, fetch interview history
//     if (userEmail) {

//       getInterviewHistory();
//     }
//   }, [userEmail]); // Fetch interviews when userEmail changes

//   const handleLogout = async () => {
//     await logOutUser();
//     localStorage.clear();
//     navigate('/login');
//   };

//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center h-screen">
        
// <ul className="max-w-md space-y-2 text-gray-500 list-inside dark:text-gray-400">
//     <li className="flex items-center">
//         <svg className="w-4 h-4 me-2 text-green-500 dark:text-green-400 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
//             <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
//         </svg>
//         Authentication
//     </li>
//     <li className="flex items-center">
//         <svg className="w-4 h-4 me-2 text-green-500 dark:text-green-400 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
//             <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
//         </svg>
//         Saving Account Details
//     </li>
//     <li className="flex items-center">
//         <div role="status">
//             <svg aria-hidden="true" className="w-4 h-4 me-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/></svg>
//             <span className="sr-only">Loading...</span>
//         </div>
//         Sign In
//     </li>
// </ul>

//       </div>
//     );
//   }

//   return (
//     <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-300 to-purple-300 p-6">
//       <div className="absolute top-4 right-4">
//         <button
//           className="bg-red-500 text-white p-2 rounded shadow-md hover:bg-red-600 transition duration-200"
//           onClick={handleLogout}
//         >
//           Log Out
//         </button>
//       </div>
      
//       <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Welcome, {userEmail || "Loading..."}</h1>

//       <button 
//         className="bg-blue-500 text-white p-3 rounded shadow-md hover:bg-blue-600 transition duration-200 mt-4 mb-4"
//         onClick={() => navigate('/interview', { state: { email: userEmail } })}
//       >
//         Add New Interview
//       </button>

//       {
//         Interviews.length > 0 ? (
//           <div>
//             <h2 className="text-xl text-center font-semibold text-gray-800 mb-4">Interview History</h2>
//             <div>
//               <ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
//                 {
//                   Interviews.map((interview: any, index: number) => (
//                     <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md mx-auto mt-3" key={index}>
//                       <li className='mb-2'>
//                         <strong>Position: </strong> {interview.Position} <br />
//                         <strong>TechStack: </strong> {interview.Techstack} <br />
//                         <strong>Experience: </strong> {interview.Experience} year <br />
//                       </li>
//                     </div>
//                   ))
//                 }
//               </ul>
//             </div>
//           </div>
//         ) : (
//           <p className="text-gray-600">No Interviews Found</p>
//         )
//       }
//     </div>
//   );
// }


import { useLocation, useNavigate } from 'react-router-dom'; 
import { logOutUser } from '../services/authService'; 
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [userEmail, setUserEmail] = useState<string | null>(null); // State to store user email
  const [Interviews, setInterviews] = useState<[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  useEffect(() => {
    // Start an interval to continuously check localStorage for sb-yllkntrkoceuslzbbnzo-auth-token
    const intervalId = setInterval(() => {
      const token = localStorage.getItem("sb-yllkntrkoceuslzbbnzo-auth-token");

      if (token) {
        try {
          const parsedToken = JSON.parse(token);
          const email = parsedToken.user?.email;
          setUserEmail(email); // Update email when token is found
          clearInterval(intervalId); // Clear the interval after finding the token
        } catch (error) {
          console.error("Error parsing token", error);
        }
      }
    }, 1000); // Check every 1 second

    return () => clearInterval(intervalId); // Clean up the interval when the component unmounts

  }, []);

  useEffect(() => {
    async function getInterviewHistory() {
      try {
        const response: any = await axios.get(`http://localhost:9090/getInterviews/${userEmail}`);
        console.log(response.data);
        setInterviews(response.data);
      } catch (error) {
        console.log(error);
        setError("Failed to fetch interview history.");
      } finally {
        setIsLoading(false); // Set loading to false after the API call is done
      }
    }
    if (userEmail) {
      getInterviewHistory();
    }
  }, [userEmail]);

  const handleLogout = async () => {
    await logOutUser();
    localStorage.clear();
    navigate('/login');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div role="status">
          <svg aria-hidden="true" className="w-4 h-4 me-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

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
      
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Welcome, {userEmail || "Loading..."}</h1>

      <button 
        className="bg-blue-500 text-white p-3 rounded shadow-md hover:bg-blue-600 transition duration-200 mt-4 mb-4"
        onClick={() => navigate('/interview', { state: { email: userEmail } })}
      >
        Add New Interview
      </button>

      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        Interviews.length > 0 ? (
          <div>
            <h2 className="text-xl text-center font-semibold text-gray-800 mb-4">Interview History</h2>
            <div>
              <ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                {Interviews.map((interview: any, index: number) => (
                  <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md mx-auto mt-3" key={index}>
                    <li className='mb-2'>
                      <strong>Position: </strong> {interview.Position} <br />
                      <strong>TechStack: </strong> {interview.Techstack} <br />
                      <strong>Experience: </strong> {interview.Experience} year <br />
                    </li>
                  </div>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <p className="text-gray-600">No Interviews Found</p>
        )
      )}
    </div>
  );
}
