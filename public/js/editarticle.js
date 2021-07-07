// Handler for button clicks in editarticle.hbs
// update content for Update button
// delete content for delete button
// see dashboard.js


const updateFormHandler2 = async (event) => {
    console.log("editarticle.js updateFormHandler2");
    event.preventDefault();
  
    if (event.target.hasAttribute('data-id')) {
        console.log("updateformhandler2 data-id", id)
        const id = event.target.getAttribute('data-id')

        const title = document.querySelector('#article-title').value.trim();
        const text = document.querySelector('#article-text').value.trim();

        console.log("updateformhandler2 title", title)
        console.log("updateformhandler2 text", text)
    
        if (title && text) {
            const response = await fetch(`/api/articles`, {
                method: 'PUT',
                body: JSON.stringify({ id, title, text }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        
            if (response.ok) {
                console.log("editarticle.js newFormHandler doc.loc.replace('/dashboard'");
        
                document.location.replace('/dashboard');
            } else {
                alert('Failed to create article');
            }
        }
    }
  };
  


const delButtonHandler2 = async (event) => {
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

console.log("editarticle.js addeventlisteners")

document
  .querySelector('.update-article-form')
  .addEventListener('submit', updateFormHandler2);

  document
  .querySelector('.delete-article-form')
  .addEventListener('click', delButtonHandler2);