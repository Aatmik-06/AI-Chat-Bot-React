import './index.css'
import axios from 'axios'
import './App.css'
import ReactMarkdown from 'react-markdown';

import React, { useState, useEffect, useRef } from "react";
import Waves from "vanta/dist/vanta.waves.min"
import * as THREE from "three";
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
    setAnswer("Loading...")
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
      if(setQuestion==""){
      setAnswer("")
    }
    document.getElementById('question').style.display="block"
    } catch (error) {
      console.log(error);
      setAnswer("Sorry - Something went wrong. Please try again!");
    }
  }
  return (
    <>
    <Container fluid  ref={vantaRef} id='cont'>
    <div id='main'>
     <h1>Genie AI Chatbot</h1>
    
     <div id="ans"  className="flex-1 overflow-y-auto mb-4 rounded-lg shadow-lg p-4 hide-scrollbar" >
      <h3 style={{display:"none"}} id='question'> Question: {displayquestion} </h3>
      <ReactMarkdown  className="overflow-auto hide-scrollbar items-center" >
          
      {answer}
      </ReactMarkdown>
     </div>
     
     <textarea value={question} id='input'  onChange={(e) => setQuestion(e.target.value)} placeholder="Ask anything..." ></textarea> <br /><br />
    
     <div>
     <button eventKey="1" onClick={generatedanswer}>Generate answer</button>
     
     </div>
     </div>
    
      </Container>
    </>
  )
}

export default App







