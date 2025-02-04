import { Book } from './book.js';

const bookColours = [
	'blue',
	'red',
	'green',
	'yellow',
	'darkslategray',
	'purple',
	'orange',
	'darkgoldenrod',
	'pink',
	'brown',
	'gray',
	'white',
	'rebeccapurple',
	'darkorange',
	'darkolivegreen',
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

	ctx.clearRect(0, 0, canvas.width, canvas.height);

	let count = 0;

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
		const x = bookWidth * count++;
		const y = 0;
		ctx.fillStyle = bookColours[count % bookColours.length];
		ctx.fillRect(x, y, bookWidth, bookHeight);
		ctx.strokeStyle = 'black';
		ctx.strokeRect(x, y, bookWidth, bookHeight);
		ctx.save();
		ctx.translate(x + 10, y + 50);
		ctx.rotate(-Math.PI / 2);
		ctx.fillStyle = '#333333CC';
		ctx.textAlign = 'center';
		ctx.font = '30px serif';
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
	let count = 0;

	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = bookColours[count % bookColours.length];
	ctx.font = '30px serif';
	ctx.fillText('My Little Home Library', 0, 40 / upScale, canvas.width / 2);
	ctx.strokeText('My Little Home Library', 0, 40 / upScale, canvas.width / 2);

	function animateTitle() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.save();

		ctx.scale(upScale, upScale);
		ctx.fillStyle = bookColours[++count % bookColours.length];
		ctx.fillText('My Little Home Library', 0, 40 / upScale, canvas.width / 2);
		ctx.strokeStyle = bookColours[(count - 1) % bookColours.length];
		ctx.strokeText('My Little Home Library', 0, 40 / upScale, canvas.width / 2);

		upScale < 1.9 ? (upScale += 0.1) : (upScale = 1.1);

		ctx.restore();
	}

	setInterval(animateTitle, 1000);
}
