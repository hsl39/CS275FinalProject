var EventEmitter = require('events').EventEmitter;
var request = require('request');
var eventEm = new EventEmitter;

console.log("Diary module loaded...")

//database details
var mysql = require('mysql');
var con = mysql.createConnection({
    host: '',
    user: '',
    password: '',
    database: ''
});

con.connect(function(err) {
    if (err) {
        console.log('Error establishing connection to database...');
        console.log(err);
    } else {
        console.log('Established connection to database!');
    }
});

function Diary() {
    EventEmitter.call(this);
}
utils.inherits(Diary, EventEmitter);


//renders html on index.html
Tables.prototype.getTables = function() {
  // html for creating the card
    var str = `
  `;
    this.emit('getTables', str);
}

//to show data in the card
Tables.prototype.describeTables = function(tbl_name) {
    // var self = this;
    // con.query('SELECT * FROM ' + tbl_name, function(err, rows, fields) {
    //     if (err) {
    //         console.log(err);
    //         self.emit('describeTables', 'Error while processing query...');
    //     } else {
    //         var html_str = '<table border="1">';
    //         html_str += '<tr>';
    //         var headers = [];
    //         for (i = 0; i < fields.length; i++) {
    //             headers.push(fields[i].name);
    //             html_str += '<th>' + fields[i].name + '</th>';
    //         }
    //         html_str += '</tr>';
    //         for (i = 0; i < rows.length; i++) {
    //             html_str += '<tr>';
    //             for (j = 0; j < headers.length; j++) {
    //                 html_str += '<td>' + rows[i][headers[j]] + '</td>';
    //             }
    //             html_str += '</tr>';
    //         }
    //         html_str += '</table>'
    //         self.emit('describeTables', html_str);
    //     }
    // });
};

module.exports = diary;
