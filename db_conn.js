const mysql = require("mysql");
const db = {
  host: "us-cdbr-east-02.cleardb.com",
  user: "b69bcc47d6bb4e",
  password: "f5ae7a94",
  database: "heroku_b3dc40c998c614e",
  port: 3306,
};
//b69bcc47d6bb4e:f5ae7a94@us-cdbr-east-02.cleardb.com/heroku_b3dc40c998c614e?reconnect=true
// db.connect((err) => {

//     if(err){
//         throw err;
//     }else{
//         console.log("database connected");
//     }
// });
mysql: var connection;

function handleDisconnect() {
  connection = mysql.createConnection(db); // Recreate the connection, since

  // the old one cannot be reused.

  connection.connect(function (err) {
    // The server is either down
    if (err) {
      // or restarting (takes a while sometimes).
      console.log("error when connecting to db:", err);
      setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
    } else {
      console.log("database");
    } // to avoid a hot loop, and to allow our node script to
  }); // process asynchronous requests in the meantime.
  // If you're also serving http, display a 503 error.
  connection.on("error", function (err) {
    console.log("db error", err);
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      // Connection to the MySQL server is usually
      handleDisconnect(); // lost due to either server restart, or a
    } else {
      // connnection idle timeout (the wait_timeout
      throw err; // server variable configures this)
    }
  });
  global.db = connection;
}

handleDisconnect();
