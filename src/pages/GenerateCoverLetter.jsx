import '../App.css'
import { useEffect, useState } from 'react';
import axios from 'axios';

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
      })
      .catch((error) => {
        console.error("Failed to fetch posting data:", error);
      });
  }
  useEffect(() => {
    getPostingData()
  }, [])

  const submitButton = () => {
    axios.post('http://localhost:8000/setposting',
      postingData)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
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
    <div className='flex'>
      <div className='info-item'>
        <h3>Job Posting</h3>
        <textarea style={{ height: 300 }} onChange={handleFieldChange} name='posting' value={postingData.posting} />   </div>

      <div className='info-item'>
        <h3>Website Link</h3>
        <input onChange={handleFieldChange} name='website_link' value={postingData.website_link} />
      </div>

      <div className='info-item' >
        <h3>Additional Information</h3>
        <textarea style={{ height: 300 }} onChange={handleFieldChange} name='additional_info' value={postingData.additional_info} />

      </div>

      <button style={{ marginTop: 20, height: 100, width: 200, borderRadius: 100 }} onClick={submitButton} > Submit </button>
    </div>
  );
}

export default GenerateCoverLetterPage;

