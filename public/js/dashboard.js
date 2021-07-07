// Hand

// When user clicks Update Article button in editArticle.hbs this function is called
// The Put routes is given only title and text/content
// How does PUT route know the user id and the article ID
const updateFormHandler = async (event) => {
  event.preventDefault();

  // The document calling this routine should be editarticle.hbs with has two editable text boxes
  // the title and the text.
  // Another form has the same ids as article-title and article-text but ids have to be unique in a single document, I hope
  const title = document.querySelector('#article-title').value.trim();
  const text = document.querySelector('#article-text').value.trim();

  if (title && text) {
    const response = await fetch(`/api/articles`, {
      method: 'PUT',
      body: JSON.stringify({ title, text }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

};

const newFormHandler = async (event) => {
  console.log("dashbord.js newFormHandler");
  event.preventDefault();

  const title = document.querySelector('#article-title').value.trim();
  const text = document.querySelector('#article-text').value.trim();

  if (title && text) {
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


//



document
  .querySelector('.new-article-form')
  .addEventListener('submit', newFormHandler);


