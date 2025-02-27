// À ajuster selon votre structure
import db from '../config/db.js';

// Récupérer tous les utilisateurs
const getAllUsers = () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM users', (error, results) => {
        if (error) {
          return reject(error);
        }
        resolve(results);
      });
    });
  };
  
  // Récupérer un utilisateur par son ID
  const getUserById = (id) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM users WHERE id = ?', [id], (error, results) => {
        if (error) {
          return reject(error);
        }
        resolve(results[0]);
      });
    });
  };
  
  // Créer un nouvel utilisateur
  const createUser = (username, email) => {
    return new Promise((resolve, reject) => {
      db.query(
        'INSERT INTO users (username, email) VALUES (?, ?)',
        [username, email],
        (error, results) => {
          if (error) {
            return reject(error);
          }
          resolve({ id: results.insertId, username, email });
        }
      );
    });
  };
  
  export default {
    getAllUsers,
    getUserById,
    createUser,
  };