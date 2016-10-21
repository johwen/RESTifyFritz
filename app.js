var express = require('express');
var app = express();
var tr = require("tr-064");
var tr064 = new tr.TR064();



app.set('port', process.env.PORT || 3000);

app.get('/', function(req,res){
tr064.initTR064Device("fritz.box", 49000, function (err, device) {
    if (!err) {
        device.startEncryptedCommunication(function (err, sslDev) {
            if (!err) {
                sslDev.login('USER', 'PASSWORD');
                var wanip = sslDev.services["urn:dslforum-org:service:Hosts:1"];
                wanip.actions.GetSpecificHostEntry({NewMACAddress:"MACADDRESS"},function (err, result) {
			console.log(err);
			console.log(result);
			res.send('You requested the root-path (/)<br>\
			response:<br>\
			 ' + JSON.stringify(result));
                });
            }
        });
    }
});
});



app.listen(app.get('port'), function(){
console.log('listening on port '+ app.get('port'));
});
