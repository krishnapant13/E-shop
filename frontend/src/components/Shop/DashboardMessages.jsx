import axios from "axios";
import React, { useState, useEffect } from "react";
import { server } from "../../server";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AiOutlineArrowRight, AiOutlineSend } from "react-icons/ai";
import { TfiGallery } from "react-icons/tfi";
import styles from "../../styles/styles";
import socketIO from "socket.io-client";
import { format } from "timeago.js";
const ENDPOINT = "http://localhost:4000";
const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });

const DashboardMessages = () => {
  const { seller } = useSelector((state) => state.seller);
  const [conversation, setConversation] = useState([]);
  const [open, setOpen] = useState(false);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [messages, setMessages] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    socketId.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);
  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);
  useEffect(() => {
    axios
      .get(`${server}/conversation/get-all-conversation-seller/${seller._id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setConversation(res.data.conversations);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [seller]);
  //get all messages
  useEffect(() => {
    const getMessage = async () => {
      try {
        const response = axios.get(
          `${server}/message/get-all-messages/${currentChat._id}`
        );
        setMessages(response.data.message);
      } catch (error) {
        console.log(error);
      }
    };
    getMessage();
  }, [currentChat]);
  //create new messgae
  const sendMessageHandler = async (e) => {
    e.preventDefault();
    const message = {
      sender: seller._id,
      text: newMessage,
      conversationId: currentChat._id,
    };
    const receiverid = currentChat.members.find(
      (member) => member.id !== seller._id
    );
    socketId.emit("sendMessage", {
      senderId: seller._id,
      receiverid,
      text: newMessage,
    });
    try {
      if (newMessage !== "") {
        await axios
          .post(`${server}/message/create-new-message`, message)
          .then((res) => {
            setMessages([...messages, res.data.message]);
            updateLastMessage();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const updateLastMessage = async () => {
    socketId.emit("updateLastMessage", {
      lastMessage: newMessage,
      lastMessageId: seller._id,
    });
    await axios
      .put(`${server}/conversation/update-last-message/${currentChat._id}`, {
        lastMessage: newMessage,
        lastMessageId: seller._id,
      })
      .then((res) => {
        console.log(res.data.conversation);
        setNewMessage("");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="w-[90%] bg-white m-3 h-[85vh] overflow-y-scroll rounded">
      {/* {allMessageslist} */}
      {!open && (
        <>
          {" "}
          <h1 className="text-center text-[30px] font-[400] font-Poppins py-3">
            All messages
          </h1>
          {conversation &&
            conversation.map((item, index) => (
              <MessageList
                data={item}
                key={index}
                index={index}
                setOpen={setOpen}
                setCurrentChat={setCurrentChat}
                me={seller._id}
                userData={userData}
                setUserData={setUserData}
              />
            ))}
        </>
      )}
      {open && (
        <SellerInbox
          setOpen={setOpen}
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          sendMessageHandler={sendMessageHandler}
          messages={messages}
          sellerId={seller._id}
        />
      )}
    </div>
  );
};
const MessageList = ({
  data,
  index,
  setOpen,
  setCurrentChat,
  me,
  userData,
  setUserData,
}) => {
  const navigate = useNavigate();
  const [active, setActive] = useState(0);
  useEffect(() => {
    const userId = data.members.find((user) => user !== me);
    const getUser = async () => {
      try {
        const res = await axios.get(`${server}/user/user-info/${userId}`);
        setUserData(res.data.user);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [me, data]);
  const handleClick = (id) => {
    navigate(`?${id}`);
    setOpen(true);
  };
  console.log(userData.name);
  return (
    <div
      className={`w-full flex p-3 px-3 ${
        active === index ? "bg-[#1b575f]" : "bg-transparent"
      } cursor-pointer`}
      onClick={(e) =>
        setActive(index) || handleClick(data._id) || setCurrentChat(data)
      }
    >
      <div className="relative">
        <img
          src="http://localhost:3000/static/media/logo.11feb78e9bf4464c112c.jpeg"
          alt=""
          className="h-[50px] w-[50px] rounded-full"
        />{" "}
        <div className=" absolute rounded-full bg-green-400 w-[10px] h-[10px] top-[2px] right-[2px]" />
      </div>
      <div className="pl-3 ">
        <h1 className=" text-[18px]">{userData.name}</h1>
        <p className="text-[16px] text-white"> You: Dramatic isn't it?</p>
      </div>
    </div>
  );
};

const SellerInbox = ({
  setOpen,
  newMessage,
  setNewMessage,
  sendMessageHandler,
  messages,
  sellerId,
}) => {
  return (
    <div className="w-full min-h-full flex flex-col justify-between">
      {/* message header */}
      <div className="w-full flex p-3 items-center justify-between bg-slate-500">
        <div className="flex">
          <img
            src="http://localhost:3000/static/media/logo.11feb78e9bf4464c112c.jpeg"
            alt=""
            className="w-[60px] h-[60px] rounded-full "
          />
          <div className="pl-3">
            <h1 className="text-[18px] font-[600]">Krishna pant</h1>
            <h1>Active Now</h1>
          </div>
        </div>{" "}
        <AiOutlineArrowRight
          size={20}
          className="cursor-pointer"
          onClick={() => setOpen(false)}
        />
      </div>
      {/* messages */}{" "}
      <div className="px-3 h-[60vh] py-3 overflow-y-scroll">
        {messages &&
          messages.map((item, index) => (
            <div
              className={`w-full flex my-2 ${
                item.sender === sellerId ? "justify-end" : "justify-start"
              }`}
            >
              {item.sender !== sellerId && (
                <img
                  src="http://localhost:3000/static/media/logo.11feb78e9bf4464c112c.jpeg"
                  alt=""
                  className="w-[45px] h-[45px] rounded-full "
                />
              )}{" "}
              <div className="w-max p-2 rounded h-min">
                <p className=" text-black bg-slate-400 ml-2  p-1 rounded h-min">
                  {item.text}
                </p>
                <p className="text-[12px] text-[#31313185]">
                  {format(item.createdAt)}
                </p>
              </div>
              {/* <div className="w-full flex justify-end  my-2">
              <div className=" w-full flex flex-row-reverse">
                <img
                  src="http://localhost:3000/static/media/logo.11feb78e9bf4464c112c.jpeg"
                  alt=""
                  className="w-[45px] h-[45px] rounded-full "
                />{" "}
                <div className="w-max p-2 rounded h-min">
                  <p className=" text-black bg-slate-400 ml-2  p-1 rounded h-min">
                    Hi!{" "}
                  </p>
                </div>
              </div>
            </div> */}
            </div>
          ))}
      </div>
      {/* sent message */}
      <div className="sticky bottom-0">
        <form
          aria-required={true}
          className="p-3 relative w-full flex justify-between items-center"
          onSubmit={sendMessageHandler}
        >
          <div className="w[3%]">
            <TfiGallery size={25} className="cursor pointer" />
          </div>
          <div className="w-[97%]">
            <input
              required
              type="text"
              placeholder="Enter your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className={`${styles.input}`}
            />
            <input type="submit" value="Send" className="hidden" id="send" />
            <label htmlFor="send">
              <AiOutlineSend
                size={25}
                className="absolute right-4 top-4 cursor-pointer"
              />
            </label>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DashboardMessages;
