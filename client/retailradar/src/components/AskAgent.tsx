import { useState, useRef } from "react";

export default function AskAgent() {

    const [text, setText] = useState<string>("");
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
  
    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setText(event.target.value);
  
      // Adjust height based on content
      const textArea = textAreaRef.current;
      if (textArea) {
        textArea.style.height = "auto"; // Reset height
        textArea.style.height = `${textArea.scrollHeight}px`; // Adjust height
      }
    };

  return (
    <div className="w-full h-full overflow-hidden">
      <div className="h-full overflow-y-auto scrollbar-hide py-3 px-5" style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
        <p className="text-gray-800 font-bold" style={{fontSize:'150%'}}>Hi, I'm RetailRadar, your AI assistant. 🤖</p>
        <p className="text-gray-500 text-sm mt" style={{fontSize:'95%', marginTop: '-15px'}}>How can I help you today?</p>
    <textarea
      ref={textAreaRef}
      value={text}
      placeholder="Ask me anything"	
      onChange={handleChange}
      className="bg-gray-500 p-2 text-white"
      style={{
        borderRadius: "15px",
        width: "60%",
        minHeight: "40px",
        overflow: "hidden",
        resize: "none"
      }}
    />
      </div>
    </div>
  )
}
