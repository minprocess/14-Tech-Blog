// Handler for button clicks in editarticle.hbs
// update content for Update button
// delete content for delete button
// see dashboard.js




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
  .querySelector('.update-article-form')
  .addEventListener('submit', newFormHandler);

  document
  .querySelector('.article-list')
  .addEventListener('click', delButtonHandler);