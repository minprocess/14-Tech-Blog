// public/js/newarticle.js
// Handler on client PC for button clicks in newarticle.hbs
// add post to database when user click the Create button in newarticle.hbs

const newArticleFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#new-title').value.trim();
  const text = document.querySelector('#new-text').value.trim();
 
  if (title && text) {
    const response = await fetch(`/api/articles`, {
      method: 'POST',
      body: JSON.stringify({ title, text }),
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
.querySelector('.new-article')
.addEventListener('click', newArticleFormHandler);
