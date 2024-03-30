import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'
import ReactMarkdown from "react-markdown"

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [generatingAnswer, setGeneratingAnswer] = useState(false)

  async function generateAnswer (e) {
    setGeneratingAnswer(true)
    e.preventDefault();
    setAnswer("Loading.. your answer.. \n It might take 10 second");
    try{
    const response = await axios({
      url:"https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyDVLbwsfK8VcFysome7zqxBETkTE0P-mPw",
      method:"post",
      data: {
        "contents":[
          {"parts":[{text: question}]},
        ],
      },
    });
   
      setAnswer(response["data"]["candidates"][0]["content"]["parts"][0]["text"]);
  } catch(error){
    setAnswer("Sorry something went wrong. please try  again!!")
  }
  setGeneratingAnswer(false)
}
  return (
    <>
    {/* <div className='w-full'> </div>
      <h1 className='bg-red-300'> Chat AI </h1>
      <textarea className='border rounded w-full' value={question} onChange={(e)=>setQuestion(e.target.value)} 
       cols="30"
        rows="10"
        placeholder='Ask me anything'
        ></textarea>
      <button onClick={(generateAnswer)}> Generative answer</button>
       
       <pre> {answer} </pre> */}
       <div className='bg-gray h-screen p-3'>
        <form
        onSubmit={generateAnswer}
        className='w-full md:w-2/3 m-auto text-center rounded bg-pink-50 py-2'>
          <a href='https://github.com/karishma108/chat-ai.git' target='_blank'>
            <h1 className='text-3xl text-center'> Chat AI</h1>
            <p className='text-xs' >Using Google gemini API</p>
          </a>
          <textarea required className='border rounded w-11/12 my-2 min-h-fit p-3'
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder='Ask anything'
          ></textarea>
         <button type='sunmit' className='bg-blue-300 p-3 rounded-md hover:bg-blue-400 transitin-all duration-300'
         disabled = {generatingAnswer}
         >
          Generate answer
         </button>
        </form>
        <div className='w-full md:2/3 m-auto text-center rounded bg-blue-50 my-1'>
          <ReactMarkdown className='P-3'>{answer}</ReactMarkdown>
        </div>
       </div>
    </>

  );
}

export default App;














