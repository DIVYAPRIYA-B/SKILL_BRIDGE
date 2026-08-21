import { useState, useRef, useEffect } from 'react';
import { Send, Bot, Trash2, Globe, User } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { generateAIResponse } from '@/lib/mockAI';
import type { ChatMessage } from '@/types';
import { uid } from '@/data/demoData';

const suggestedQuestions = [
  'What skills should I learn to become a Java developer?',
  'Which internship is best for me?',
  'How can I improve my resume?',
  'Create a learning plan for me.',
  'Why am I not getting internships?',
  'Explain Spring Boot in simple language.',
];

const suggestedTamil = [
  'Java developer aaga enna skills kathukkanum?',
  'Enakku eppadi internship kedaikka?',
  'En resume eppadi improve panrathu?',
];

export default function AIAssistant() {
  const { currentUser, students, internships, applications, language, setLanguage, toast } = useApp();
  const student = students.find((s) => s.userId === currentUser?.id) ?? null;
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: uid('msg'), role: 'assistant', content: `Hello${student ? ` ${student.name}` : ''}! I'm your SkillBridge AI Assistant. I can help you with career guidance, skill recommendations, internship suggestions, and learning plans. Ask me anything!`, timestamp: new Date().toISOString() },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, typing]);

  const send = (text: string) => {
    if (!text.trim()) return;
    const userMsg: ChatMessage = { id: uid('msg'), role: 'user', content: text, timestamp: new Date().toISOString() };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setTyping(true);
    setTimeout(() => {
      const response = generateAIResponse(text, student, internships, applications);
      setMessages((prev) => [...prev, { id: uid('msg'), role: 'assistant', content: response, timestamp: new Date().toISOString() }]);
      setTyping(false);
    }, 800 + Math.random() * 600);
  };

  const clearChat = () => {
    setMessages([{ id: uid('msg'), role: 'assistant', content: 'Chat cleared. How can I help you?', timestamp: new Date().toISOString() }]);
    toast('Chat cleared', 'info');
  };

  const suggestions = language === 'ta' ? suggestedTamil : suggestedQuestions;

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] lg:h-[calc(100vh-7rem)]">
      {/* Header */}
      <div className="card p-4 mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-brand-500 to-teal-500 flex items-center justify-center">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-ink-900 font-display">SkillBridge AI Assistant</h1>
            <p className="text-xs text-ink-500">Your personal career and learning companion.</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setLanguage(language === 'en' ? 'ta' : 'en')} className="btn-ghost text-xs">
            <Globe className="w-4 h-4" /> {language === 'en' ? 'தமிழ்' : 'English'}
          </button>
          <button onClick={clearChat} className="btn-ghost text-xs">
            <Trash2 className="w-4 h-4" /> Clear
          </button>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto scrollbar-thin space-y-4 pb-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-ink-200' : 'bg-gradient-to-br from-brand-500 to-teal-500'}`}>
              {msg.role === 'user' ? <User className="w-4 h-4 text-ink-600" /> : <Bot className="w-4 h-4 text-white" />}
            </div>
            <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${msg.role === 'user' ? 'bg-brand-600 text-white' : 'bg-white border border-ink-100 text-ink-800'}`}>
              <p className="text-sm whitespace-pre-line">{msg.content}</p>
            </div>
          </div>
        ))}
        {typing && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-teal-500 flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div className="bg-white border border-ink-100 rounded-2xl px-4 py-3 flex items-center gap-1">
              {[0, 1, 2].map((i) => (
                <span key={i} className="w-2 h-2 bg-brand-400 rounded-full animate-bounce-dot" style={{ animationDelay: `${i * 0.16}s` }} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Suggestions */}
      {messages.length <= 1 && (
        <div className="mb-3">
          <p className="text-xs text-ink-500 mb-2">Try asking:</p>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((q) => (
              <button key={q} onClick={() => send(q)} className="px-3 py-2 rounded-xl bg-ink-100 text-ink-700 text-xs font-medium hover:bg-ink-200 transition-colors">
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="card p-2 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-transparent px-3 py-2 text-sm focus:outline-none"
          placeholder="Type your question..."
        />
        <button type="submit" disabled={!input.trim() || typing} className="btn-primary px-4 py-2">
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
