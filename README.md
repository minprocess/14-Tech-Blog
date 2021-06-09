# 14-Tech-Blog
MVC Node Express Server hosting multiple blogs

https://coding-boot-camp.github.io/full-stack/heroku/heroku-deployment-guide
1. Create Heroku app with Heroku CLI. The app will have a random name. `heroku create`
https://guarded-caverns-32673.herokuapp.com/ | https://git.heroku.com/guarded-caverns-32673.git
2. check with git remote -v
heroku  https://git.heroku.com/guarded-caverns-32673.git (fetch)
heroku  https://git.heroku.com/guarded-caverns-32673.git (push)
origin  git@github.com:minprocess/14-Tech-Blog.git (fetch)
origin  git@github.com:minprocess/14-Tech-Blog.git (push)
3. Add commit push to heroku
````
git add -A
git commit -m "Pushing to Heroku"
git push heroku main
````