import { useState } from "react";
import ContentManager from "./ContentManager";
import Chat from "./Chat";

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"chat" | "content">("chat");

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-4 sm:mb-6">
        Nimbou Content Management System
      </h1>
      <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4 mb-4 sm:mb-6">
        <button
          className={`w-full sm:w-auto px-4 py-2 rounded text-sm sm:text-base cursor-pointer ${
            activeTab === "chat" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("chat")}
        >
          Chat
        </button>
        <button
          className={`w-full sm:w-auto px-4 py-2 rounded text-sm sm:text-base cursor-pointer ${
            activeTab === "content" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("content")}
        >
          Manage Content
        </button>
      </div>
      {activeTab === "chat" ? <Chat /> : <ContentManager />}
    </div>
  );
};

export default App;
