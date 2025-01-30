export class Book {
	constructor(props) {
		this.title = props.title;
		this.author = props.author;
		this.pages = props.pages;
		this.readPercentage = props.readPercentage;
		this.pubDate = props.pubDate;
		this.callNum = props.callNum;
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
}
