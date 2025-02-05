import { Book } from './book.js';

export class Library {
	constructor() {
		this.books = new Map();
		this.callNum = 0;
	}

	getNextCallNum() {
		return `xyz-${this.callNum++}`;
	}

	addBook(book) {
		if (book instanceof Book === false) {
			console.warn('book must be an instance of Book');
			return false;
		}
		this.books.set(book.callNum, book);
		return true;
	}

	removeBook(callNum) {
		if (!this.books.has(callNum)) {
			console.warn('book not found');
			return false;
		}
		this.books.delete(callNum);
		return true;
	}

	getBook(callNum) {
		return this.books.get(callNum);
	}

	getAllBooks() {
		return this.books;
	}

	getBookCount() {
		return this.books.size;
	}

	getReadBooks() {
		return Array.from(this.books.values()).filter(
			(book) => book.readPercentage === 100
		);
	}

	getUnreadBooks() {
		return Array.from(this.books.values()).filter(
			(book) => book.readPercentage === 0
		);
	}

	getInProgressBooks() {
		return Array.from(this.books.values()).filter(
			(book) => book.readPercentage > 0 && book.readPercentage < 100
		);
	}

	sortBooksByTitle() {
		return new Map(
			[...this.books.entries()].sort((a, b) => {
				return a.title > b.title;
			})
		);
	}
}
