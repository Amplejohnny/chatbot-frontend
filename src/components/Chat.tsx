import { useState } from "react";
import axios from "axios";

interface ChatMessage {
  sender: "user" | "bot";
  text: string;
}

const Chat: React.FC = () => {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);

  const API_URL =
    import.meta.env.VITE_API_URL || "https://chatbot-backend-l8o4.onrender.com";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const userMessage: ChatMessage = { sender: "user", text: message };
    setChatHistory([...chatHistory, userMessage]);

    try {
      const response = await axios.post<{ reply: string }>(`${API_URL}/chat`, {
        message,
      });
      const botMessage: ChatMessage = {
        sender: "bot",
        text: response.data.reply,
      };
      setChatHistory((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error fetching response:", error);
      const errorMessage: ChatMessage = {
        sender: "bot",
        text: "Sorry, something went wrong. Please try again.",
      };
      setChatHistory((prev) => [...prev, errorMessage]);
    }

    setMessage("");
  };

  return (
    <div>
      <h2 className="text-xl sm:text-2xl font-semibold mb-4">
        Chat with the bot
      </h2>
      <div className="border p-4 h-64 sm:h-76 overflow-y-auto mb-4">
        {chatHistory.map((msg, index) => (
          <div
            key={index}
            className={`p-2 rounded mb-2 text-sm sm:text-base ${
              msg.sender === "user"
                ? "bg-gray-200 text-right"
                : "bg-blue-100 text-left"
            }`}
          >
            <span className="break-words">{msg.text}</span>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-grow p-2 border rounded text-sm sm:text-base"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded text-sm sm:text-base w-full sm:w-auto cursor-pointer"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;
