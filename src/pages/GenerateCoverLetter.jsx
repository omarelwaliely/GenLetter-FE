import '../App.css'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { FaBriefcase } from "react-icons/fa";



function GenerateCoverLetterPage() {

  const [postingData, setPostingData] = useState({
    posting: '',
    website_link: '',
    additional_info: '',
  });

  async function getPostingData() {
    axios.get('http://localhost:8000/getposting')
      .then((response) => {
        setPostingData(response.data);
        console.log(response.data)
        toast.success()
      })
      .catch((error) => {
        console.error("Failed to fetch posting data:", error);
        //toast.error("No Posting Added Yet!")

      });
  }
  useEffect(() => {
    getPostingData()
  }, [])
  const navigate = useNavigate();
  const submitButton = () => {
    axios.post('http://localhost:8000/setposting',
      postingData)
      .then(function (response) {
        console.log(response);
        toast.success("Posting Added");
        navigate("/letter");
      })
      .catch(function (error) {
        console.log(error);
        toast.error("Failed To Add Job Posting");

      });

  }

  const handleFieldChange = (e) => {
    const { name, value, type, files } = e.target;
    setPostingData(prev => ({
      ...prev,
      [name]: value
    }));
  };


  return (
    <div className='full-info-screen'>
      <div className='info-holder'>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <FaBriefcase size={30} color='grey' />
          <h2 style={{ marginLeft: 10 }}>Job Information</h2>
        </div>
        <div className='info-item'>
          <p>Input the information for the job.</p>
        </div>
        <div className='info-item'>
          <h3>Job Posting</h3>
          <textarea style={{ height: 400 }} onChange={handleFieldChange} name='posting' value={postingData.posting} />   </div>

        <div className='info-item'>
          <h3>Website Link</h3>
          <input onChange={handleFieldChange} name='website_link' value={postingData.website_link} />
        </div>

        <div className='info-item' >
          <h3>Additional Information</h3>
          <textarea style={{ height: 400 }} onChange={handleFieldChange} name='additional_info' value={postingData.additional_info} />

        </div>
        <div className='button-container'>
          <button style={{ margin: 20, height: 100, width: 200, borderRadius: 100 }} onClick={submitButton} > Submit </button>
        </div>
      </div>
    </div>
  );
}

export default GenerateCoverLetterPage;

