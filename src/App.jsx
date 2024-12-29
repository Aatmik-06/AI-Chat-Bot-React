import './index.css'
import axios from 'axios'
import './App.css'
import ReactMarkdown from 'react-markdown';

import React, { useState, useEffect, useRef } from "react";
import Waves from "vanta/dist/vanta.waves.min"
import { Container } from 'react-bootstrap';

const App = () => {

  // Created background effect
  const [vantaEffect, setVantaEffect] = useState(0);
  const vantaRef = useRef(null);
  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        Waves({
          el: vantaRef.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.00,
          color: "#4f3390",
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

 

  // Created state for question and answer
  const [question, setQuestion] = useState("");
  const [displayquestion, setDisplayquestion] = useState("");
  const [answer, setAnswer]= useState("");

 

  // Created function to generate answer
  
  async function generatedanswer() {
    setAnswer("Thinking...")
    try {
      
      const response = await axios({
        url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyAmI8sN1T5SzP3AlM-5CPxFRlxFUyxJvd0",
        method:"post",
        data:{
            contents: [
              { parts: [{text:question}]},],
        },
      });
      setAnswer(response['data']['candidates'][0]['content']['parts'][0]['text']);
      setQuestion("")
      setDisplayquestion(question)
      
     
    document.getElementById('question').style.display="block"
    
    } 
     catch (error) {
      console.log(error);
      setAnswer("Sorry - Something went wrong. Please try again!");
    }
  }
  
  if(answer==""){
    setAnswer("Hey there! I'm Genie AI Chatbot. How can I help you today?")
  }
  return (
    <>
    <Container fluid  ref={vantaRef} id='cont'>
    <div id='main'>
     <h1>Genie AI Chatbot</h1>
     <div>
     <div id="ans"  className="flex-1 overflow-y-auto mb-4 rounded-lg shadow-lg p-4 hide-scrollbar" >
      <h3 style={{display:"none"}} id='question'> Question: {displayquestion} </h3>
      
      <ReactMarkdown  className="overflow-auto hide-scrollbar items-center">   
      
      {answer}

      </ReactMarkdown>
     
     
     </div>
     </div>
     <textarea value={question} id='input'  onChange={(e) => setQuestion(e.target.value)} placeholder="Ask anything..." ></textarea> <br /><br />
    
     <div>
     
     <button class="btn" onClick={generatedanswer}> 
     <svg height="24" width="24" fill="#FFFFFF" viewBox="0 0 24 24" data-name="Layer 1" id="Layer_1" class="sparkle">
        <path d="M10,21.236,6.755,14.745.264,11.5,6.755,8.255,10,1.764l3.245,6.491L19.736,11.5l-6.491,3.245ZM18,21l1.5,3L21,21l3-1.5L21,18l-1.5-3L18,18l-3,1.5ZM19.333,4.667,20.5,7l1.167-2.333L24,3.5,21.667,2.333,20.5,0,19.333,2.333,17,3.5Z"></path>
    </svg>
    <span class="text">Generate</span>
  
    </button>
    
     </div>
     </div>
    
      </Container>
    </>
  )
}

export default App







