import React from 'react'
import AgoraRTC from 'agora-rtc-sdk'
import { useEffect, useState, useRef } from 'react';
import Navbar from '../../components/navbar/Navbar';
import About_section from '../../components/aboutSection/About_section';
import Service_section from '../../components/serviceSection/Service_section';
const axios = require('axios');
// const RtcTokenBuilder = require('agora-access-token').RtcTokenBuilder;
// const RtcRoles = require('agora-access-token').RtcRoles;

const client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' })

// const appId = '1a44607c167f47cd9eef76b221eda01f';
// const appCertificate = 'bfdfd586516e4eb5a2bd976c06bc73df';

const channelName = 'piyush'; //phone number
// const token = '007eJxTYPCL8etbbHzeY48Xw7dVz1cKXZHLWPTkQC13TjCD6ZlM+98KDIaJJiZmBubJhmbmaSbmySmWqalp5mZJRkaGqSmJBoZpoh0GqQ2BjAzOVTuYGRkgEMRnYyjIrCwtzmBgAABZrx9v';

const token = '0061a44607c167f47cd9eef76b221eda01fIABvX03PL0ayFk4gPEkwV/+oOd3D+gQFMJ2o0z4YzS0Pjqw/tC2/AnqFIgB3fcpXGiw9ZQQAAQAQDgAAAgAQDgAAAwAQDgAABAAQDgAA'

// const uid = 9999;
// const role = '';



const APP_ID = '1a44607c167f47cd9eef76b221eda01f';
const APP_CERTIFICATE = 'bfdfd586516e4eb5a2bd976c06bc73df';
const CHANNEL_NAME = 'piyush';
const USER_ID = '999';
const expirationTimeInSeconds = 3600; // Token expiration time in seconds (1 hour in this example)


const Home = () => {


    const localVideoRef = useRef();
    const remoteVideoRef = useRef();

    

    const joinChannel = async function () {
        client.init(APP_ID, () => {
            console.log('AgoraRTC client initialized');
            showMessage('AgoraRTC client initialized');

            client.join(token, CHANNEL_NAME, null, (USER_ID) => {
                console.log('User' + USER_ID + ' joined channel ' + CHANNEL_NAME);
                showMessage(`'User' + ${USER_ID}+ ' joined channel ' + ${CHANNEL_NAME}`)

                const localStream = AgoraRTC.createStream({ audio: true, video: true });
                localStream.init(() => {
                    localStream.play(localVideoRef.current);
                    client.publish(localStream);
                })

                client.on('user-published', handleUserPublished);
                client.on('user-unpublished', handleUserunPublished);
                client.on('user-left', handleUserLeft);
                client.on('error', handleError);
                // client.on('stream-subscribed', (evt)=>{

                // })
            });
        }, (err) => {
            console.log('AgoraRTC client INitialized failed', err);
        })
    }

    const leaveChannel = () => {
        client.leave(() => {
            console.log('left the channel')
            showMessage('left the channel');
            localVideoRef.current.srcObject = null;
            remoteVideoRef.current.forEach(videoElment => {
                videoElment.srcObject = null;
                videoElment.remove();
            })

            // localStream.close();
        }, (err) => {
            console.error('Failed to leave', err);
            showMessage('Failed to leave')
        })
    }
    // joinChannel();

    const handleUserPublished = (user, mediaType) => {
        console.log('user published', user, mediaType);
        showMessage(`user published , ${user}, ${mediaType}`)
    }

    const handleUserunPublished = (user, mediaType) => {
        console.log('user un published', user, mediaType);
        showMessage(`user un published , ${user}, ${mediaType}`)
    }
    const handleError = (user, mediaType) => {
        console.log('Error', user, mediaType);
        showMessage(`errr, ${user}, ${mediaType}`)
    }
    const handleUserLeft = (user, mediaType) => {
        console.log('user Left', user, mediaType);
        showMessage(`user left, ${user}, ${mediaType}`)
    }

    function showMessage(text) {
        // document.getElementById("message").textContent = text;
    }

    return (
        <>
            <Navbar />
            <About_section />
            <Service_section />
        </>
    )
}

export default Home
