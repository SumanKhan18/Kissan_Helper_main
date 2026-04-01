import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { createNote, getNotes, deleteNote } from '../controllers/noteController.js';

const router = express.Router();

router.post('/', authMiddleware, createNote);      // Add note
router.get('/', authMiddleware, getNotes);         // Get all notes
router.delete('/:id', authMiddleware, deleteNote); // Delete note by ID

export default router;
