import { Book } from './book.js';

const animColours = [
	'#18005f',
	'#20005e',
	'#28005d',
	'#2f005c',
	'#37005b',
	'#3f0059',
	'#470058',
	'#4e0057',
	'#560056',
	'#5e0055',
	'#660054',
	'#6d0053',
	'#750052',
];

const titleColours = [
	'#ffee32',
	'#ffd90d',
	'#ffd100',
	'#fbc501',
	'#f7b801',
	'#f3ac01',
	'#ef9f01',
	'#eb9302',
	'#e37902',
	'#df6c02',
];

const bookColours = [
	'#5f0f40',
	'#9a031e',
	'#fb8b24',
	'#e36414',
	'#0f4c5c',
	'#2a9d8f',
	'#264653',
	'#287271',
	'#2a9d8f',
	'#8ab17d',
	'#e9c46a',
	'#efb366',
	'#f4a261',
	'#ee8959',
	'#e76f51',
	'#e97c61',
];

/**
 * Returns new HTML element with properties ready to be appended to the DOM
 * @param {string} elType element type e.g. 'div', 'p', 'h1'
 * @param {object} props object containing properties for the element - {string} id, {array<string>} or {string} classes, {string} text
 * @returns {HTMLElement} element
 */
function newElement(elType, props) {
	const element = document.createElement(elType);

	if (typeof props !== 'object') {
		console.warn('props must be an object');
		return element;
	}

	if (props.classes && Array.isArray(props.classes)) {
		props.classes.forEach((c) => element.classList.add(c));
	} else if (typeof props.classes === 'string') {
		element.classList.add(props.classes);
	}

	if (props.id) element.id = props.id;

	if (props.text) element.textContent = props.text;

	return element;
}

function newBookElement(book, libraryRef) {
	const bookEl = newElement('div', {
		classes: ['book', 'card'],
		id: book.callNum,
	});
	const title = newElement('h3', { text: book.title });
	const author = newElement('p', { classes: 'author', text: `${book.author}` });
	const pages = newElement('p', { text: `${book.pages} pages` });
	const readPercentage = newElement('p', {
		text: `${book.readPercentage}% read`,
	});
	const pubDate = newElement('p', { text: `Published: ${book.pubDate}` });
	const delBtn = newElement('button', { text: 'X', classes: 'delBtn' });

	delBtn.addEventListener('click', () => {
		libraryRef.removeBook(book.callNum);
		displayBooks(libraryRef);
	});

	bookEl.appendChild(title);
	bookEl.appendChild(author);
	bookEl.appendChild(pages);
	bookEl.appendChild(readPercentage);
	bookEl.appendChild(pubDate);
	bookEl.appendChild(delBtn);

	return bookEl;
}

function drawBooks(library) {
	const canvas = document.getElementById('book-canvas');
	const ctx = canvas.getContext('2d');
	const books = library.getAllBooks();
	let bookWidth = canvas.width / books.size;
	let bookHeight = 100;
	let count = 0;

	ctx.clearRect(0, 0, canvas.width, canvas.height);

	if (books.size === 0) {
		ctx.fillStyle = '#333333';
		ctx.textAlign = 'center';
		ctx.fillText('No books to display', canvas.width / 2, canvas.height / 2);
	}

	if (books.size < 15) {
		canvas.style.setProperty('width', books.size / 0.15 + 'vw');
		bookWidth = canvas.width / books.size;
	} else {
		canvas.style.setProperty('width', '100%');
	}

	books.forEach((book) => {
		const pickedColour = Math.floor(Math.random() * bookColours.length);
		const x = bookWidth * count++;
		const y = 0;
		ctx.fillStyle = bookColours[pickedColour];
		ctx.fillRect(x, y, bookWidth, bookHeight);
		ctx.strokeStyle = 'black';
		ctx.strokeRect(x, y, bookWidth, bookHeight);
		ctx.save();
		ctx.translate(x + 10, y + 50);
		ctx.rotate(-Math.PI / 2);
		ctx.fillStyle = titleColours[pickedColour % titleColours.length];
		ctx.textAlign = 'center';
		ctx.font = '20px serif';
		ctx.fillText(book.title, 0, bookWidth - bookWidth / 2, canvas.height - 10);
		ctx.restore();
	});
}

export function displayBooks(library) {
	const booksContainer = document.getElementById('book-list');
	booksContainer.replaceChildren();

	library.getAllBooks().forEach((book) => {
		const bookEl = newBookElement(book, library);
		booksContainer.appendChild(bookEl);
	});

	drawBooks(library);
}

export function drawTitle() {
	const canvas = document.getElementById('title-canvas');
	const ctx = canvas.getContext('2d');
	let upScale = 1.1;
	let reverse = false;
	let count = 0;

	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = animColours[count % animColours.length];
	ctx.font = '30px serif';
	ctx.fillText('My Little Home Library', 0, 40 / upScale, canvas.width * 0.75);
	ctx.strokeText(
		'My Little Home Library',
		0,
		40 / upScale,
		canvas.width * 0.75
	);

	function animateTitle() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.save();

		ctx.scale(upScale, upScale);
		ctx.fillStyle = animColours[++count % animColours.length];
		ctx.fillText(
			'My Little Home Library',
			0,
			40 / upScale,
			canvas.width * 0.75
		);
		ctx.strokeStyle = animColours[(count - 1) % animColours.length];
		ctx.strokeText(
			'My Little Home Library',
			0,
			40 / upScale,
			canvas.width * 0.75
		);

		if (reverse) {
			if (upScale < 1.1) {
				reverse = false;
				upScale = 1.1;
			} else {
				upScale -= 0.01;
			}
		} else {
			if (upScale > 1.9) {
				reverse = true;
				upScale = 1.9;
			} else {
				upScale += 0.01;
			}
		}

		ctx.restore();
	}

	const interval = setInterval(animateTitle, 100);

	return function stopAnimation() {
		clearInterval(interval);
	};
}
