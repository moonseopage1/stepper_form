import { useState } from "react";
import ChatList from "./components/chat-system/ChatList";
import ChatModal from "./components/chat-system/ChatModal";

const App = () => {
  const [openChats, setOpenChats] = useState([]);

  const handleOpenChat = (conversation) => {
    setOpenChats((prev) => {
      const existsIdx = prev.findIndex((c) => c.id === conversation.id);

      if (existsIdx !== -1) {
        // Move existing chat to the end (second slot)
        const updated = [...prev];
        updated.splice(existsIdx, 1);
        updated.push(conversation);
        return updated;
      }

      if (prev.length < 2) {
        return [...prev, conversation];
      }

      // Replace second chat (index 1)
      return [prev[0], conversation];
    });
  };

  const handleCloseChat = (id) => {
    setOpenChats((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <div className="max-w-7xl mx-auto p-5">
      <div className="flex relative h-[400px]">
        <ChatList
          onOpenChat={handleOpenChat}
          openChats={openChats}
          onCloseChat={handleCloseChat}
        />

        {/* Render open chat modals */}
        {openChats.map((c, i) => (
          <ChatModal
            key={c.id}
            conversation={c}
            index={i} // 0 or 1
            onClose={() => handleCloseChat(c.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
