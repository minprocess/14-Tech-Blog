
const newArticleHandler = async (event) => {
  document.location.replace('/dashboard');
}


const newFormHandler2 = async (event) => {
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

console.log("public dashboard.js addEventListener")

document
  .querySelector('#new-post')
  .addEventListener('click', newFormHandler2);


