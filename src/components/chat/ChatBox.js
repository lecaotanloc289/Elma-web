import React, { useEffect, useRef, useState } from "react";
import { getMessages, getUser, sendMessage } from "../../redux/thunk";
import { format } from "timeago.js";
import icons from "../../assets/icons";
import "./ChatBox.scss";
import InputEmojiWithRef from "react-input-emoji";
import { Avatar, Button, Card, Divider, Stack } from "@mui/material";
import { images } from "../../assets/images";

export const ChatBox = ({
    chat,
    currentUser,
    setSendMessage,
    receiveMessage,
}) => {
    const [userData, setUserData] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");

    const handleMessageChange = (newMessage) => {
        setNewMessage(newMessage);
    };

    const messagesEndRef = useRef(null);
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };
    // FETCHING DATA FOR HEADER
    useEffect(() => {
        const userId = chat?.members?.find((id) => id !== currentUser);
        const getUserData = async () => {
            try {
                const { data } = await getUser(userId);
                setUserData(data);
            } catch (error) {
                console.log(error);
            }
        };
        if (chat !== null) getUserData();
    }, [chat, currentUser]);

    // FETCHING DATA FOR MESSAGES
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const { data } = await getMessages(chat?._id);
                setMessages(data);
            } catch (error) {
                console.log(error);
            }
        };
        if (chat !== null) fetchMessages();
    }, [chat]);

    // ALWAYS SCROLL TO THE LAST MESSAGE
    useEffect(() => {
        // scrollToBottom();
    }, [messages]);

    // SEND MESSAGE
    const handleSend = async () => {
        if (newMessage.trim().length > 0) {
            const message = {
                senderId: currentUser,
                text: newMessage,
                chatId: chat._id,
            };

            // send message to socket server
            const receiverId = chat?.members.find((id) => id !== currentUser);
            setSendMessage({ ...message, receiverId });

            // send message to database
            try {
                const { data } = await sendMessage(message);
                setMessages([...messages, data]);
                setNewMessage("");
            } catch (error) {
                console.log(error);
            }
        }
    };

    // HANDLE SEND WHEN USER PRESS ON ENTER BUTTON
    const pressOnEnter = async (event) => {
        if (event.key === "Enter" && newMessage.trim().length > 0) {
            const message = {
                senderId: currentUser,
                text: newMessage,
                chatId: chat._id,
            };

            // send message to socket server
            const receiverId = chat?.members.find((id) => id !== currentUser);
            setSendMessage({ ...message, receiverId });

            // send message to database
            try {
                const { data } = await sendMessage(message);
                setMessages([...messages, data]);
                setNewMessage("");
            } catch (error) {
                console.log(error);
            }
        }
    };

    // RECEIVE MESSAGE FROM PARENT COMPONENT
    useEffect(() => {
        if (receiveMessage !== null && receiveMessage.chatId === chat?._id) {
            setMessages(...messages, receiveMessage);
        }
    }, [receiveMessage]);
    return (
        <Card className="non-box-shadow">
            <div>
                {chat ? (
                    <div className="ChatBox-container">
                        <Stack
                            spacing={2}
                            direction={"row"}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                margin: "10px 20px",
                            }}
                        >
                            <Avatar
                                alt={userData?.name}
                                src={
                                    userData?.avatar !== ""
                                        ? userData?.avatar
                                        : null
                                }
                                style={{ width: 50, height: 50 }}
                            />
                            <div className="name">
                                <span className="h6 medium dark-title">
                                    {userData?.name}
                                </span>
                            </div>
                        </Stack>
                        <Divider />
                        <div className="chat-body">
                            {messages?.map((message) => (
                                <>
                                    <div
                                        // ref={scroll}
                                        className={
                                            message?.senderId === currentUser
                                                ? "own message "
                                                : "message"
                                        }
                                    >
                                        <span>{message?.text}</span>
                                        <span>
                                            {format(message?.createdAt)}
                                        </span>
                                    </div>
                                    <div ref={messagesEndRef}></div>
                                </>
                            ))}
                        </div>
                        <Divider />
                        <div className="flex-space-between center">
                            <Button>
                                <img src={icons.Add} alt="" />
                            </Button>
                            <InputEmojiWithRef
                                value={newMessage}
                                onChange={handleMessageChange}
                                onKeyDown={pressOnEnter}
                            />
                            <Button
                                onClick={() => handleSend()}
                                variant="contained"
                                className=" normal primary-background"
                            >
                                <span className="h6 medium light">Send</span>
                            </Button>
                        </div>
                        {/* <div className="chat-sender"></div> */}
                    </div>
                ) : (
                    <div className="tab-chat">
                        <span className="h5 mg20 medium dark-title chatbox-empty-message">
                            Tab on Chat to start!
                        </span>
                        <img width={700} alt="Chat" src={images.Chat} />
                    </div>
                )}
            </div>
        </Card>
    );
};
