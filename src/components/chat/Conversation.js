import React, { useEffect, useState } from "react";
import { getUser } from "../../redux/thunk";
import { Avatar } from "@mui/material";
import "./Chat.scss";

const Conversation = ({ data, currentUser, online }) => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const userId = data.members?.find((id) => id !== currentUser);
        const getUserData = async () => {
            try {
                const { data } = await getUser(userId);
                setUserData(data);
            } catch (error) {
                console.log(error);
            }
        };
        getUserData();
    }, [currentUser, data.members]);
    return (
        <div className="follower conversation">
            <div>
                {online && <div className="online-dot"></div>}
                <Avatar
                    alt={userData?.name}
                    src={userData?.avatar !== "" ? userData?.avatar : null}
                    className="followerImage"
                    style={{ width: 50, height: 50 }}
                />
                <div className="name">
                    <span className="h6 medium dark-title">
                        {userData?.name}
                    </span>{" "}
                    <br />
                    <div
                        style={{ display: "flex", justifyContent: "flex-end" }}
                    >
                        <span className="h8 regular dark-lighter">
                            {online ? "Online" : "Offline"}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Conversation;
