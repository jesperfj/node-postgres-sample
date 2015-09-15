# Postgres JSONB Node.js Example

A simple sample app that shows use of Postgres as a document store leveraging the newish JSONB capabilities. This is made extremely simple by the [massive.js](https://github.com/robconery/massive-js) library.

[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

## Functionality

* Basic non-single-page-app with Bootstrap CSS served by Express and Handlebars
* No schema management or other SQL database configuration, thanks to massive.js
* Add products to database
* Search products using indexes configured automatically by massive.js
* View product detail

## Extending

The demo code has been designed so that you can extend the schema of your product data by editing [a single Javascript array of structs in a single file](routes/products.js#L6-L10). 
