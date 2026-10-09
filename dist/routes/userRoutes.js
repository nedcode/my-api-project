"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const data_source_1 = require("../data-source");
const User_1 = require("../entity/User");
const router = (0, express_1.Router)();
router.post('/', async (req, res) => {
    var _a;
    const { email, name } = (_a = req.body) !== null && _a !== void 0 ? _a : {};
    if (typeof email !== 'string' || !email || typeof name !== 'string' || !name) {
        res.status(400).json({ error: 'Fehler beim Erstellen des Benutzers' });
        return;
    }
    try {
        const userRepository = data_source_1.AppDataSource.getRepository(User_1.User);
        const user = userRepository.create({ email, name });
        const result = await userRepository.save(user);
        res.status(201).json(result);
    }
    catch (error) {
        res.status(400).json({ error: 'Fehler beim Erstellen des Benutzers' });
    }
});
router.get('/', async (req, res) => {
    try {
        const userRepository = data_source_1.AppDataSource.getRepository(User_1.User);
        const users = await userRepository.find();
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ error: 'Fehler beim Abrufen der Benutzer' });
    }
});
exports.default = router;
