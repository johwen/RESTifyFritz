var express = require('express');
var app = express();
var tr = require("tr-064");
var tr064 = new tr.TR064();



app.set('port', process.env.PORT || 3000);

app.get('/Hosts/Macaddress/:macaddress', function(req,res){
tr064.initTR064Device("fritz.box", 49000, function (err, device) {
    if (!err) {
        device.startEncryptedCommunication(function (err, sslDev) {
            if (!err) {
                sslDev.login('USER', 'PASSWORD');
                var wanip = sslDev.services["urn:dslforum-org:service:Hosts:1"];
                wanip.actions.GetSpecificHostEntry({NewMACAddress:req.params.macaddress},function (err, result) {
			console.log(err);
			console.log(result);
                

			res.setHeader('Content-Type', 'application/json');
			res.send(JSON.stringify(result));
		});
            }
        });
    }
});
});




app.get('/Hosts/Count', function(req,res){
tr064.initTR064Device("fritz.box", 49000, function (err, device) {
    if (!err) {
        device.startEncryptedCommunication(function (err, sslDev) {
            if (!err) {
                sslDev.login('USER', 'PASSWORD');
                var wanip = sslDev.services["urn:dslforum-org:service:Hosts:1"];
                wanip.actions.GetHostNumberOfEntries(function (err, result) {
			console.log(err);
			console.log(result);
                

			res.setHeader('Content-Type', 'application/json');
			res.send(JSON.stringify(result));
		});
            }
        });
    }
});
});



app.get('/Hosts/Count/:id', function(req,res){
tr064.initTR064Device("fritz.box", 49000, function (err, device) {
    if (!err) {
        device.startEncryptedCommunication(function (err, sslDev) {
            if (!err) {
                sslDev.login('USER', 'PASSWORD');
                var wanip = sslDev.services["urn:dslforum-org:service:Hosts:1"];
                wanip.actions.GetGenericHostEntry({NewIndex:req.params.id},function (err, result) {
			console.log(err);
			console.log(result);
                

			res.setHeader('Content-Type', 'application/json');
			res.send(JSON.stringify(result));
		});
            }
        });
    }
});
});


app.listen(app.get('port'), function(){
console.log('listening on port '+ app.get('port'));
});
