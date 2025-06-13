import '../App.css'
import useWebSocket from 'react-use-websocket';
import { useEffect, useState, useCallback, useRef } from 'react';
import { ReadyState } from 'react-use-websocket';
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
    <div className='info-item'>
      <h3>Generated Letter</h3>
      <textarea style={{ height: 800, width: 800 }} value={currGeneratedLetter} onChange={handleLetterChange} />

    </div >
  );
}

export default EditLetterPage;
