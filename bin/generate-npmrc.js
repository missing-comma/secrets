var fs = require('fs');
var path = require('path');

var datas = [
	// ['always-auth ', ' true'],
	['//registry.npmjs.org/:_authToken', process.env.NODE_AUTH_TOKEN],
];

var data = datas
	.map(function (row) {
		return row.join('=');
	})
	.join('\n');

fs.writeFileSync('./.npmrc', data);
