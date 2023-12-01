import React, { Component, useState, useEffect } from "react";
import axios from "axios";
import {
    notification,
  } from 'antd';

const baseURL = "https://subleasing-be.victoriousdesert-96ff8f6f.northeurope.azurecontainerapps.io";

export async function RequestGet(path, value) {
    console.log(path, value)
    try {
        const response = await axios.get(`${baseURL+path}`, {params: value,})
        console.log("response:",response);
        if(response.status == "200" && response.data.status.code == "success" ){
            return response.data.data;
        } else { 
            notification.error({
                message: 'Wrong username or password',
                description: response.data.status.message
            })
        }
    } catch (error) {
        notification.error({
            message: 'Login Failed',
            description: error.response
        })
    }
};

export async function RequestPost(path, value, responseValueName, secondPath) {
        console.log(path, value, responseValueName, secondPath)
        try {
            const response = await axios.post(`${baseURL+path}`, value)
            console.log("response:",response);
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
                return response.data.data;
            } else {
                notification.error({
                    message: 'Login Failed',
                    description: response.data.status.message
                })
            }
        } catch (error) {
            console.log(error)
            console.log(error.response.data.status.message)
            notification.error({
                message: 'Login Failed',
                description: error.response.data.status.message
            })
        }
}

export async function RequestDelete(path, value) {
    console.log(path, value)
    try {
        const response = await axios.delete(`${baseURL+path}`, {params: value,})
        console.log("response:",response);
        if(response.status == "200" && response.data.status.code == "success" ){
            return response.data.data;
        } else { 
            notification.error({
                message: 'Wrong username or password',
                description: response.data.status.message
            })
        }
    } catch (error) {
        notification.error({
            message: 'Login Failed',
            description: error.response
        })
    }
};

export default {RequestGet, RequestPost};