

import { useEffect, useState, useRef } from 'react';
import AgoraRTC from 'agora-rtc-sdk';
import User_sidebar from '../../components/user_sidebar/User_sidebar';
import './join.css'


const APP_ID = '1a44607c167f47cd9eef76b221eda01f';
const CHANNEL_NAME = 'piyush';
const UID = 999;
const APP_CERTIFICATE = 'bfdfd586516e4eb5a2bd976c06bc73df';

const token = '007eJxTYLgf07W3pc+ee9/h6vBfhU8Z7hmZ8j29+f5RorGzR37Z5hIFBsNEExMzA/NkQzPzNBPz5BTL1NQ0c7MkIyPD1JREA8M05RU2qQ2BjAxfb71gYmSAQBCfjaEgs7K0OIOBAQD1yiIy'

const Join = () => {

    const client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' })

    const joinChannel = async function () {

        client.init(`${APP_ID}`);

        console.log('AgoraRTC client initialized');
        showMessage('AgoraRTC client initialized');

        client.join(token, CHANNEL_NAME, null, (USER_ID) => {
            console.log('User' + USER_ID + ' joined channel ' + CHANNEL_NAME);
            showMessage(`'User' + ${USER_ID}+ ' joined channel ' + ${CHANNEL_NAME}`)

            const localStream = AgoraRTC.createStream({ audio: true, video: true });

            localStream.init(() => {
                localStream.play('local-video');
            })

            client.publish(localStream);
        });

    }


    const leaveChannel = () => {
        client.leave(() => {
            console.log('left the channel')
            showMessage('left the channel');
            // localVideoRef.current.srcObject = null;
            // remoteVideoRef.current.forEach(videoElment => {
            //     videoElment.srcObject = null;
            //     videoElment.remove();
            // })

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


            <div className="user-panel">
                <div className="sidebar-menu">
                    <User_sidebar />
                </div>
                <div className="user-content">

                    <input type="text" className="inp" placeholder="Dial phone number"></input>



                    <button className="btn btn-success">Call Now</button>


                    {/* <div>
                        <h2 class="left-align">Get started with Voice Calling</h2>
                        <div class="row">
                            <div>
                                <button onClick={joinChannel} type="button" id="join">Join</button>
                                <button onClick={leaveChannel} type="button" id="leave">Leave</button>
                            </div>

                        </div>
                        <div id="message">Heloo i a msg</div>
                    </div> */}

                    <div className="callerContainer">
                        {/* video container for publisher */}
                        <div style={{
                            width: '307px',
                            height: ' 205px'
                        }} id='local-video'>
                            <div className='video-name'>Piuysh prajapat</div>
                            <div className='video-mic-icon'>m</div>
                        </div>

                        {/* video container for subscriber  */}
                        <div style={{
                            width: '307px',
                            height: ' 205px'
                        }} id='remote-video'>
                            <div className='video-name'>Praveen suthar</div>
                            <div className='video-mic-icon'>m</div>
                        </div>
                    </div>

                    <div className="call footer">mute mic volume</div>
                </div>
            </div>
        </>
    )
}

export default Join
