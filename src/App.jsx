import { useState } from 'react'
import './index.css'
import axios from 'axios'
import './App.css'
function App() {
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
     <h1>AI Chat Bot</h1>
     <div id='ans'>
     <pre>
       {answer}
     </pre>
     </div>
     <textarea value={question} id='input' onChange={(e) => setQuestion(e.target.value)} placeholder="Ask anything..." ></textarea> <br /><br />
     <button onClick={ generatedanswer} >Generate answer</button>
    </>
  )
}

export default App
