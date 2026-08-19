import React, { useState } from 'react';
import { Send, Mic, Globe2, Volume2, Bot, User } from 'lucide-react';

const ChatInterface = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! I am your college assistant. Ask me anything about fees, exams, scholarships, or circulars.", sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const [language, setLanguage] = useState('English');

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    // Optimistically add user message
    const userText = input;
    const newMessage = { id: Date.now(), text: userText, sender: 'user' };
    setMessages(prev => [...prev, newMessage]);
    setInput('');
    
    try {
      const response = await fetch('http://localhost:8000/api/chat/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userText, language: language })
      });
      
      const data = await response.json();
      
      setMessages(prev => [...prev, { 
        id: Date.now() + 1, 
        text: data.reply, 
        sender: 'bot' 
      }]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        id: Date.now() + 1, 
        text: "Error: Could not connect to the backend.", 
        sender: 'bot' 
      }]);
    }
  };

  return (
    <div className="h-full max-h-[calc(100vh-4rem)] flex flex-col max-w-4xl mx-auto p-4 md:p-6">
      
      {/* Settings Bar */}
      <div className="flex justify-between items-center bg-white p-3 rounded-t-2xl border-b shadow-sm z-10">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Bot className="w-5 h-5 text-primary" />
          <span>Multilingual Assistant</span>
        </div>
        
        <div className="flex items-center gap-2 bg-muted/50 rounded-lg p-1">
          <Globe2 className="w-4 h-4 text-muted-foreground ml-2" />
          <select 
            className="bg-transparent border-none text-sm outline-none cursor-pointer py-1 pr-2"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option>English</option>
            <option>Hindi</option>
            <option>Spanish</option>
            <option>French</option>
            <option>Mandarin</option>
          </select>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto bg-slate-50/50 p-4 space-y-6">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-blue-100 text-blue-600'}`}>
              {msg.sender === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
            </div>
            
            <div className={`flex flex-col gap-1 max-w-[80%] ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
              <div className={`px-4 py-2 rounded-2xl ${
                msg.sender === 'user' 
                  ? 'bg-primary text-primary-foreground rounded-tr-sm' 
                  : 'bg-white border shadow-sm rounded-tl-sm text-foreground'
              }`}>
                {msg.text}
              </div>
              
              {/* Actions for Bot messages */}
              {msg.sender === 'bot' && (
                <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors">
                  <Volume2 className="w-3 h-3" /> Play Audio
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="bg-white p-4 rounded-b-2xl border-t shadow-sm">
        <form onSubmit={handleSend} className="flex gap-2">
          <button 
            type="button" 
            className="p-3 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-full transition-colors"
            title="Hold to speak"
          >
            <Mic className="w-5 h-5" />
          </button>
          
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your question..."
            className="flex-1 bg-muted/30 border border-input rounded-full px-4 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
          
          <button 
            type="submit" 
            className="p-3 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 shadow-md transition-all active:scale-95 disabled:opacity-50"
            disabled={!input.trim()}
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>

    </div>
  );
};

export default ChatInterface;
