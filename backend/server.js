const http = require('http');


const VoiceResponse = require('twilio').twiml.VoiceResponse;

http.createServer(function (req, res){
    const twiml = new VoiceResponse();
    twiml.say('Hello from your pals at Twilio');

    res.writeHead(200,{ 'Content-Type':'text/xml'});

    res.end(twiml.toString());

})

.listen(1337,'127.0.0.1');

console.log('TwiMl sever running at  http://127.0.0.1:1337/')