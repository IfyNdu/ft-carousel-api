var mysql = require('mysql2');
var Client = require('ssh2').Client;
var ssh = new Client();

module.exports = new Promise(function (resolve, reject) {

  ssh.on('ready', function () {
    
    ssh.forwardOut(
      // source address, this can usually be any valid address
      process.env.DBHOST,
      // source port, this can be any valid port number
      12345,
      // destination address (localhost here refers to the SSH server)
      process.env.DBHOST,
      // destination port
      3306,
      function (err, stream) {
         // use `sql` connection as usual
        const connection = mysql.createConnection({
          host: process.env.DBHOST,
          user: process.env.DBUSER,
          password: process.env.DBPASS,
          database: process.env.DB,
          stream: stream
        });

        // send connection back in variable depending on success or not
        connection.connect(function (err) {
          if (!err) {
            resolve(connection);
          } else {
            reject(err);
          }
        });
      });
  }).connect({
    host: process.env.DBHOST,
    port: process.env.SSHDBPORT,
    username: process.env.SSHDBUSER,
    password: process.env.SSHDBPASS
  });
});
