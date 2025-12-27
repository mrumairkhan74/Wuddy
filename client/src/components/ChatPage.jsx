import { useEffect, useState, useMemo } from "react";
import { IoSearch } from "react-icons/io5";
import { FaUserEdit } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GetFriends } from "../features/friendSlice";
import Messages from "../components/Messages";
import {
  getChatsByUser,
  newGroup,
  setCurrentChat
} from "../features/chatSlice";

const ChatPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [search, setSearch] = useState(false);
  const [groupModal, setGroupModal] = useState(false);
  const [form, setForm] = useState({
    chatName: "",
    members: []
  });
  const [selectedUsers, setSelectedUsers] = useState([]);

  const { user } = useSelector((state) => state.auth);
  const { chat, groups, loading, currentChat } = useSelector((state) => state.chat);
  const { friends } = useSelector((state) => state.friend);

  useEffect(() => {
    if (user?._id) {
      dispatch(getChatsByUser());
      dispatch(GetFriends());
    }
  }, [dispatch, user]);

  const handleOpenChat = (chat) => {
    dispatch(setCurrentChat(chat));

    if (window.innerWidth < 768) {
      navigate(`/chat/message/${chat._id}`);
    }
  };

  const toggleUser = (id) => {
    setSelectedUsers((prev) =>
      prev.includes(id)
        ? prev.filter((u) => u !== id)
        : [...prev, id]
    );
  };

  const createGroup = async () => {
    if (!form.chatName.trim()) return;
    if (selectedUsers.length < 1) return;

    await dispatch(
      newGroup({
        chatName: form.chatName,
        members: selectedUsers
      })
    );

    setGroupModal(false);
    setSelectedUsers([]);
    setForm({ chatName: "", members: [] });
  };


  const allChats = useMemo(
    () => [...(chat || []), ...(groups || [])],
    [chat, groups]
  );

  return (
    <div className="w-full min-h-screen p-3">
      {/* Header */}
      <div className="flex justify-between items-center p-5 shadow-md relative">
        <h3 className="text-[#206059] text-xl md:text-2xl font-bold">
          Messages
        </h3>

        <div className="flex gap-3">
          <IoSearch
            className="text-2xl cursor-pointer text-[#206059]"
            onClick={() => setSearch(!search)}
          />
          <FaUserEdit
            className="text-2xl cursor-pointer text-[#206059]"
            onClick={() => setGroupModal(true)}
          />
        </div>

        {search && (
          <input
            type="text"
            placeholder="Search messages..."
            className="absolute right-20 top-16 w-64 p-2 border rounded-md"
          />
        )}
      </div>

      {/* Create Group Modal */}
      {groupModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-[350px] rounded-md p-4">
            <h4 className="text-lg font-bold mb-2">Create Group</h4>

            <input
              type="text"
              value={form.chatName}
              onChange={(e) => setForm({ ...form, chatName: e.target.value })}
              placeholder="Group name"
              className="w-full border p-2 rounded-md mb-3"
            />

            <div className="max-h-[200px] overflow-y-auto mb-3 space-y-2">
              {friends?.map((f) => (
                <div
                  key={f._id}
                  onClick={() => toggleUser(f._id)}
                  className={`flex items-center gap-2 p-2 rounded cursor-pointer ${selectedUsers.includes(f._id)
                    ? "bg-[#206059] text-white"
                    : "bg-gray-100"
                    }`}
                >
                  <img
                    src={f.profileImg?.url || "/default-avatar.png"}
                    className="w-8 h-8 rounded-full"
                    alt=""
                  />
                  <span>{f.firstName} {f.lastName}</span>
                </div>
              ))}
            </div>


            <div className="flex gap-2">
              <button
                onClick={() => setGroupModal(false)}
                className="w-1/2 border p-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={createGroup}
                className="w-1/2 bg-[#206059] text-white p-2 rounded"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Layout */}
      <div className="flex gap-3 mt-4">
        {/* Chat List */}
        <div className="w-full md:w-[400px] bg-white rounded-md shadow p-2 overflow-y-auto">
          {loading ? (
            <p className="text-center text-gray-500">Loading...</p>
          ) : allChats.length ? (
            allChats.map((cht) => {
              const friendUser =
                !cht.isGroupChat &&
                cht.members?.find((m) => m._id !== user._id);

              const name =
                cht.chatName ||
                `${friendUser?.firstName} ${friendUser?.lastName}`;

              return (
                <div
                  key={cht._id}
                  onClick={() => handleOpenChat(cht)}
                  className="flex justify-between items-center p-2 m-2 rounded-md bg-gray-100 hover:bg-gray-200 cursor-pointer"
                >
                  <div>
                    <div className="flex gap-2 items-center">
                      <img src={
                        cht.isGroupChat
                          ? cht.groupProfile?.url || "/group-avatar.png"
                          : friendUser?.profileImg?.url || "/default-avatar.png"
                      }
                        alt=""
                        className="w-10 h-10 rounded-full"
                      />
                      <div className="flex flex-col m-2">
                        <p className="font-bold">{name}</p>
                        <p className="text-sm text-gray-600">{cht.latestMessage?.text || ""}
                        </p>
                      </div>
                    </div>

                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-center text-gray-400">No chats found</p>
          )}
        </div>

        {/* Messages */}
        <div className="hidden md:flex-1 md:inline-block">
          {currentChat ? (
            <Messages chatId={currentChat._id} />
          ) : (
            <div className="text-gray-500 p-5 ">
              Select a chat to start messaging
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
