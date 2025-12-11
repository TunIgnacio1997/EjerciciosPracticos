const mysql = require("mysql2");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "tasksdb"
});

db.getConnection((err, connection) => {
  if (err) {
    console.log("❌ Error al conectar a MySQL:", err);
    return;
  }
  console.log("✅ Conexión a MySQL correcta");
  connection.release();
});

module.exports = db;
