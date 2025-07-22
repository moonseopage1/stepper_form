import { useEffect, useState } from "react";
import { Avatar, Badge } from "antd";

const dummyConversations = [
    {
        proposal_id: 3,
        startup_name: "Startup idea two",
        other_user: {
            id: 6,
            name: "Mr Investor",
            email: "investor@gmail.com",
            profile_picture_url:
                "https://seedstackerapi.dotprogrammers.com/storage/profile_pictures/l9pLWjR7dwEper3FEfU7rcd4zCZTWgki82H4yCXq.png",
        },
    },
    {
        proposal_id: 5,
        startup_name: "Startup idea 3",
        other_user: {
            id: 9,
            name: "Mr Investor 2",
            email: "investor2@gmail.com",
            profile_picture_url: null,
        },
    },
    {
        proposal_id: 6,
        startup_name: "Hello Startup",
        other_user: {
            id: 6,
            name: "Mr Investor",
            email: "investor@gmail.com",
            profile_picture_url:
                "https://seedstackerapi.dotprogrammers.com/storage/profile_pictures/l9pLWjR7dwEper3FEfU7rcd4zCZTWgki82H4yCXq.png",
        },
    },
];

const ChatList = ({ onOpenChat, openChats, onCloseChat }) => {
    const [conversations, setConversations] = useState([]);

    const isOpen = (id) => openChats.some((c) => c.proposal_id === id);

    useEffect(() => {
        setConversations(dummyConversations);
    }, []);

    return (
        <div className="bg-white p-2 flex flex-col gap-2 fixed bottom-4 right-4 z-50 shadow rounded">
            {conversations.map((c) => (
                <div key={c.proposal_id} className="relative group">
                    <Badge
                        count={
                            isOpen(c.proposal_id) ? (
                                <span
                                    className="text-xs text-red-500 cursor-pointer"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onCloseChat(c.proposal_id);
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
                            src={c.other_user?.profile_picture_url}
                            className={`cursor-pointer ${isOpen(c.proposal_id) ? "ring-2 ring-green-400" : ""}`}
                        >
                            {c.other_user?.name?.[0]}
                        </Avatar>
                    </Badge>
                </div>
            ))}
        </div>
    );
};

export default ChatList;
