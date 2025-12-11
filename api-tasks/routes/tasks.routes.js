const express = require("express");
const router = express.Router();
const db = require("../db");
const validateTask = require("../middlewares/validateTask");

/**
 * Crear nueva tarea
 */
router.post("/", validateTask, (req, res) => {
  const { titulo, descripcion, estado } = req.body;

  const sql = "INSERT INTO tasks (titulo, descripcion, estado) VALUES (?, ?, ?)";

  db.query(sql, [titulo, descripcion, estado], (err, result) => {
    if (err) {
      console.log("❌ Error en BD:", err); // <--- NECESARIO
      return res.status(500).json({ error: "Error en BD" });
    }

    res.status(201).json({
      id: result.insertId,
      titulo,
      descripcion,
      estado
    });
  });
});

/**
 * Obtener todas las tareas
 */
router.get("/", (req, res) => {
  db.query("SELECT * FROM tasks", (err, rows) => {
    if (err) return res.status(500).json({ error: "Error en BD" });
    res.json(rows);
  });
});

/**
 * Obtener una tarea por ID
 */
router.get("/:id", (req, res) => {
  db.query("SELECT * FROM tasks WHERE id = ?", [req.params.id], (err, rows) => {
    if (err) return res.status(500).json({ error: "Error en BD" });
    if (rows.length === 0) return res.status(404).json({ error: "No encontrada" });
    res.json(rows[0]);
  });
});

/**
 * Actualizar tarea
 */
router.put("/:id", validateTask, (req, res) => {
  const { titulo, descripcion, estado } = req.body;

  const sql = "UPDATE tasks SET titulo=?, descripcion=?, estado=? WHERE id=?";

  db.query(sql, [titulo, descripcion, estado, req.params.id], (err) => {
    if (err) return res.status(500).json({ error: "Error en BD" });

    res.json({
      id: req.params.id,
      titulo,
      descripcion,
      estado
    });
  });
});

/**
 * Eliminar tarea
 */
router.delete("/:id", (req, res) => {
  db.query("DELETE FROM tasks WHERE id = ?", [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: "Error en BD" });

    res.json({ mensaje: "Tarea eliminada" });
  });
});

module.exports = router;
