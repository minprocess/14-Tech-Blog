// Handler for button clicks in editarticle.hbs
// update content for Update button
// delete content for delete button
// see dashboard.js

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
