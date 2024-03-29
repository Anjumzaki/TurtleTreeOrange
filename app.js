const express=require('express');
const body_parser=require('body-parser');
const file_upload=require('express-fileupload');
const session=require('express-session');
const cookieParser=require('cookie-parser');
var favicon = require('serve-favicon')
const path=require('path');
const port = process.env.PORT || 5000;
const app=express();
require('./db_conn.js');
var sess;

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(cookieParser());
app.use(session({secret: "Shh, it is secrest"}));
app.set('port', process.env.port || port); 
app.set('views', __dirname + '/views'); 
app.set('view engine', 'ejs'); 
app.use(body_parser.urlencoded({ extended: false }));
app.use(body_parser.json()); 
app.use(express.static(path.join(__dirname, 'public'))); 
app.use(file_upload()); 

const {index_page,view_post_page}=require('./controller/index.js');
const {admin_index_page,admin_login,admin_login_page,admin_logout,admin_delete_news_post,admin_add_news_post,admin_edit_news_post,admin_update_news_post}=require('./controller/admin.js');
app.get('/',index_page);
app.get('/view_post/:id',view_post_page);
app.get('/view_post', (req,res) => { res.redirect('/')});
app.get('/yasir', (req,res) => { res.send('hi Yasir')});
app.get('/admin_login',admin_login);
app.post('/admin_login',admin_login_page);
app.get('/admin/',admin_index_page);
app.get('/admin_delete_news_post/:id',admin_delete_news_post);
app.get('/admin_edit_news_post/:id',admin_edit_news_post);
app.post('/admin_add_news_post',admin_add_news_post);
app.post('/admin_edit_news_post/:id',admin_update_news_post);
app.get('/admin_logout',admin_logout);
setInterval(function () {
    db.query('SELECT 1');
  }, 9000);
app.listen(port);
