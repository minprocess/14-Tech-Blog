// public/js/newarticle.js
// Handler on client PC for button clicks in newarticle.hbs
// add post to database when user click the Create button in newarticle.hbs

const newCommentFormHandler = async (event) => {
  event.preventDefault();
  console.log("in newCommentFormHandler")

  // id of user that created the original article
  const idCommenter = event.target.getAttribute('data-id');
  const text = document.querySelector('#comment').value.trim();
  const idArticle = document.querySelector('#comment').getAttribute('data-id');

  console.log("idCommenter", idCommenter);
  console.log("idPoster", idArticle);
  console.log("text", text);

  if (text) {
    const response = await fetch(`/api/comments`, {
      method: 'POST',
      body: JSON.stringify({ text, idArticle, idCommenter }),
      headers: {
          'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      console.log("newcomment.js newCommentFormHandler doc.loc.replace('/dashboard'");
      document.location.replace('/dashboard');
    } else {
      alert('Failed to create article');
    }
  }
};

console.log("newcomment.js loaded")
document
.querySelector('.new-comment')
.addEventListener('click', newCommentFormHandler);
