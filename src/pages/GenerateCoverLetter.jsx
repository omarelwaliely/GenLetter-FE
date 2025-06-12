import '../App.css'
function GenerateCoverLetterPage() {
  return (
    <div className='flex'>
      <div className='info-item'>
        <h3>Job Posting</h3>
        <textarea style={{ height: 300 }} />      </div>

      <div className='info-item'>
        <h3>Website Link</h3>
        <input />
      </div>

      <div className='info-item' >
        <h3>Additional Information</h3>
        <textarea style={{ height: 300 }} />

      </div>

      <button style={{ marginTop: 20, height: 100, width: 200, borderRadius: 100 }} > Submit </button>

    </div >
  );
}

export default GenerateCoverLetterPage;
