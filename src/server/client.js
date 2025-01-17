const base = require('../base.js');

class Client extends base { // server

	constructor(socket, key, compress = true) {
		super();
		this.compress = compress;
		this.socket = socket;
		this.key = key;
		this.socket.on('data', (data) => {
			this.buffer = Buffer.concat([this.buffer, data]);
			this._parse();
		}).on('close', () => {
			this.emit('close');
		}).on('error', (err) => {
			this.emit('error', err);
		});
	}

	id() {
		return this.key;
	}

}

module.exports = Client;
