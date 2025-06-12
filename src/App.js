import './App.css';
import UserInformationPage from './pages/UserInformationPage';
import GenerateCoverLetterPage from './pages/GenerateCoverLetter';
import EditLetterPage from './pages/EditLetter';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<UserInformationPage />} />
        <Route path="/description" element={<GenerateCoverLetterPage />} />
        <Route path="/letter" element={<EditLetterPage />} />
      </Routes>
    </Router>


  );
}

export default App;
