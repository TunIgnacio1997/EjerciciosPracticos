const express = require("express");
const app = express();

// Middleware para leer JSON
app.use(express.json());

// Rutas
app.use("/api/tareas", require("./routes/tasks.routes"));

// Puerto
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
