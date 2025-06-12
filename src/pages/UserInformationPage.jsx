import '../App.css'
function UserInformationPage() {
  return (
    <div className='flex'>
      <div className='info-item'>
        <h3>Name</h3>
        <input />
      </div>

      <div className='info-item'>
        <h3>Email</h3>
        <input />
      </div>

      <div className='info-item'>
        <h3>Additional Information</h3>
        <textarea style={{ height: 400 }} />

      </div>
      <div className='info-item'>
        <h3>Detailed Resume</h3>
        <input type="file" />
      </div>

    </div >
  );
}

export default UserInformationPage;
