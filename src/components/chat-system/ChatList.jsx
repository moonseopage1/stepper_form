import { Avatar, Badge } from "antd";

// ✅ receives: onOpenChat, openChats, onCloseChat
const ChatList = ({ onOpenChat, openChats, onCloseChat }) => {
    const conversations = [
        { id: 1, name: "User 1", lastMessage: "Good morning" },
        { id: 2, name: "User 2", lastMessage: "Hello" },
        { id: 3, name: "User 3", lastMessage: "Helloooooooo" },
        { id: 4, name: "User 4", lastMessage: "heyyyyyyyyy" },
    ];

    const isOpen = (id) => openChats.some((c) => c.id === id);

    return (
        <div className="bg-white p-2 flex flex-col gap-2 fixed bottom-4 right-4 z-50 shadow rounded">
            {conversations.map((c) => (
                <div key={c.id} className="relative group">
                    <Badge
                        count={
                            isOpen(c.id) ? (
                                <span
                                    className="text-xs text-red-500 cursor-pointer"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onCloseChat(c.id);
                                    }}
                                >
                                    ✖
                                </span>
                            ) : null
                        }
                        offset={[-5, 30]}
                    >
                        <Avatar
                            onClick={() => onOpenChat(c)}
                            size={56}
                            shape="circle"
                            src="https://avatars.githubusercontent.com/u/158009316?v=4"
                            className={`cursor-pointer ${isOpen(c.id) ? "ring-2 ring-green-400" : ""
                                }`}
                        >
                            {c.name}
                        </Avatar>
                    </Badge>
                </div>
            ))}
        </div>
    );
};

export default ChatList;
