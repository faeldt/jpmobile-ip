var softbank = require("./softbank");

var carriers = [];
carriers.push(softbank);

function IPnumber(IPaddress) {
    var ip = IPaddress.match(/^(\d+)\.(\d+)\.(\d+)\.(\d+)$/);
    if(ip) {
        return (+ip[1]<<24) + (+ip[2]<<16) + (+ip[3]<<8) + (+ip[4]);
    }

    return null;
}

function IPmask(maskSize) {
    return -1<<(32-maskSize)
}

function getIpsForCarrier(carrier) {

	for (var i = 0; i < carriers.length; i++) {
		
		if (carriers[i].name.toUpperCase() == carrier.toUpperCase()) {
			return carriers[i].ips;
		}
	}

	return [];
}

function getCarrierForIp(ip) {

	for (var i = 0; i < carriers.length; i++) {

		var ips = getIpsForCarrier(carriers[i].name);
		for (var y = 0; y < ips.length; y++) {

			var ipAndMask = ips[y].split('/');
			if (ipAndMask.length == 2)
			{
				if ((IPnumber(ip) & IPmask(ipAndMask[1])) == IPnumber(ipAndMask[0]))
					return carriers[i].name;
			}
		}
	}

	return "";

}

function isIpFromCarrier(ip, carrier)
{
	var carrierName = getCarrierForIp(ip);

	return carrierName.toUpperCase()  == carrier.toUpperCase();
}

module.exports = {

	carriers: carriers,
	getIpsForCarrier: getIpsForCarrier,
	getCarrierForIp: getCarrierForIp,
	isIpFromCarrier: isIpFromCarrier,
	middleware: function() {
		
		return function(req, res, next) {
			req.carrier = getCarrierForIp(req.header('x-forwarded-for')||req.connection.remoteAddress||"");
			next();
		}		
	}
}
