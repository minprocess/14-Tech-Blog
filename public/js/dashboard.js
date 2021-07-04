const newFormHandler = async (event) => {
  console.log("dashbord.js newFormHandler");
  event.preventDefault();

  const title = document.querySelector('#article-title').value.trim();
  const text = document.querySelector('#article-text').value.trim();

  if (name && text) {
    const response = await fetch(`/api/articles`, {
      method: 'POST',
      body: JSON.stringify({ title, text }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      console.log("dashbord.js newFormHandler doc.loc.replace('/dashboard'");

      document.location.replace('/dashboard');
    } else {
      alert('Failed to create article');
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/articles/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      console.log("dashbord.js delButtonHandler doc.loc.replace('/dashboard'");
      document.location.replace('/dashboard');
    } else {
      alert('Failed to delete article');
    }
  }
};

document
  .querySelector('.new-article-form')
  .addEventListener('submit', newFormHandler);

document
  .querySelector('.article-list')
  .addEventListener('click', delButtonHandler);
