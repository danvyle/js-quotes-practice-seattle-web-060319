// It might be a good idea to add event listener to make sure this file
// only runs after the DOM has finshed loading.
document.addEventListener('DOMContentLoaded', (e) => {
  console.log('event is loaded');
  main();
});

let url = 'http://localhost:3000/quotes?_embed=likes';

function main() {
  fetchQuotes();
  newQuoteForm();
}

function newQuoteForm() {
  const newForm = document.getElementById('new-quote-form');
  newForm.addEventListener('submit', function (e) {
    console.log(e.target)
    e.preventDefault();
    let newQuote = e.target[0].value;
    let newAuthor = e.target[1].value;
    console.log(e.target)
    newQuotePost(newQuote, newAuthor);
  });
}

function newQuotePost(newQuote, newAuthor) {
  return fetch('http://localhost:3000/quotes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      quote: newQuote,
      author: newAuthor,
      likes: 0,
    }),
  })
  .then(response => response.json())
  .then(data => createElements(data));
};


function fetchQuotes() {
  return fetch(url)
  .then(response => response.json())
  .then(data => renderQuotes(data));
}

function renderQuotes(data) {
  for (var i = 0; i < data.length; i++) {
    const author = data[i].author;
    const quoteId = data[i].id;
    const likes = data[i].likes.length;
    const quote = data[i].quote;
    createElements(author, quoteId, likes, quote);
  };
}

function createElements(author, quoteId, likes, quote) {
  let ul = document.getElementById('quote-list');
  let li = document.createElement('li');
  li.className = 'quote-card';
  ul.appendChild(li);
  let blockQuote = document.createElement('blockquote');
  blockQuote.className = 'blockquote';
  let p = document.createElement('p');
  p.className = 'mb-0';
  p.innerText = quote;
  let footer = document.createElement('footer');
  footer.className = 'blockquote-footer';
  footer.innerText = author;
  let createbtn = document.createElement('button');
  createbtn.className = 'btn-success';
  createbtn.innerHTML = `Likes: <span> ${likes}</span>`;
  let deletebtn = document.createElement('button');
  deletebtn.className = 'btn-danger';
  deletebtn.innerText = 'Delete';
  li.appendChild(blockQuote);
  blockQuote.appendChild(p);
  blockQuote.appendChild(footer);
  blockQuote.appendChild(createbtn);
  blockQuote.appendChild(deletebtn);
  deletebtn.addEventListener('click', function (e) {
    li.remove();
    return fetch(`http://localhost:3000/quotes/${quoteId}`, {
      method: 'DELETE',
    })
    .then(res => res.json());
  });

}
