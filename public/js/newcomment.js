// public/js/newarticle.js
// Handler on client PC for button clicks in newarticle.hbs
// add post to database when user click the Create button in newarticle.hbs

const newCommentFormHandler = async (event) => {
  event.preventDefault();

  // id of user that created the original article
  const user_id = event.target.getAttribute('data-id');
  const text = document.querySelector('#comment').value.trim();
  const article_id = document.querySelector('#comment').getAttribute('data-id');

  if (text) {
    const response = await fetch(`/api/comments`, {
      method: 'POST',
      body: JSON.stringify({ text, article_id, user_id }),
      headers: {
          'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to create article');
    }
  }
};

document
.querySelector('.new-comment')
.addEventListener('click', newCommentFormHandler);
