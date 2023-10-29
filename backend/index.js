const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors');
const Agora = require('agora-access-token');
// const { Client } = require('twilio/lib/base/BaseTwilio');
// const { twiml } = require('twilio');
// const connectToMogoose = require('./database');



app.use(express.json());
app.use(cors());

// Available routes

//login, signup, middleware1 three routes in one file
// app.use('/api/auth',require('./src/routers/auth'));

// app.use('/food',require('./src/routers/food'));

// app.use('/food/type',require('./src/routers/foodtype'));

// app.use('/api/admin',require('./src/routers/admin'));

// app.use('/cart',require('./src/routers/shopping_cart'));






// require('dotenv').config();

// const SID = 'AC0dceab9174d48ebe7f5bca54049bc091';
// const TWILIO_TOKEN = 'b56d7fbfca6f712b2e5f32b29a7ca751';

// const accountSid = process.env.SID;
// const authoToken = process.env.TWILIO_TOKEN;


// app.post('/api/make-call', function (req, res) {

//     const client = require('twilio')(SID, TWILIO_TOKEN);

//     client.calls
//         .create({
//             to: '+918302088852',
//             from: '+12296096153',
//             url: 'https://handler.twilio.com/twiml/EH2092aca0eba7f94df412e087296c00a5'
//         })
//         .then(call => console.log(call.sid))
//         .then(err => console.log(err))

//     res.send("Hello");
// })

// app.all('/', function(req, res) {
//     res.type('xml')

//     const VoiceResponse = require('twilio').twiml.VoiceResponse;
//     const twiml = new VoiceResponse();

//     twiml.say("hwllo from the server")

//     const gather = twiml.gather({
//         input:'speech',
//         action:'/results',
//         laguage:'en-GB',
//         speechMode:'phone_call',
//         speechTimeout:'auto',
//     });

//     gather.say('press 1 for track 1 or press 2 for trank 2');


//     // twiml.play();
//     res.send(twiml.toString());
// })

// app.all('/results', function(req, res) {
//     const userInput = req.body.Digit;
//     const twiml = new VoiceResponse();

//     console.log(userInput);
// })

// http://localhost:5000/ send hello msg then when start nodemon index.js

// const AgoraRTC = require('agora-rtc-sdk')

const RtcTokenBuilder = require('agora-access-token').RtcTokenBuilder;
// const RtcRoles = require('agora-access-token').RtcRoles;


const appId = '1a44607c167f47cd9eef76b221eda01f';
const appCertificate = 'bfdfd586516e4eb5a2bd976c06bc73df';
const channelName = 'piyush';
const uid = 999;
const role = '';
const   expirationtimeInSeconds = 3600;



const generateToken = ( channelName, uid) => {
    const expirationtimeInSeconds = 3600;

    const currentTimestamp = Math.floor(Date.now() / 1000);
    const expirationTime = currentTimestamp + expirationtimeInSeconds;

    // const key = RtcTokenBuilder.buildKey(appId, appCertificate, uid, role, expirationTime);
    const token = RtcTokenBuilder.buildTokenWithUid(appId, appCertificate, channelName, uid, role, expirationTime)

    console.log("agora Token", token);
    return token;
}

// app.post('/generateToken', (req, res) => {
    // const {name, channelname, uid} = req.body;
   
    const token = Agora.RtcTokenBuilder.buildTokenWithUid(
        appId,
        appCertificate,
        channelName,
        uid,
        Agora.RtcRole.PUBLISHER,
        expirationtimeInSeconds
      );
//    res.send(token)
console.log(token);
// })

app.get('/', async(req, res) => {
    const agoraEngine = AgoraRTC.createClient({ mode: "rtc", codec: "vp9" });

    // Listen for the "user-published" event to retrieve an AgoraRTCRemoteUser object.
    agoraEngine.on("user-published", async (user, mediaType) => {
        // Subscribe to the remote user when the SDK triggers the "user-published" event.
        await agoraEngine.subscribe(user, mediaType);
        console.log("subscribe success");

        // Subscribe and play the remote audio track.
        if (mediaType == "audio") {
            channelParameters.remoteUid = user.uid;
            // Get the RemoteAudioTrack object from the AgoraRTCRemoteUser object.
            channelParameters.remoteAudioTrack = user.audioTrack;
            // Play the remote audio track. 
            channelParameters.remoteAudioTrack.play();
            showMessage("Remote user connected: " + user.uid);
        }

        // Listen for the "user-unpublished" event.
        agoraEngine.on("user-unpublished", user => {
            console.log(user.uid + "has left the channel");
            showMessage("Remote user has left the channel");
        });
    });



    await agoraEngine.join(appId,  channelName,  token,  uid);
    showMessage("Joined channel: " +  channelName);
    // Create a local audio track from the microphone audio.
    channelParameters.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
    // Publish the local audio track in the channel.
    await agoraEngine.publish(channelParameters.localAudioTrack);
    console.log("Publish success!");

    // json.send()
     

})


// let options = 
// {
//     // Pass your App ID here.
//     appId: '1a44607c167f47cd9eef76b221eda01f',
//     // Set the channel name.
//     channel: 'virtual bridge',
//     // Pass your temp token here.
//     token: '8302088852',
//     // Set the user ID.
//     uid: 9999,
// };

// let channelParameters =
// {
//   // A variable to hold a local audio track.
//   localAudioTrack: null,
//   // A variable to hold a remote audio track.
//   remoteAudioTrack: null,
//     // A variable to hold the remote user id.
//   remoteUid: null,
// };

async function startBasicCall() {
    // Create an instance of the Agora Engine
    // const agoraEngine = AgoraRTC.createClient({ mode: "rtc", codec: "vp9" });

    // Listen for the "user-published" event to retrieve an AgoraRTCRemoteUser object.
    // agoraEngine.on("user-published", async (user, mediaType) => {
        // Subscribe to the remote user when the SDK triggers the "user-published" event.
        // await agoraEngine.subscribe(user, mediaType);
        // console.log("subscribe success");

        // Subscribe and play the remote audio track.
        // if (mediaType == "audio") {
        //     channelParameters.remoteUid = user.uid;
        //     // Get the RemoteAudioTrack object from the AgoraRTCRemoteUser object.
        //     channelParameters.remoteAudioTrack = user.audioTrack;
        //     // Play the remote audio track. 
        //     channelParameters.remoteAudioTrack.play();
        //     showMessage("Remote user connected: " + user.uid);
        // }

        // Listen for the "user-unpublished" event.
    //     agoraEngine.on("user-unpublished", user => {
    //         console.log(user.uid + "has left the channel");
    //         showMessage("Remote user has left the channel");
    //     });
    // });

    // window.onload = function () {
        // Listen to the Join button click event.
        document.getElementById("join").onclick = async function () {
            // Join a channel.
            await agoraEngine.join(options.appId, options.channel, options.token, options.uid);
            showMessage("Joined channel: " + options.channel);
            // Create a local audio track from the microphone audio.
            channelParameters.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
            // Publish the local audio track in the channel.
            await agoraEngine.publish(channelParameters.localAudioTrack);
            console.log("Publish success!");
        }

        // Listen to the Leave button click event.
//         document.getElementById('leave').onclick = async function () {
//             // Destroy the local audio track.
//             channelParameters.localAudioTrack.close();
//             // Leave the channel
//             await agoraEngine.leave();
//             console.log("You left the channel");
//             // Refresh the page for reuse
//             window.location.reload();
//         }
//     }
}

 


app.listen(port, function () {
    console.log(`localhost:${port}`);
})