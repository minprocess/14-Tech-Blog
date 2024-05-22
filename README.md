# 14-Tech-Blog
## Description
This full stack (back-end and front-end) web site hosts a multi-author blog that allows users to post articles and comments on articles. This web application has a MVC structure based on HTML, CSS, Node, Handlebars, Express and mySql.

This web site is deployed on Heroku at
https://tech-blog-2542.herokuapp.com/

This web site was created as a homework assignment for the Penn LPS Coding Boot Camp in 2021. A skeleton was provided by the Boot Camp. Penn LPS is no longer giving the Coding Boot Camp. It has been replace by an AI Boot Camp. Details are given at the following link: https://bootcamp.sas.upenn.edu/

## Installation
The GitHub repository for this web app is https://github.com/minprocess/14-Tech-Blog

After cloning or forking the repository, install npm packages with the following command  
`npm i`

If you fork this project on GitHub and don't plan on merging the fork back to the origin then you can detach the forked repository on GitHub as explained in the following link
https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/detaching-a-fork

If you are going to use this app on your own PC you will have to have MySQL installed on your PC. Installing MySQL Workbench facilitates testing and debuggin

Make a copy of `.env.EXAMPLE` and rename it `.env`. In `.env` you will have to set the database the following connection parameters for the local database: name, password and user. The .env file has comments that tell you how to switch between the local database or the remote database on Heroku. 

To view the database contents either on your local PC or on Heroku, use MySQL Workbench is an easy to use interface to mySQL on your PC and to JAWSDB on Heroku.

The following article was helpful for me:
https://coding-boot-camp.github.io/full-stack/heroku/deploy-with-heroku-and-mysql

To seed the database specified by the database in the .env file, use the following command.
`node seeds/index.js`
If JAWSDB_URL is set then the blog database will be seeded. If JAWSDB_URL is not set then the local blog database will be seeded.

To use git to deploy this app to Heroku use the following commands after installing Heroku CLI.
`heroku create`
`git push heroku main`

The file package.json includes some dev packages for ESlint and Prettier. ESlint was run only one time. Only two problems were found. They were corrected. Since then ESlint has not been run.

## Usage

To start the backend on your local PC use the command  
`node server.js`  

Go to a browser and in the address bar type `localhost:3001`. 

To run on Heroku, go to the following address  
`https://tech-blog-2542.herokuapp.com/`  

The schematic below shows the database after user id:2 creates the article id:3 and user id:3 adds a comment. user_id and article_id and foreign keys.  

![Data model showing relationships between articles, users and comments](./assets/data-model.png)  

The screen capture belows shows the homepage. To see the comments for an article click on the title.

![Homepage with title and content of all posts](./assets/homepage-snapshot.png)  

The screen capture below shows the titles of posts made by Xandromus. To edit an article click on the title. Click on the Post button to create a post.  

![Dashboard of Xandromus with his posts](./assets/dashboard-of-Xandromus.png)  

The screen capture below shows the comments of an article. This page is reached by clicking the title of an article on the homepage.  

![article 1](./assets/article-1-page-snapshot.png)  

## MIT License

Copyright (c) 2021 William Pate

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

