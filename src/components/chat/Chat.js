import React, { useEffect, useRef, useState } from "react";
import "./Chat.scss";
import { useSelector } from "react-redux";
import { userChats } from "../../redux/thunk";
import MainLayout from "../MainLayout";
import { Card, Container } from "@mui/material";
import Conversation from "./Conversation";
import { ChatBox } from "./ChatBox";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";

const Chat = () => {
    const socket = useRef();
    const user = useSelector((state) => state.auth.userData);

    const [chats, setChats] = useState([]);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [sendMessage, setSendMessage] = useState(null);
    const [receiveMessage, setReceiveMessage] = useState(null);
    const userData = useSelector((state) => state.auth.userData);
    let userId;
    if (userData) userId = userData.id;
    const navigate = useNavigate();
    // Get chat in the chat section
    useEffect(() => {
        const getChats = async () => {
            try {
                const { data } = await userChats(user.id);
                setChats(data);
            } catch (error) {
                console.log(error);
            }
        };
        getChats();
    }, [user]);

    // Connect to socket.io
    useEffect(() => {
        socket.current = io("http://localhost:8800");
        socket.current.emit("new-user-add", user?.id);
        socket.current.on("get-users", (users) => {
            setOnlineUsers(users);
        });
    }, [user]);

    // sending message to socket server
    useEffect(() => {
        if (sendMessage !== null) {
            socket.current.emit("send-message", sendMessage);
        }
    }, [sendMessage]);

    // Get the message from socket server
    useEffect(() => {
        if (userId === undefined) navigate("/signin");
        socket.current.on("receive-message", (data) => {
            setReceiveMessage(data);
        });
    }, [navigate, userId]);

    const checkOnlineStatus = (chat) => {
        const chatMember = chat.members.find((member) => member !== user._id);
        const online = onlineUsers.find((user) => user.userId === chatMember);
        return online ? true : false;
    };

    return (
        <MainLayout>
            <Container maxWidth="lg">
                <div className="Chat mg40">
                    {/* LEFT SIDE */}
                    <div className="Left-side-chat">
                        {/* LOGO SEARCH */}
                        <Card variant="outlined" className="Chat-container">
                            <div className="flex-center">
                                <span className="h3 medium dark-title">
                                    Chats
                                </span>
                            </div>
                            <div className="Chat-list">
                                {chats?.map((chat) => {
                                    return (
                                        <div
                                            onClick={() => setCurrentChat(chat)}
                                        >
                                            <Conversation
                                                data={chat}
                                                currentUser={user.id}
                                                online={checkOnlineStatus(chat)}
                                            ></Conversation>
                                        </div>
                                    );
                                })}
                            </div>
                        </Card>
                    </div>

                    {/* RIGHT SIDE */}
                    <Card variant="outlined" className="Right-side-chat">
                        <ChatBox
                            chat={currentChat}
                            currentUser={user?.id}
                            setSendMessage={setSendMessage}
                            receiveMessage={receiveMessage}
                        />
                    </Card>
                </div>
            </Container>
        </MainLayout>
    );
};

export default Chat;
