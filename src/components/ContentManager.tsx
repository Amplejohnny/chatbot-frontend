import { useState, useEffect, useCallback } from "react";
import axios from "axios";

interface Content {
  _id: string;
  title: string;
  text: string;
  createdAt: string;
  updatedAt: string;
}

const ContentManager: React.FC = () => {
  const [contents, setContents] = useState<Content[]>([]);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  const API_URL =
    import.meta.env.VITE_API_URL || "https://chatbot-backend-l8o4.onrender.com";

  const fetchContents = useCallback(async () => {
    try {
      const response = await axios.get<Content[]>(`${API_URL}/content`);
      setContents(response.data);
    } catch (error) {
      console.error("Failed to fetch contents:", error);
      setMessage("Failed to fetch content.");
    }
  }, [API_URL]);

  useEffect(() => {
    fetchContents();
  }, [fetchContents]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        const response = await axios.put(`${API_URL}/content/${editingId}`, {
          title,
          text,
        });
        setContents(
          contents.map((c) => (c._id === editingId ? response.data : c))
        );
        setEditingId(null);
        setMessage("Content updated successfully!");
      } else {
        const response = await axios.post(`${API_URL}/content`, {
          title,
          text,
        });
        setContents([...contents, response.data]);
        setMessage("Content added successfully!");
      }
      setTitle("");
      setText("");
    } catch (error) {
      console.error("Failed to save content:", error);
      setMessage("Failed to save content.");
    }
  };

  const handleEdit = (content: Content) => {
    setEditingId(content._id);
    setTitle(content.title);
    setText(content.text);
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`${API_URL}/content/${id}`);
      setContents(contents.filter((c) => c._id !== id));
      setMessage("Content deleted successfully!");
    } catch (error) {
      console.error("Failed to delete content:", error);
      setMessage("Failed to delete content.");
    }
  };

  return (
    <div>
      <h2 className="text-xl sm:text-2xl font-semibold mb-4">Manage Content</h2>
      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded text-sm sm:text-base"
            placeholder="Enter title"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Text</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full p-2 border rounded text-sm sm:text-base h-24 sm:h-32"
            placeholder="Enter text"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full sm:w-auto bg-green-500 text-white px-4 py-2 rounded text-sm sm:text-base cursor-pointer"
        >
          {editingId ? "Update" : "Add"} Content
        </button>
      </form>
      {message && (
        <p className="text-center mb-4 text-sm sm:text-base">{message}</p>
      )}
      <div className="space-y-4">
        {contents.map((content) => (
          <div
            key={content._id}
            className="p-4 border rounded flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
          >
            <div className="w-full sm:w-3/4">
              <h3 className="font-bold text-sm sm:text-base">
                {content.title}
              </h3>
              <p className="text-sm sm:text-base break-words">{content.text}</p>
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <button
                onClick={() => handleEdit(content)}
                className="bg-yellow-500 text-white px-2 py-1 rounded text-xs sm:text-sm w-full sm:w-auto cursor-pointer"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(content._id)}
                className="bg-red-500 text-white px-2 py-1 rounded text-xs sm:text-sm w-full sm:w-auto cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContentManager;
