"use client";

import { useState, useEffect, FormEvent, Suspense } from "react";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";
import { FaComments, FaMicrophone, FaRegBookmark, FaShare, FaPlus, FaEdit, FaTimes, FaChartBar } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import CompareDrawer from "../components/CompareDrawer";
import EmailModal from "../components/EmailModal";
import QuoteModal from "../components/QuoteModal";
import { useSearchParams } from "next/navigation";

type Message = {
  text: string;
  fromUser: boolean;
  originalText?: string;
};

type Bookmark = { text: string; time: number };

interface Session {
  id: string;
  name: string;
  created: number;
  messages: Message[];
}

const formatResponse = (text: string) => {
  try {
    const data = JSON.parse(text);
    let formatted = '';

    if (data.comparison) {
      formatted += `<div class="space-y-6">`;
      data.comparison.forEach((item: any) => {
        formatted += `<div class="bg-gray-50 p-4 rounded-lg">
          <h3 class="font-semibold text-lg mb-3 text-blue-600">${item.plan}</h3>
          <div class="space-y-2">`;
        Object.entries(item.details).forEach(([key, value]) => {
          formatted += `<p><span class="font-medium">${key}:</span> ${value}</p>`;
        });
        formatted += `</div></div>`;
      });
      formatted += `</div>`;
    } else if (data.summary) {
      formatted += `<div class="space-y-3">
        <h2 class="text-xl font-semibold text-purple-600 mb-3">Plan Summary</h2>`;
      Object.entries(data.summary).forEach(([key, value]) => {
        formatted += `<div class="flex justify-between items-center p-2 bg-gray-50 rounded">
          <span class="font-medium">${key}:</span>
          <span class="text-blue-600">${value}</span>
        </div>`;
      });
      formatted += `</div>`;
    } else if (Array.isArray(data.recommendations)) {
      return `<div class="space-y-2">
        <h2 class="text-xl font-semibold mb-2">Recommendations</h2>
        <ul class="list-disc ml-6">
          ${data.recommendations
          .map((r: any) => `<li>${r.title || r.text || JSON.stringify(r)}</li>`)
          .join("")}
        </ul>
      </div>`;
    }
    else {
      formatted += `<div class="grid grid-cols-2 gap-4">`;
      Object.entries(data).forEach(([key, value]) => {
        formatted += `<div class="p-2 bg-gray-50 rounded">
          <div class="font-medium text-gray-700">${key}</div>
          <div class="text-blue-600">${value}</div>
        </div>`;
      });
      formatted += `</div>`;
    }
    return formatted;
  } catch (error) {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong class="text-blue-600">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="text-purple-600">$1</em>')
      .replace(/#{3,}(.*?)\n/g, '<h3 class="text-lg font-semibold mt-4 mb-2 text-gray-700">$1</h3>')
      .replace(/#{2}(.*?)\n/g, '<h2 class="text-xl font-semibold mt-6 mb-3 text-gray-800">$1</h2>')
      .replace(/#{1}(.*?)\n/g, '<h1 class="text-2xl font-bold mt-8 mb-4 text-gray-900">$1</h1>')
      .replace(/- (.*?)\n/g, '<li class="list-disc ml-6 mb-2">$1</li>')
      .replace(/\n/g, '<br/>');
  }
};

// Separate component to handle search params
function ChatPageContent() {
  const router = useRouter();
  const [sessions, setSessions] = useState<Session[]>([]);
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [plainMode, setPlainMode] = useState(false);
  const [speakMode, setSpeakMode] = useState(false);
  const [showCompare, setShowCompare] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  const [showQuote, setShowQuote] = useState(false);
  const [quoteText, setQuoteText] = useState("");
  const searchParams = useSearchParams();
  const selectedPlan = searchParams.get("plan");
  const selectedPlanB = searchParams.get("planB");

  useEffect(() => {
    const saved: Session[] = JSON.parse(sessionStorage.getItem("chatSessions") || "[]");
    setSessions(saved);
    if (saved.length) {
      const last = saved[saved.length - 1];
      setCurrentId(last.id);
      setMessages(last.messages);
      loadBookmarks(last.id);
    } else {
      createNewSession();
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem("chatSessions", JSON.stringify(sessions));
  }, [sessions]);

  const loadBookmarks = (sid: string) => {
    const bm: Bookmark[] = JSON.parse(sessionStorage.getItem(`bookmarks_${sid}`) || "[]");
    setBookmarks(bm);
  };

  const saveBookmarks = (b: Bookmark[]) => {
    setBookmarks(b);
    if (currentId) sessionStorage.setItem(`bookmarks_${currentId}`, JSON.stringify(b));
  };

  const createNewSession = () => {
    const id = uuidv4();
    const sess: Session = {
      id,
      name: `Session ${sessions.length + 1}`,
      created: Date.now(),
      messages: [],
    };
    setSessions(prev => [...prev, sess]);
    setCurrentId(id);
    setMessages([]);
    saveBookmarks([]);
  };

  const renameSession = (sid: string) => {
    const n = prompt("Enter new session name:");
    if (n) setSessions(prev => prev.map(s => s.id === sid ? { ...s, name: n } : s));
  };

  const updateMessages = (msgs: Message[]) => {
    setMessages(msgs);
    if (currentId) {
      setSessions(prev => prev.map(s => s.id === currentId ? { ...s, messages: msgs } : s));
    }
  };

  const doSpeak = (text: string) => {
    if (text.trim() && "speechSynthesis" in window) {
      window.speechSynthesis.speak(new SpeechSynthesisUtterance(text));
    }
  };

  const handleListen = () => {
    const S = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!S) return alert("Speech recognition not supported.");
    const r = new S();
    r.onresult = (e: any) => setInput(e.results[0][0].transcript);
    r.start();
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: Message = { text: input, fromUser: true };
    const newMessages = [...messages, userMsg];
    updateMessages(newMessages);
    setInput("");

    let fullQuery = input;
    if (selectedPlan && selectedPlanB) {
      fullQuery = `compare ${selectedPlan} with ${selectedPlanB} on ${input}`;
    } else if (selectedPlan) {
      fullQuery = `${input}, ${selectedPlan}`;
    } else {
      fullQuery = `recommend ${input}`;
    }

    try {
      const res = await fetch("https://10.0.0.155:8000/docs/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: fullQuery }),
      });

      const data = await res.json();
      const raw = data.answer || "⚠️ No response from backend.";

      const payload = Array.isArray(data.recommendations)
        ? JSON.stringify({ recommendations: data.recommendations })
        : (data.answer || "⚠️ No response from backend.");

      const formattedText = formatResponse(payload);

      const botMsg: Message = {
        text: formattedText,
        originalText: raw,
        fromUser: false
      };

      updateMessages([...newMessages, botMsg]);
      if (speakMode) doSpeak(raw);
    } catch (err: any) {
      const errorMsg = `❌ Error: ${err.message || "Unknown error"}`;
      const botMsg: Message = { text: errorMsg, fromUser: false };
      updateMessages([...newMessages, botMsg]);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleSend();
  };

  const addBookmark = (t: string) => saveBookmarks([...bookmarks, { text: t, time: Date.now() }]);
  const deleteBookmark = (i: number) => saveBookmarks(bookmarks.filter((_, idx) => idx !== i));
  const clearAllBookmarks = () => confirm("Clear all bookmarks?") && saveBookmarks([]);

  const handleQuoteConfirm = (q: string) => {
    setShowQuote(false);
    const userMsg: Message = { text: q, fromUser: true };
    const raw = "Here's more info on that.";
    const botMsg: Message = { text: raw, originalText: raw, fromUser: false };
    const all = [...messages, userMsg, botMsg];
    updateMessages(all);
    if (speakMode) doSpeak(raw);
  };

  const lastBotIndex = messages.map((m, i) => (!m.fromUser ? i : -1)).filter(i => i >= 0).pop() ?? -1;
  const chatTranscript = messages.map(m => `${m.fromUser ? "You: " : "Bot: "}${m.text}`).join("\n");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex">
      <aside className="w-64 border-r border-gray-200 p-4 bg-white">
        <button
          onClick={createNewSession}
          className="w-full mb-6 px-4 py-3 bg-gradient-to-r from-blue-300 to-purple-300 text-white rounded-xl hover:opacity-90 transition-opacity flex items-center gap-2"
        >
          <FaPlus className="flex-shrink-0" />
          <span>New Chat</span>
        </button>

        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Conversations
        </h2>

        <ul className="space-y-2">
          {sessions.map(s => (
            <li key={s.id} className="group flex items-center gap-2">
              <button
                onClick={() => {
                  setCurrentId(s.id);
                  setMessages(s.messages);
                  loadBookmarks(s.id);
                }}
                className={`flex-1 px-3 py-2 text-left rounded-lg transition-colors ${s.id === currentId
                  ? 'bg-blue-50 text-blue-600'
                  : 'hover:bg-gray-100 text-gray-600'
                  }`}
              >
                {s.name}
              </button>
              <button
                onClick={() => renameSession(s.id)}
                className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-gray-600"
              >
                <FaEdit className="w-4 h-4" />
              </button>
            </li>
          ))}
        </ul>
      </aside>

      <main className="flex-1 flex flex-col">
        <div className="p-4 border-b border-gray-200 bg-white flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <FaComments className="text-blue-500" />
            Insurance Assistant
          </h1>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 text-sm text-gray-800">
              <input
                type="checkbox"
                checked={plainMode}
                onChange={(e) => setPlainMode(e.target.checked)}
                className="rounded border-gray-300"
              />
              Simple Mode
            </label>
            <label className="flex items-center gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                checked={speakMode}
                onChange={(e) => setSpeakMode(e.target.checked)}
                className="rounded border-gray-300"
              />
              Voice Mode
            </label>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.fromUser ? 'justify-end' : 'justify-start'}`}>
              <div className={`group relative max-w-2xl p-4 rounded-2xl ${m.fromUser
                ? 'bg-gradient-to-r from-blue-300 to-purple-300 text-white'
                : 'bg-white shadow-lg'
                }`}>
                <div
                  className={`${m.fromUser ? 'text-white' : 'text-gray-800'} prose max-w-none`}
                  dangerouslySetInnerHTML={{ __html: m.text }}
                />

                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 flex gap-1">
                  {!m.fromUser && (
                    <button
                      onClick={() => {
                        setQuoteText(m.originalText || m.text);
                        setShowQuote(true);
                      }}
                      className="p-1 hover:bg-black/10 rounded-full"
                    >
                      <FaShare className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    onClick={() => addBookmark(m.text)}
                    className="p-1 hover:bg-black/10 rounded-full"
                  >
                    <FaRegBookmark className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200 bg-white">
          <div className="max-w-4xl mx-auto flex gap-2">
            <button
              type="button"
              onClick={handleListen}
              className="p-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-600"
            >
              <FaMicrophone className="w-5 h-5" />
            </button>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about Medicare plans..."
              className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-300 bg-transparent text-gray-800"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-blue-300 to-purple-300 text-white rounded-xl hover:opacity-90 transition-opacity flex items-center gap-2"
            >
              <FiSend className="w-5 h-5" />
              <span>Send</span>
            </button>
          </div>
        </form>
      </main>

      <aside className="w-64 border-l border-gray-200 p-4 bg-white">
        <div className="space-y-6">
          <div>
            <button
              onClick={() => setShowEmail(true)}
              className="w-full px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-xl text-gray-800 flex items-center gap-2"
            >
              <FaShare className="flex-shrink-0" />
              Export Chat
            </button>
          </div>

          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <FaRegBookmark />
                Bookmarks
              </h3>
              <button
                onClick={clearAllBookmarks}
                className="text-red-500 hover:text-red-600 text-sm"
              >
                Clear All
              </button>
            </div>

            {bookmarks.length === 0 ? (
              <p className="text-gray-500 text-sm">No bookmarks yet</p>
            ) : (
              <ul className="space-y-2">
                {bookmarks.map((b, idx) => (
                  <li
                    key={idx}
                    className="group flex items-center justify-between p-2 bg-gray-50 rounded-lg hover:bg-gray-100"
                  >
                    <span className="text-gray-600 text-sm">{b.text}</span>
                    <button
                      onClick={() => deleteBookmark(idx)}
                      className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-500"
                    >
                      <FaTimes className="w-4 h-4" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </aside>

      <CompareDrawer isOpen={showCompare} onClose={() => setShowCompare(false)} />
      <EmailModal isOpen={showEmail} onClose={() => setShowEmail(false)} chatTranscript={chatTranscript} />
      <QuoteModal
        isOpen={showQuote}
        originalText={quoteText}
        onCancel={() => setShowQuote(false)}
        onConfirm={handleQuoteConfirm}
      />
    </div>
  );
}

// Loading component for Suspense fallback
function ChatPageLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading chat...</p>
      </div>
    </div>
  );
}

// Main page component with Suspense boundary
export default function ChatPage() {
  return (
    <Suspense fallback={<ChatPageLoading />}>
      <ChatPageContent />
    </Suspense>
  );
}
