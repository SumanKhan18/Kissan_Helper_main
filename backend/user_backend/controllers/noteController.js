import Note from '../models/Note.js';
import User from '../models/User.js';

// Create a note
export const createNote = async (req, res) => {
  const { title, content } = req.body;

  try {
    const note = await Note.create({
      title,
      content,
      user: req.user._id // from authMiddleware
    });

    // Push note ID to user's notes array
    await User.findByIdAndUpdate(req.user._id, { $push: { notes: note._id } });

    res.status(201).json({ message: 'Note created successfully', note });
  } catch (err) {
    res.status(500).json({ message: 'Failed to create note', error: err.message });
  }
};

// Get all notes for the logged-in user
export const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user._id });
    res.json({ notes });
    // console.log(notes)
  } catch (err) {
    // console.log(err)
    res.status(500).json({ message: 'Failed to fetch notes', error: err.message });
  }
};

// Delete a note
export const deleteNote = async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id
    });

    if (!note) {
      return res.status(404).json({ message: 'Note not found or not yours' });
    }

    // Remove note ID from user's notes array
    await User.findByIdAndUpdate(req.user._id, { $pull: { notes: req.params.id } });

    res.json({ message: 'Note deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete note', error: err.message });
  }
};
