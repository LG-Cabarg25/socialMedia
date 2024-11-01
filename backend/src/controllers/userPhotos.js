// controllers/userPhotos.js
const db = require('../models/db');

exports.uploadPhoto = async (req, res) => {
  try {
    const userId = req.user.userId; // Tomamos el ID del usuario autenticado
    const photoUrl = req.file.filename; // Guardamos el nombre del archivo

    // Insertamos la nueva foto en la tabla user_photos
    await db('user_photos').insert({
      user_id: userId,
      photo_url: photoUrl,
      is_profile: true,
    });

    // Actualizamos todas las fotos anteriores para que no sean foto de perfil
    await db('user_photos')
      .where({ user_id: userId })
      .andWhereNot('photo_url', photoUrl)
      .update({ is_profile: false });

    res.status(201).json({ message: 'Photo uploaded successfully', photo_url: photoUrl });
  } catch (error) {
    res.status(500).json({ error: 'Error uploading photo' });
  }
};
