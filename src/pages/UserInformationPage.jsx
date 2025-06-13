import '../App.css'
import { useEffect, useState } from 'react';
import axios from 'axios';


function UserInformationPage() {

  const [userData, setUserData] = useState({
    name: '',
    email: '',
    additional_info: '',
    file_name: '',


  });

  async function getUserData() {
    axios.get('http://localhost:8000/getuser')
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        console.error("Failed to fetch user data:", error);
      });
  }
  useEffect(() => {
    getUserData()
  }, [])

  const saveButton = () => {
    axios.post('http://localhost:8000/setuser',
      userData)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

  }

  const handleFieldChange = (e) => {
    const { name, value, type, files } = e.target;

    if (name == 'file_name') {
      console.log(files[0])
      console.log('here')
      setUserData(prev => ({
        ...prev,
        [name]: files[0]?.name || ''
      }));
    } else {
      setUserData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };


  return (
    <div className='flex'>
      <div className='info-item'>
        <h3>Name</h3>
        <input value={userData.name} name="name" onChange={handleFieldChange} />
      </div>

      <div className='info-item'>
        <h3>Email</h3>
        <input value={userData.email} name="email" onChange={handleFieldChange} />
      </div>

      <div className='info-item'>
        <h3>Additional Information</h3>
        <textarea style={{ height: 400 }} value={userData.additional_info} name="additional_info" onChange={handleFieldChange} />

      </div>
      <div className='info-item'>
        <h3>Detailed Resume</h3>
        <p>{userData.file_name ? "Current File: " + userData.file_name : ""} </p>

        <input type="file" name='file_name' onChange={handleFieldChange} />
      </div>

      <button style={{ marginTop: 20, height: 100, width: 200, borderRadius: 100 }} onClick={saveButton} > Save </button>

    </div >
  );
}

export default UserInformationPage;
