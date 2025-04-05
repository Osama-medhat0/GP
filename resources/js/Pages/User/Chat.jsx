import React, { useState, useEffect } from "react";
import { usePage, router, Link } from "@inertiajs/react";
import DashboardLayout from "../Frontend/Dashboard/DashboardLayout";
import { SidebarProvider } from "../Frontend/Dashboard/Components/SidebarContext";
import axios from "axios";

const Chat = () => {
    const [message, setMessage] = useState("");
    const [selectedUser, setSelectedUser] = useState(null);
    const [messages, setMessages] = useState([]);
    const { users, selectedUser: initialSelectedUser } = usePage().props;

    useEffect(() => {
        if (initialSelectedUser) {
            setSelectedUser(initialSelectedUser);
            fetchMessages(initialSelectedUser.id);
        }
    }, []);

    useEffect(() => {
        const chatBox = document.querySelector(".chat-msg");
        if (chatBox) {
            chatBox.scrollTop = chatBox.scrollHeight;
        }
    }, [messages]);

    const handleUserSelect = (user) => {
        setSelectedUser(user);
        fetchMessages(user.id);
    };

    const fetchMessages = (userId) => {
        axios
            .get(route("chat.messages", userId))
            .then((response) => {
                setMessages(response.data.messages);
            })
            .catch((error) => {
                console.error("Error fetching messages:", error);
            });
    };

    const sendMessage = (e) => {
        e.preventDefault();

        if (selectedUser) {
            axios
                .post(route("chat.store"), {
                    msg: message,
                    receiver_id: selectedUser.id,
                })
                .then(() => {
                    fetchMessages(selectedUser.id); // Fetch new messages after sending
                    setMessage("");
                })
                .catch((error) => {
                    console.error("Failed to send message:", error);
                });
        }
    };

    return (
        <SidebarProvider>
            <DashboardLayout>
                <div className="ml-80 pl-9 text-3xl font-bold pt-7">
                    Live Chat
                </div>
                <div className="flex ml-80 mr-0 px-6 mt-6 ">
                    <div className="w-1/4 bg-gray-100 p-4 rounded-lg shadow-lg">
                        <strong className="text-xl">Chat List</strong>
                        <hr className="my-2" />
                        <ul className="space-y-2">
                            {users && Object.keys(users).length > 0 ? (
                                Object.values(users).map((user) => (
                                    <li
                                        key={user.id}
                                        onClick={() => handleUserSelect(user)}
                                        className={`p-2 rounded-lg cursor-pointer transition-all duration-200 ease-in-out ${
                                            selectedUser?.id === user.id
                                                ? "bg-blue-400 text-white"
                                                : "hover:bg-gray-200"
                                        }`}
                                    >
                                        <button className="flex items-center space-x-2 w-full">
                                            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-500 text-white font-bold text-lg">
                                                {user.name
                                                    .charAt(0)
                                                    .toUpperCase()}
                                            </div>
                                            <span className="text-lg font-medium">
                                                {user.name}
                                            </span>
                                        </button>
                                    </li>
                                ))
                            ) : (
                                <p>No users found</p>
                            )}
                        </ul>
                    </div>

                    <div className="w-3/4 pl-6">
                        <div className="bg-white shadow-lg rounded-lg">
                            <div className="bg-blue-400 text-white text-center py-3 rounded-t-lg">
                                <strong>
                                    Selected User:{" "}
                                    {selectedUser ? selectedUser.name : "None"}
                                </strong>
                            </div>
                            <div className="p-4 h-96 overflow-y-auto chat-msg">
                                <ul className="space-y-3">
                                    {messages && messages.length > 0 ? (
                                        messages.map((msg) => (
                                            <li
                                                key={msg.id}
                                                className={`${
                                                    msg.sender_id ===
                                                    selectedUser?.id
                                                        ? "text-left"
                                                        : "text-right"
                                                }`}
                                            >
                                                <div
                                                    className={`inline-block max-w-xs p-2 rounded-lg ${
                                                        msg.sender_id ===
                                                        selectedUser?.id
                                                            ? "bg-blue-200 text-gray-800"
                                                            : "bg-blue-500 text-white"
                                                    }`}
                                                >
                                                    {msg.msg}
                                                </div>
                                            </li>
                                        ))
                                    ) : (
                                        <p>No messages yet</p>
                                    )}
                                </ul>
                            </div>
                            <div className="bg-gray-100 p-4 rounded-b-lg ">
                                <form onSubmit={sendMessage}>
                                    <div className="flex items-center">
                                        <input
                                            type="text"
                                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="Type your message..."
                                            value={message}
                                            onChange={(e) =>
                                                setMessage(e.target.value)
                                            }
                                        />
                                        <button
                                            type="submit"
                                            className="ml-3 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-200 ease-in-out"
                                        >
                                            Send
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </DashboardLayout>
        </SidebarProvider>
    );
};

export default Chat;
