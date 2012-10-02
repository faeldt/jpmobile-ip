## jpmobile-ip

Get japanese carrier from ip (Based on jpmobile-ipaddresses rails plugin by jpmobile).

Created for cubie-talk.com, to deal with the situation that Softbank does not allow collections to ports other than 80 from the default Android browser.

## Currently supported carriers

Softbank

## Installation

npm install jpmobile-ip

## Usage

```js
var jpmobile = require('jpmobile-ip');

if (jpmobile.isIpFromCarrier(req.connection.remoteAddress, "softbank")) {
  // Do something..
}

```