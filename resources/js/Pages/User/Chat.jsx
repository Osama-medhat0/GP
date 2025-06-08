import React, { useState, useEffect } from "react";
import { usePage, Link } from "@inertiajs/react";
import DashboardLayout from "../Frontend/Dashboard/DashboardLayout";
import { SidebarProvider } from "../Frontend/Dashboard/Components/SidebarContext";
import axios from "axios";
import { toast } from "react-toastify";

const Chat = () => {
    const [message, setMessage] = useState("");
    const [selectedUser, setSelectedUser] = useState(null);
    const [messages, setMessages] = useState([]);
    const [car, setCar] = useState(null);
    const [availableCars, setAvailableCars] = useState([]);

    const {
        users,
        selectedUser: initialSelectedUser,
        selectedCar: selectedCar,
        unreadNotifications: unreadNotfications,
    } = usePage().props;
    const [unreadNotifications, setUnreadNotifications] =
        useState(unreadNotfications);

    console.log(unreadNotfications);

    //unread notifications
    const unreadCounts = unreadNotfications.reduce((acc, notification) => {
        const senderId = notification.data.sender_id;
        if (!acc[senderId]) {
            acc[senderId] = 0;
        }
        acc[senderId]++;
        return acc;
    }, {});

    const markNotificationsAsRead = (userId) => {
        // Get the notifications to mark as read for this user
        const notificationIds = unreadNotfications
            .filter((notification) => notification.data.sender_id === userId)
            .map((notification) => notification.id);

        if (notificationIds.length > 0) {
            axios
                .post(route("notifications.markRead"), {
                    notification_ids: notificationIds,
                })
                .then(() => {
                    // Clear unread counts for the selected user
                    setUnreadNotifications((prevNotifications) =>
                        prevNotifications.filter(
                            (notification) =>
                                !notificationIds.includes(notification.id)
                        )
                    );
                })
                .catch((error) => {
                    console.error(
                        "Error marking notifications as read:",
                        error
                    );
                });
        }
    };

    useEffect(() => {
        if (initialSelectedUser) {
            setSelectedUser(initialSelectedUser);
            fetchMessages(initialSelectedUser.id);
            fetchCars(initialSelectedUser.id);
        }
    }, [initialSelectedUser]);

    useEffect(() => {
        // Make sure the selected car is set correctly on page load or when cars are fetched
        if (availableCars.length > 0) {
            const selectedCarFromPage = availableCars.find(
                (car) => car.id === selectedCar?.id
            );
            if (selectedCarFromPage) {
                setCar(selectedCarFromPage);
            } else {
                setCar(availableCars[0]);
            }
        }
    }, [availableCars, selectedCar]);

    useEffect(() => {
        const chatBox = document.querySelector(".chat-msg");
        if (chatBox) {
            chatBox.scrollTop = chatBox.scrollHeight;
        }
    }, [messages]);

    const handleUserSelect = (user) => {
        setSelectedUser(user);
        fetchMessages(user.id);
        fetchCars(user.id);
        markNotificationsAsRead(user.id);
    };

    const fetchCars = (userId) => {
        axios
            .get(route("user.car", userId))
            .then((response) => {
                const cars = response.data.cars;
                setAvailableCars(cars);

                // Try to keep the current selected car if available, otherwise set the first car
                const selectedCar = cars.find((car) => car.id === car?.id);

                if (selectedCar) {
                    setCar(selectedCar);
                } else if (cars.length > 0) {
                    setCar(cars[0]);
                }
                console.log("Available cars:", cars);
                console.log("Selected car:", selectedCar);
            })
            .catch((error) => {
                toast.error("Error fetching car details: " + error);
            });
    };

    const handleCarSelect = (carId) => {
        const selectedCar = availableCars.find(
            (car) => car.id === parseInt(carId, 10)
        ); // Ensure carId is compared as number

        if (selectedCar) {
            setCar(selectedCar);
        } else {
            console.error("Car not found with ID:", carId);
        }
    };

    const getImageUrl = () => {
        if (car?.images) {
            const imagePaths = car.images.split(",");
            const imagePath = imagePaths[0]
                .trim()
                .replace(/\\\//g, "/")
                .replace(/["\[\]]/g, ""); // Get the first image and clean up the path
            return `/storage/${imagePath}`;
        }
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
                    fetchMessages(selectedUser.id);
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
                <div className="flex ml-80 mr-0 px-6 mt-6 pb-7">
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
                                                {user.role === "admin" ? (
                                                    <span className="w-10 h-10 flex items-center justify-center rounded-full bg-green-400 text-white font-bold text-lg">
                                                        {user.name
                                                            .charAt(0)
                                                            .toUpperCase()}
                                                    </span>
                                                ) : (
                                                    user.name
                                                        .charAt(0)
                                                        .toUpperCase()
                                                )}
                                            </div>

                                            <span className="text-lg font-medium">
                                                {/* {user.name}
                                                 */}
                                                {user.role === "admin" ? (
                                                    <span className="ml-2 text-md text-white bg-green-400 px-2 py-0.5 rounded-md ">
                                                        {user.name}
                                                    </span>
                                                ) : (
                                                    user.name
                                                )}
                                            </span>

                                            {unreadCounts[user.id] > 0 && (
                                                <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                                                    {unreadCounts[user.id]}
                                                </span>
                                            )}
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
                            <div className="bg-blue-400 text-white text-center pt-2 rounded-t-lg pb-7">
                                <strong className="text-lg float-start pl-4">
                                    Selected User:{" "}
                                    {selectedUser ? selectedUser.name : "None"}
                                </strong>

                                {/* {console.log(selectedUser.name === "Admin")} */}
                                {/* {console.log(selectedUser.name !== "Admin")} */}
                                {selectedUser?.name !== "Admin" &&
                                    selectedUser &&
                                    availableCars?.length > 0 && (
                                        <div className="mt-9 float-end">
                                            <select
                                                className=" border py-4 cursor-pointer border-gray-300 rounded-lg text-black text-center focus:outline-none focus:ring-blue-500 transition-all duration-200 ease-in-out hover:bg-gray-100"
                                                onChange={(e) =>
                                                    handleCarSelect(
                                                        e.target.value
                                                    )
                                                }
                                                value={car?.id || ""}
                                            >
                                                {availableCars.map(
                                                    (carItem) => (
                                                        <option
                                                            key={carItem.id}
                                                            value={carItem.id}
                                                        >
                                                            {carItem.make}{" "}
                                                            {carItem.model} (
                                                            {carItem.year})
                                                        </option>
                                                    )
                                                )}
                                            </select>
                                        </div>
                                    )}
                                {car && (
                                    <Link href={route("car.detail", car.id)}>
                                        <div className="flex items-center bg-white border border-gray-200 rounded-lg shadow-md mb-0 mt-9 px-2 pt-2 pb-1 hover:bg-gray-100 transition-all duration-200 ease-in-out cursor-pointer">
                                            <img
                                                src={getImageUrl()}
                                                alt={`${car.make} ${car.model}`}
                                                className="w-24 h-16 object-cover rounded-md mr-4"
                                            />
                                            <div className="flex-1">
                                                <h2 className="text-sm font-bold text-gray-800">
                                                    {car.make} {car.model} (
                                                    {car.year})
                                                </h2>
                                                <p className="text-sm text-gray-600">
                                                    {car.mileage} km •{" "}
                                                    {car.fuelType} •{" "}
                                                    {car.transmission}
                                                </p>
                                            </div>
                                            <div className="text-blue-600 text-lg font-semibold whitespace-nowrap pr-3">
                                                $
                                                {parseFloat(
                                                    car.price
                                                ).toLocaleString()}
                                            </div>
                                        </div>
                                    </Link>
                                )}
                            </div>
                            <div className="p-4 h-96 overflow-y-auto chat-msg">
                                <ul className="space-y-3">
                                    {messages && messages.length > 0 ? (
                                        messages.map((msg) => (
                                            <li key={msg.id}>
                                                <div
                                                    className={`flex ${
                                                        msg.sender_id ===
                                                        selectedUser?.id
                                                            ? "justify-start"
                                                            : "justify-end"
                                                    }`}
                                                >
                                                    <div
                                                        className={`block break-words whitespace-pre-wrap w-fit max-w-[45%] p-2 rounded-lg ${
                                                            msg.sender_id ===
                                                            selectedUser?.id
                                                                ? "bg-blue-200 text-gray-800"
                                                                : "bg-blue-500 text-white"
                                                        }`}
                                                        style={{
                                                            overflowWrap:
                                                                "anywhere",
                                                        }}
                                                    >
                                                        {msg.msg}
                                                    </div>
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
