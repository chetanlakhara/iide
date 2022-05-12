const mysql = require('mysql');
const express = require('express');
const bodyparser = require('body-parser');
var app = express();
//Configuring express server
app.use(bodyparser.json());

//MySQL details
var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Mysqlchetan2001',
    database: 'blog',
    multipleStatements: true
    });

    mysqlConnection.connect((err)=> {
        if(!err)
        console.log('Connection Established Successfully');
        else
        console.log('Connection Failed!'+ JSON.stringify(err,undefined,2));
        });


//Establish the server connection
//PORT ENVIRONMENT VARIABLE
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}..`));


//Creating GET Router to fetch all the blog details from the MySQL Database
app.get('/blog' , (req, res) => {
    mysqlConnection.query('SELECT * FROM details', (err, rows, fields) => {
    if (!err)
    res.send(rows);
    else
    console.log(err);
    })
    } );


    //Router to GET specific blog detail from the MySQL database
app.get('/blog/:id' , (req, res) => {
    mysqlConnection.query('SELECT * FROM details WHERE blog_no = ?',[req.params.id], (err, rows, fields) => {
    if (!err)
    res.send(rows);
    else
    console.log(err);
    })
    } );


    //Router to INSERT/POST a blog's detail
app.post('/blog', (req, res) => {
    let blog = req.body;
    var sql = "SET @blog_no = ?;SET @auth_name = ?;SET @blo_title = ?;SET @blo_text = ?; 
    CALL AddOrEdit (@blog_no,@auth_name,@blo_title,@blo_text);
    mysqlConnection.query(sql, [blog.blog_no, blog.auth_name, blog.blo_title, blog.blo_text], (err, rows, fields) => {
    if (!err)
    rows.forEach(element => {
    if(element.constructor == Array)
    res.send('New Blog NO : '+ element[0].blog_no);
    });
    else
    console.log(err);
    })
    });



    //Router to UPDATE a blog's detail
app.put('/blog', (req, res) => {
    let blog = req.body;
    var sql = "SET @blog_no = ?;SET @auth_name = ?;SET @blo_title = ?;SET @blo_text = ?; 
    CALL AddOrEdit(@blog_no,@auth_name,@blo_title,@blo_text);";
    mysqlConnection.query(sql, [blog.blog_no, blog.auth_name, blog.blo_title, blog.blo_text], (err, rows, fields) => {
    if (!err)
    res.send('blog Details Updated Successfully');
    else
    console.log(err);
    })
    });



    //Router to DELETE a blog's detail
app.delete('/blog/:id', (req, res) => {
    mysqlConnection.query('DELETE FROM details WHERE blog_no = ?', [req.params.id], (err, rows, fields) => {
    if (!err)
    res.send('blog Record deleted successfully.');
    else
    console.log(err);
    })
    });