import { useState, useRef } from "react";
import { FiArrowUpCircle } from "react-icons/fi";
import './css/AskAgent.css'
import Sent from "./Sent";
import Reply from "./Reply";

export default function AskAgent() {
    const [text, setText] = useState<string>("");
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const [thinking, setThinking] = useState<boolean>(true);
  
    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setText(event.target.value);
  
      const textArea = textAreaRef.current;
      if (textArea) {
        textArea.style.height = "auto"; 
        textArea.style.height = `${textArea.scrollHeight}px`; 
      }
    };

    const askAgent = () =>{
        setThinking(true);
    } 

  return (
    <div className="w-full h-full overflow-hidden">
      <div className="h-full overflow-y-auto scrollbar-hide py-3 px-5" style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
        {!thinking && (
        <p className="text-gray-800 font-bold" style={{fontSize:'150%'}}>Hi, I'm RetailRadar, your AI assistant. 🤖</p>)}
        {!thinking && (
        <p className="text-gray-500 text-sm mt" style={{fontSize:'95%', marginTop: '-15px'}}>How can I help you today?</p>)}
        {!thinking && (
        <textarea
            ref={textAreaRef}
            value={text}
            placeholder="Ask me anything"	
            onChange={handleChange}
            className="bg-blue-800 p-2 text-white"
            style={{
                borderRadius: "15px",
                width: "60%",
                minHeight: "40px",
                overflow: "hidden",
                resize: "none"
            }}
        />)}
        {!thinking && (
        <FiArrowUpCircle onClick={askAgent} className="pt-2 text-blue-800 cursor-pointer" style={{fontSize: '300%'}}/>)}
        <div className="chat-window flex flex-col justify-end">
            <Sent/>
            <Reply/>
        </div>
        <div className="input-area flex">
          <textarea
              ref={textAreaRef}
              value={text}
              placeholder="Ask me anything"	
              onChange={handleChange}
              className="bg-blue-800 p-2 text-white"
              style={{
                  borderRadius: "15px",
                  width: "100%",
                  minHeight: "40px",
                  overflow: "hidden",
                  resize: "none"
              }}
          />
          <FiArrowUpCircle onClick={askAgent} className="pt-2 text-blue-800 cursor-pointer" style={{fontSize: '300%'}}/>
        </div>
      </div>
    </div>
  )
}
