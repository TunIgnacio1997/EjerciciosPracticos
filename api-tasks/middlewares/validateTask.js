// middlewares/validateTask.js
module.exports = function validateTask(req, res, next) {
  const { titulo, descripcion, estado } = req.body;

  if (!titulo || !descripcion || !estado) {
    return res.status(400).json({
      error: "Los campos 'titulo', 'descripcion' y 'estado' son obligatorios."
    });
  }

  next();
};
