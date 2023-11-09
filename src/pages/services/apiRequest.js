import React, { Component, useState, useEffect } from "react";
import axios from "axios";
import {
    notification,
  } from 'antd';

const baseURL = "https://subleasing-be.victoriousdesert-96ff8f6f.northeurope.azurecontainerapps.io";

export function RequestGet(path, value, responseValueName, secondPath) {
    console.log(path, value, responseValueName, secondPath)

            axios.get(`${baseURL+path}`, {params: value,}).then((response) => {
                console.log(response);
                if(response.status == "200" && response.data.status.code == "success" ){
                    if(responseValueName){
                        if(responseValueName == "content"){
                            console.log(response.data.data.totalElements);
                            localStorage.setItem(`totalElements`, JSON.stringify(response.data.data.totalElements))   
                        }
                        localStorage.setItem(`${responseValueName}`, JSON.stringify(response.data.data.content))
                    }
                    if(secondPath){
                        window.location.replace(`${secondPath}`)
                    }
                } else { 
                    this.setState({error: response.status.message})
                    notification.error({
                    message: 'Wrong username or password',
                    description: response.data.status.message
                    })
                }
            }).catch((error) => {
                notification.error({
                    message: 'Login Failed',
                    description: error.response
                })
            }
            );
};

export function RequestPost(path, value, responseValueName, secondPath) {
        console.log(path, value, responseValueName, secondPath)
        axios.post(`${baseURL+path}`, value).then((response) => {
            console.log(2,response)
            if(response.status == "200" && response.data.status.code == "success" ){
                if(responseValueName){
                    if(responseValueName === "user"){
                        localStorage.setItem(`auth`, true)
                    } 
                    localStorage.setItem(`${responseValueName}`, JSON.stringify(response.data.data))
                }
                if(secondPath){
                    window.location.replace(`${secondPath}`)
                }
            } else {
                console.log(1,response)
                notification({
                    message: 'Login Failed',
                    description: response.data
                })
            }
        }).catch((error) => {
            console.log(2,error)
            notification.error({
                message: 'Login Failed',
                description: error.response.data.status.message,
            })
        }
        );
}

export default {RequestGet, RequestPost};