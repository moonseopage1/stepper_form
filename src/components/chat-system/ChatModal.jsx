import { useEffect, useState } from "react";

// mock API response you gave
const apiResponse = {
    status: true,
    data: [
        // Conversation with User 9
        {
            id: 1,
            proposal_id: "5",
            from_user_id: "5",
            to_user_id: "9",
            message: "<b>Hello User 9</b>",
            created_at: "2025-07-20T10:00:00Z",
            from_user: { id: 5, name: "Mr Founder" },
            to_user: { id: 9, name: "Mr Investor 2" }
        },
        {
            id: 2,
            proposal_id: "5",
            from_user_id: "9",
            to_user_id: "5",
            message: "Hi Founder!",
            created_at: "2025-07-20T10:01:00Z",
            from_user: { id: 9, name: "Mr Investor 2" },
            to_user: { id: 5, name: "Mr Founder" }
        },
        {
            id: 3,
            proposal_id: "5",
            from_user_id: "5",
            to_user_id: "9",
            message: "How are you?",
            created_at: "2025-07-20T10:02:00Z",
            from_user: { id: 5, name: "Mr Founder" },
            to_user: { id: 9, name: "Mr Investor 2" }
        },

        // Conversation with User 10
        {
            id: 4,
            proposal_id: "6",
            from_user_id: "5",
            to_user_id: "10",
            message: "<b>Hello User 10</b>",
            created_at: "2025-07-21T11:00:00Z",
            from_user: { id: 5, name: "Mr Founder" },
            to_user: { id: 10, name: "Ms Investor 3" }
        },
        {
            id: 5,
            proposal_id: "6",
            from_user_id: "10",
            to_user_id: "5",
            message: "Hi there!",
            created_at: "2025-07-21T11:01:00Z",
            from_user: { id: 10, name: "Ms Investor 3" },
            to_user: { id: 5, name: "Mr Founder" }
        },
        {
            id: 6,
            proposal_id: "6",
            from_user_id: "5",
            to_user_id: "10",
            message: "Let’s discuss the proposal.",
            created_at: "2025-07-21T11:02:00Z",
            from_user: { id: 5, name: "Mr Founder" },
            to_user: { id: 10, name: "Ms Investor 3" }
        }
    ]
};


const ChatModal = ({ conversation, onClose, index }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");

    const horizontalOffset = 80 + index * 340;

    useEffect(() => {
        // filter messages for the current conversation.proposal_id
        const filtered = apiResponse.data.filter(
            (msg) => msg.proposal_id === String(conversation.proposal_id)
        );

        // sort messages by created_at if needed
        filtered.sort(
            (a, b) => new Date(a.created_at) - new Date(b.created_at)
        );

        setMessages(filtered);
    }, [conversation.proposal_id]);

    const sendMessage = () => {
        if (!newMessage.trim()) return;

        const mockNewMsg = {
            id: Date.now(),
            proposal_id: String(conversation.proposal_id),
            from_user_id: "you",
            to_user_id: conversation.other_user.id,
            message: newMessage,
            created_at: new Date().toISOString(),
            from_user: { id: "you", name: "You" },
        };

        setMessages((prev) => [...prev, mockNewMsg]);
        setNewMessage("");
    };

    return (
        <div
            className="fixed bottom-0 bg-white shadow-lg rounded-t-lg z-50 flex flex-col mb-2"
            style={{ right: `${horizontalOffset}px`, width: "320px" }}
        >
            <div className="bg-green-600 text-white px-3 py-2 flex justify-between items-center rounded-t-lg">
                <span>{conversation.other_user?.name}</span>
                <button onClick={onClose}>✖️</button>
            </div>

            <div className="flex-1 p-2 overflow-y-auto max-h-64 min-h-64 flex flex-col gap-1">
                {messages.map((m) => {
                    const isMe =
                        m.from_user_id === "you" ||
                        m.from_user_id === conversation.from_user?.id;

                    return (
                        <div
                            key={m.id}
                            className={`p-2 rounded text-sm max-w-[80%] ${isMe
                                ? "bg-green-100 self-end text-right"
                                : "bg-gray-100 self-start"
                                }`}
                        >
                            <div
                                dangerouslySetInnerHTML={{ __html: m.message }}
                            ></div>
                            <div className="text-[10px] text-gray-500 mt-1">
                                {new Date(m.created_at).toLocaleTimeString()}
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="flex border-t p-2">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    placeholder="Type a message"
                    className="flex-1 border rounded px-2 py-1 mr-2"
                />
                <button
                    onClick={sendMessage}
                    className="bg-green-600 text-white px-3 py-1 rounded"
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default ChatModal;
