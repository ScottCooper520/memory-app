Summary of commands
====================
https://www.mongodb.com/docs/mongodb-shell/connect/
To interact with MongoDB from the command line, bring up a terminal.
Connect to a local MongoDB deployment on the Default Port (localhost:27017):
  
  mongosh (or mongosh "mongodb://localhost:27017")

For a non-default port, supply a connection string:
E.g. mongosh "mongodb://localhost:28015" or mongosh --port 28015

To connect to a specific database (such as specified in nodejs):

  mongosh "mongodb://localhost:27017/mydb"

where mydb is also in the url string in the nodedb specification.

To disconnect from deployment, use one of the following:
  Type .exit, exit, or exit().
  Type quit or quit().
  Press Ctrl + D.
  Press Ctrl + C twice.

This is what I needed to do to get MongoDB working with Node app.
Once db exists, then can use Node code to insert, delete, etc.
=================================================================
6/3/2023 - added Mongoose (from project folder)
  npm i mongoose

Created db 'mydb' and added one record to it:
  mongosh 
  -> test> prompt

  test> show dbs
  -> admin 180KiB, confog 48 KiB, local 72 KiB

  use mydb
  -> Creates (empty) database, mydb
  -> prompt is now mydb>

Note that typing db will also show which database is active.
  mydb> db
  -> mydb

  db.Collection.insertOne({"_id" : 1, "Title" : "img1", "Tags" : "family, wedding", "Date" : "1988", "Description" : "Wedding vows", "URL" : "path to url", "Note" : "None..."})

  mydb> show dbs
  -> added mydb 80 KiB to dbs shown above