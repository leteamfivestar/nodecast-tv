const express = require('express');
const router = express.Router();
const { backupGroups } = require('../db');
const auth = require('../auth');

// Get all backup groups
// GET /api/backup-groups
router.get('/', auth.requireAuth, async (req, res) => {
    try {
        const groups = await backupGroups.getAll();
        res.json(groups);
    } catch (err) {
        console.error('Error getting backup groups:', err);
        res.status(500).json({ error: 'Failed to get backup groups' });
    }
});

// Save all backup groups
// POST /api/backup-groups
router.post('/', auth.requireAuth, async (req, res) => {
    try {
        const groups = req.body;
        if (!Array.isArray(groups)) {
            return res.status(400).json({ error: 'Expected an array of backup groups' });
        }
        const saved = await backupGroups.save(groups);
        res.json(saved);
    } catch (err) {
        console.error('Error saving backup groups:', err);
        res.status(500).json({ error: 'Failed to save backup groups' });
    }
});

module.exports = router;
