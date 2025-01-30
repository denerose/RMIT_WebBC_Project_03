'use strict';

import { displayBooks } from './display.js';
import { Library } from './library.js';
import { Book } from './book.js';
import { parseCSV } from './files.js';

const library = new Library();

document.getElementById('show-book-form').addEventListener('click', () => {
	document.getElementById('add-book').classList.toggle('hidden');
});

document.getElementById('add-book-form').addEventListener('submit', (e) => {
	e.preventDefault();

	const formData = new FormData(e.target);

	const title = formData.get('title');
	const author = formData.get('author');
	const pages = formData.get('pages');
	const readPercentage = formData.get('readPercentage');
	const pubDate = formData.get('pubDate');
	const callNum = library.getNextCallNum();

	const book = new Book({
		title,
		author,
		pages,
		readPercentage,
		pubDate,
		callNum,
	});

	library.addBook(book);
	displayBooks(library);
});

document.getElementById('upload-btn').addEventListener('click', () => {
	const fileInput = document.getElementById('file-input');
	if (fileInput.files.length === 0) {
		window.alert('No file uploaded');
		return;
	}
	const file = fileInput.files[0];
	const reader = new FileReader();
	reader.onload = (e) => {
		const data = parseCSV(e.target.result);
		data.forEach((book) => {
			const newBook = new Book(book);
			library.addBook(newBook);
		});
		displayBooks(library);
	};
	reader.readAsText(file);
});
