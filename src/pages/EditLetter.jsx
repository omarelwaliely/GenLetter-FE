import '../App.css'
import useWebSocket from 'react-use-websocket';
import { useEffect, useState, useCallback, useRef } from 'react';
import { ReadyState } from 'react-use-websocket';
import { SlEnvolopeLetter } from "react-icons/sl";

function EditLetterPage() {
  const [currGeneratedLetter, setcurrGeneratedLetter] = useState("")
  const getSocketUrl = useCallback(() => { //establishes connection
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('ws://localhost:8000/letter');
      }, 2000);
    });
  }, []);
  const { sendMessage, lastMessage, readyState, getWebSocket } = useWebSocket(
    getSocketUrl
  );


  const hasSentBegin = useRef(false);
  const handleLetterChange = (e) => {
    setcurrGeneratedLetter(e.target.value);

  }

  useEffect(() => {
    if (readyState === ReadyState.OPEN && !hasSentBegin.current) {
      sendMessage("BEGIN");
      hasSentBegin.current = true; // making sure it only sends begin once (might connect to a "generate" button instead)
    }
  }, [readyState, sendMessage]);

  useEffect(() => {
    if (lastMessage) {
      setcurrGeneratedLetter(currGeneratedLetter + lastMessage.data);

    }

  }, [lastMessage]);
  return (
    <div className='full-info-screen'>
      <div className='info-holder'>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <SlEnvolopeLetter size={30} color='grey' />
          <h2 style={{ marginLeft: 10 }}>Generated Letter</h2>
        </div>
        <div className='info-item'>
          <p>View and update letter. Note that at it may still be generating.</p>
        </div>
        <div className='info-item'>
          <textarea style={{ height: 650, marginBottom: 10 }} value={currGeneratedLetter} onChange={handleLetterChange} />
        </div>
      </div>
    </div >
  );
}

export default EditLetterPage;
