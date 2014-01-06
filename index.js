'use strict';
var mysql = require('mysql'),
    fs = require('fs'),
    RSVP = require('rsvp'),
    sql = 'select * from sandbox where url="iwucov" and revision=1';

function connect(options) {
  return new RSVP.Promise(function (resolve) {
    var connection = mysql.createPool ? mysql.createPool(options) : mysql.createClient(options);

    // var params = [this.options.charset, this.options.collate];
    // connection.query('SET NAMES ? COLLATE ?', params, function (error) {
    //   if (error) {
    //     return reject(error);
    //   }

    return resolve(connection);
    // });
  });
}

function query(connection) {
  return new RSVP.Promise(function (resolve, reject) {
    connection.query(sql, [], function (err, results) {
      if (err) {
        return reject(err);
      }

      resolve(results);
    });
  });
}

var options = {
  'host': 'db.jsbin.com',
  'user': '...', // hidden
  'password': '...',
  'database': 'jsbin',
  'charset': 'UTF8MB4'
};

connect(options).then(query).then(function (result) {
//console.log(mysql.PACKAGE.version);
  console.log(result);
}, function (error) {
  console.error(error);
});
