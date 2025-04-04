import { useState, useRef } from "react";
import { FiArrowUpCircle } from "react-icons/fi";
import './css/AskAgent.css'
import Sent from "./Sent";
import Reply from "./Reply";
import Loading from "./Loading";

interface Message {
  content: string;
  isUser: boolean;
}

export default function AskAgent() {
    const [text, setText] = useState<string>("");
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const [thinking, setThinking] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [messages, setMessages] = useState<Message[]>([]);
  
    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setText(event.target.value);
  
      const textArea = textAreaRef.current;
      if (textArea) {
        textArea.style.height = "auto"; 
        textArea.style.height = `${textArea.scrollHeight}px`; 
      }
    };

    const askAgent = () =>{
      if (text.trim() === "") return; 
        
      setMessages(prev => [...prev, { content: text, isUser: true }]);
      setText("");
      setThinking(true);
      setLoading(true);
    } 

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();
          askAgent();
      }
  };

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
            onKeyDown={handleKeyDown}
            onChange={handleChange}
            className="p-2 bg-gray-200"
            style={{
                borderRadius: "15px",
                width: "60%",
                minHeight: "40px",
                overflow: "hidden",
                resize: "none"
            }}
        />
        )}
        {!thinking && (
        <FiArrowUpCircle onClick={askAgent} className="pt-2 text-blue-800 cursor-pointer" style={{fontSize: '300%'}}/>)}
        {thinking && (
        <div className="chat-window flex flex-col justify-end">
            {messages.map((message, index) => (
              message.isUser ? (
                <Sent key={index} content={message.content} />
              ) : (
                <Reply key={index} content={message.content} />
              )
            ))}
            {loading && <Loading />}
        </div>)}
        {thinking && (
        <div className="input-area flex">
          <textarea
              ref={textAreaRef}
              value={text}
              placeholder={loading ? "RetailRadar is thinking..." : "Ask me anything"}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              className="p-2 bg-gray-200"
              disabled={loading}
              style={{
                  borderRadius: "15px",
                  width: "100%",
                  minHeight: "40px",
                  overflow: "hidden",
                  resize: "none",
                  opacity: loading ? 0.7 : 1,
                  cursor: loading ? "not-allowed" : "text"
              }}
            />
          <FiArrowUpCircle onClick={askAgent} className="pt-2 text-blue-800 cursor-pointer" style={{fontSize: '300%'}}/>
        </div>)}
      </div>
    </div>
  )
}
