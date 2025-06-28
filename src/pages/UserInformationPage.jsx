import '../App.css'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaUser } from "react-icons/fa";



function UserInformationPage() {

  const [userData, setUserData] = useState({
    name: '',
    email: '',
    additional_info: '',
    file_name: '',
    file: '',
  });

  async function getUserData() {
    axios.get('http://localhost:8000/getuser')
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        console.error("Failed to fetch user data:", error);
        //toast.error("No User Data Found")
      });
  }
  useEffect(() => {
    getUserData()
  }, [])

  const saveButton = () => {
    const formData = new FormData();
    formData.append('name', userData.name);
    formData.append('email', userData.email);
    formData.append('additional_info', userData.additional_info);
    formData.append('file_name', userData.file_name);
    if (userData.file instanceof File) {
      formData.append('file', userData.file);
    }
    axios.post('http://localhost:8000/setuser', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
      .then(response => {
        console.log(response);
        toast.success("Saved User Sucessfully");

      })
      .catch(error => {
        console.error(error);
        toast.error("Failed To Save User");

      });
  };

  const handleFieldChange = (e) => {
    const { name, value, type, files } = e.target;

    if (name == 'file_name') {
      setUserData(prev => ({
        ...prev,
        file_name: files[0]?.name || '',
        file: files[0]
      }));
    } else {
      setUserData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };


  return (
    <div className='full-info-screen'>
      <div className='info-holder'>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <FaUser size={30} color='grey' />
          <h2 style={{ marginLeft: 10 }}>Profile Information</h2>
        </div>
        <div className='info-item'>
          <p>View or update your profile.</p>
        </div>
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
          <textarea style={{ height: 200 }} value={userData.additional_info} name="additional_info" onChange={handleFieldChange} />

        </div>
        <div className='info-item'>
          <h3>Detailed Resume</h3>
          <p>{userData.file_name ? "Current File: " + userData.file_name : ""} </p>

          <input type="file" name='file_name' onChange={handleFieldChange} />
        </div>
        <div className='button-container'>
          <button style={{ margin: 20, height: 100, width: 200, borderRadius: 100 }} onClick={saveButton} > Save </button>
        </div>
      </div >
    </div>
  );
}

export default UserInformationPage;
