import './index.css'
import axios from 'axios'
import './App.css'
import ReactMarkdown from 'react-markdown';

import React, { useState, useEffect, useRef } from "react";
import { _vantaEffect } from 'vanta/dist/vanta.clouds.min';
import CLOUDS from "vanta/dist/vanta.clouds.min"
import * as THREE from "three";
import { Container } from 'react-bootstrap';

function App() {


  const [vantaEffect, setVantaEffect] = useState(0);
  const vantaRef = useRef(null);

  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        CLOUDS({
          el: vantaRef.current,
          THREE: THREE,
          mouseControls: false,
          touchControls: true,
          gyroControls: false,
          minHeight: 200,
          minWidth: 200,
          scale: 1.0,
          scaleMobile: 1.0,
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);






  const [question, setQuestion] = useState("");
  const [answer, setAnswer]= useState("");
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
      if(setQuestion==""){
      setAnswer("")
    }
    } catch (error) {
      console.log(error);
      setAnswer("Sorry - Something went wrong. Please try again!");
    }
  }
  return (
    <>
    <Container  fluid  >
      <div ref={vantaRef} style={{ height:"100%", width: "100%" }}>
     <h1>AI Chat Bot</h1>
     <div id='ans'>
     <div  className="flex-1 overflow-y-auto mb-4 rounded-lg bg-white shadow-lg p-4 hide-scrollbar" >
    
      <ReactMarkdown id="ans" className="overflow-auto hide-scrollbar items-center" >
      {answer}
      </ReactMarkdown>
     
     </div>
     </div>
     <textarea value={question} id='input' onChange={(e) => setQuestion(e.target.value)} placeholder="Ask anything..." ></textarea> <br /><br />
    
     <div >
     <button onClick={ generatedanswer}>Generate answer</button>
     
     </div>
     </div>
      </Container>
    </>
  )
}

export default App







