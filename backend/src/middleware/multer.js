// middleware/multer.js
const multer = require('multer');
const path = require('path');

// Configuración de almacenamiento
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Directorio donde se guardarán los archivos
  },
  filename: (req, file, cb) => {
    // Configura el nombre del archivo
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Filtrado de archivos por tipo
const fileFilter = (req, file, cb) => {
  const fileTypes = /jpeg|jpg|png|gif/; // Tipos permitidos
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = fileTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error('Only images are allowed!'));
  }
};

// Exporta la configuración de multer
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // Limita el tamaño del archivo a 5MB
  fileFilter: fileFilter,
});

module.exports = upload;
