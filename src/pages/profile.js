import React, {Component, useEffect, useState} from "react";
import Header from "../Header";
import '../styles/profile.css';
import axios from "axios";
import {useParams} from "react-router";




const Profile = (props) => {
    const [user, setUser] = useState({});
    let params = useParams();
    // const params = useParams();
    useEffect(() => {
        if(localStorage.getItem("user")) {
            let userId = JSON.parse(localStorage.getItem("user")).id
            console.log(params.id)
            if(Number(params.id) === Number(userId)) {
                axios.get("https://subleasing-be.victoriousdesert-96ff8f6f.northeurope.azurecontainerapps.io/api/user/" + userId).then(
                    (response) => {
                        console.log(response.data.data)
                        setUser(response.data.data)
                    }
                )
            }
            console.log(userId)

        }
    })

      return (
        <>
            <Header className="Header"/>
            <div className="profile-container">
                <h1>User Profile</h1>

                <div className="profile-item">
                    <span className="label">Username:</span>
                    <div className="value">{user.username}</div>
                </div>

                <div className="profile-item">
                    <span className="label">Full name:</span>
                    <div className="value">{user.fullName?user.fullName:'No data'}</div>
                </div>

                <div className="profile-item">
                    <span className="label">Email:</span>
                    <div className="value">{user.email}</div>
                </div>

                <div className="profile-item">
                    <span className="label">Facebook URL:</span>
                    <div className="value">
                        {user.facebookUrl
                            ? <a href={user.facebookUrl}  target="_blank"> {user.facebookUrl}</a>
                            : <p>No data</p>

                        }
                    </div>
                </div>

                <div className="profile-item">
                    <span className="label">Telegram URL:</span>
                    <div className="value">
                        <div className="value">
                            {user.telegramUrl
                                ? <a href={user.telegramUrl}  target="_blank"> {user.telegramUrl}</a>
                                : <p>No data</p>
                            }
                        </div>
                    </div>
                </div>

                <div className="profile-item">
                    <span className="label">Telephone Number:</span>
                    <div className="value">
                        {user.phoneNumber
                            ?  user.phoneNumber
                            : <p>No data</p>
                        }
                    </div>
                </div>
            </div>

        </>
        );
}

export default Profile;