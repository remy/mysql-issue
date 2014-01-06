'use strict';
var mysql = require('mysql'),
    fs = require('fs'),
    RSVP = require('rsvp'),
    sql = 'select * from sandbox where url="iwucov" and revision=1';

function connect(options) {
  return new RSVP.Promise(function (resolve) {
    var connection = mysql.createPool(options);

    // var params = [this.options.charset, this.options.collate];
    // connection.query('SET NAMES ? COLLATE ?', params, function (error) {
    //   if (error) {
    //     return reject(error);
    //   }

    return resolve(connection);
    // });
  });
}

function setup(connection) {
  return new RSVP.Promise(function (resolve, reject) {
    var sql = '';
    try {
      sql = fs.readFileSync('./table.sql', 'utf8');
    } catch (e) {
      return reject(e);
    }

    connection.query(sql, function (error) {
      if (error) {
        return reject(error);
      }

      resolve(connection);
    });
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
  'host': 'localhost',
  'user': 'root',
  'password': '',
  'database': 'test',
  'charset': 'UTF8MB4'
};

connect(options).then(setup).then(query).then(function (result) {
  console.log(result);
}, function (error) {
  console.error(error);
});