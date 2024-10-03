import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import InterviewForm from './pages/InterviewForm';
import InterviewQuestions from './pages/InterviewQuestions';
import Feedback from './pages/Feedback';
import LandingPage from './pages/LandingPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/interview" element={<InterviewForm />} />
        <Route path="/interview/questions" element={<InterviewQuestions />} />
        <Route path="/interview/feedback" element={<Feedback/>}/>
      </Routes>
    </Router>
  );
}

export default App;
