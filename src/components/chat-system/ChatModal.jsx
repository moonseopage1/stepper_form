import { useState } from "react";

const ChatModal = ({ conversation, onClose, index }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");

    const horizontalOffset = 80 + index * 340; // 👈 base 16px + modal width + gap

    return (
        <div
            className="fixed bottom-0 bg-white shadow-lg rounded-t-lg z-50 flex flex-col mb-2"
            style={{ right: `${horizontalOffset}px`, width: "320px" }}
        >
            {/* Modal content here */}
            <div className="bg-green-600 text-white px-3 py-2 flex justify-between items-center rounded-t-lg">
                <span>{conversation.name}</span>
                <button onClick={onClose}>✖️</button>
            </div>

            <div className="flex-1 p-2 overflow-y-auto max-h-64 min-h-64">
                {/* Messages */}

            </div>

            <div className="flex border-t p-2">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    //   onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    placeholder="Type a message"
                    className="flex-1 border rounded px-2 py-1 mr-2"
                />
                <button
                    //   onClick={sendMessage}
                    className="bg-green-600 text-white px-3 py-1 rounded"
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default ChatModal;