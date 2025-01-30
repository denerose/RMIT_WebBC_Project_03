export class Book {
	constructor(props) {
		this.title = props.title || 'No Title';
		this.author = props.author || 'No Author';
		this.pages = props.pages || -1;
		this.readPercentage = props.readPercentage || 0;
		this.pubDate = props.pubDate || 'No Date';
		this.genre = props.genre || 'No Genre';
		this.nonFiction = props.nonFiction || false;
		this.callNum = props.callNum || this.newUUID();
	}

	setReadPercentage(percentage) {
		this.readPercentage = percentage;
	}

	read() {
		this.setReadPercentage(100);
	}

	unread() {
		this.setReadPercentage(0);
	}

	newUUID() {
		// checking that browser supports crypto
		if (self && self.crypto) {
			return crypto.randomUUID();
		} else {
			console.log('self.crypto not available');
			// if crypto is not available, use Date.now() and Math.random to generate a unique id
			return Date.now().toString(36) + '-' + Math.floor(Math.random() * 9999);
		}
	}
}
