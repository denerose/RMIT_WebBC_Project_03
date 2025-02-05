'use strict';

import { displayBooks, drawTitle } from './display.js';
import { Library } from './library.js';
import { Book } from './book.js';
import { parseCSV } from './files.js';

const library = new Library();

const stop = drawTitle();

const locale = navigator.language;

document.getElementById('stop-animation').addEventListener('click', stop);

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
	const pubDate =
		formData.get('pubDate') ||
		`${formData.get('pubYear')}-${formData.get('pubMonth')}`;
	const genre = formData.get('nonFiction')
		? formData.get('subject')
		: formData.get('genre');
	const nonFiction = formData.get('nonFiction');
	const callNum = library.getNextCallNum();

	const book = new Book({
		title,
		author,
		pages,
		readPercentage,
		pubDate,
		genre,
		nonFiction,
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
		try {
			const data = parseCSV(e.target.result);
			data.forEach((book) => {
				const newBook = new Book(book);
				library.addBook(newBook);
			});
			displayBooks(library);
		} catch (error) {
			window.alert(error);
		}
	};
	reader.readAsText(file);
});

$(document).ready(function () {
	$('#pub-date-default').show();
	$('#pub-date-fallback').hide();

	const test = document.createElement('input');

	try {
		test.type = 'month';
	} catch (e) {
		console.log(e.description);
	}

	if (test.type === 'text') {
		$('#pub-date-default').hide();
		$('#pub-date').removeAttr('required');
		$('#pub-date-fallback').show();
		$('#month-select').attr('required', 'required');
		$('#pub-year').attr('required', 'required');
	}

	$('#non-fiction-genres').hide();

	$('#nonFiction').change(function () {
		if (this.checked) {
			$('#fiction-genres').hide();
			$('#non-fiction-genres').show();
		} else {
			$('#non-fiction-genres').hide();
			$('#fiction-genres').show();
		}
	});

	$('#title-input, #author').on('blur', function () {
		$(this).val($(this).val().trim());
		if ($(this).val() === '' || $(this).val().indexOf(',') !== -1) {
			$(this).addClass('error');
			if (!$(this).next().hasClass('error-msg')) {
				$(this).after('<span class="error-msg">Invalid input</span>');
			}
		} else {
			$(this).removeClass('error');
			$(this).next('.error-msg').remove();
		}
	});
});

window.onload = () => {
	document.querySelector('#add-book-form').reset();
};
