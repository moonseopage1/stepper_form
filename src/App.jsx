import { useState } from 'react';
import FormWithStepper from './components/FormWithStepper';
import ChatList from './components/chat-system/ChatList';
import ChatModal from './components/chat-system/ChatModal';

const App = () => {
  const [openChats, setOpenChats] = useState([]);

  const handleOpenChat = (conversation) => {
    // if already open → move to end (most recent)
    if (openChats.some((c) => c.id === conversation.id)) {
      setOpenChats((prev) => [
        ...prev.filter((c) => c.id !== conversation.id),
        conversation,
      ]);
      return;
    }

    // if < 2 → just add
    if (openChats.length < 2) {
      setOpenChats((prev) => [...prev, conversation]);
      return;
    }

    // if == 2 → remove oldest & add new
    setOpenChats((prev) => [prev[1], conversation]);
  };

  const handleCloseChat = (id) => {
    setOpenChats((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <div className='max-w-7xl mx-auto p-5'>
      {/* <h2 className='mb-5 text-2xl text-center'>React Form with Stepper</h2>
      <FormWithStepper /> */}
      <div className="flex">
        <ChatList onOpenChat={handleOpenChat} openChats={openChats} onCloseChat={handleCloseChat} />
        {openChats.map((c, i) => (
          <ChatModal
            key={c.id}
            conversation={c}
            index={i}
            onClose={() => handleCloseChat(c.id)}
          />
        ))}
      </div>

    </div>
  );
};

export default App;