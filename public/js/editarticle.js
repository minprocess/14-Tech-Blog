// Handler for button clicks in editarticle.hbs
// update content for Update button
// delete content for delete button
// see dashboard.js

const updateFormHandler = async (event) => {

  event.preventDefault();

  const id = event.target.getAttribute('data-id')
  const title = document.querySelector('#update-title').value.trim();
  const text = document.querySelector('#update-text').value.trim();
 
  if (title && text) {
    const response = await fetch(`/api/articles`, {
      method: 'PUT',
      body: JSON.stringify({ id, title, text }),
      headers: {
          'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      console.log("editarticle.js upateFormHandler doc.loc.replace('/dashboard'");
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
.querySelector('.update-article')
.addEventListener('click', updateFormHandler);

document
.querySelector('.delete-article')
.addEventListener('click', delButtonHandler);