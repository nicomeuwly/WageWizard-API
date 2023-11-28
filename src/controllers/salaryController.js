import SalaryConfig from "../models/salary.js";

// Créer un paramètre de salaire
async function createSalaryConfig(req, res) {
    const userId = req.user._id;
    const existingSalaryConfig = await SalaryConfig.findOne({ user: userId });
    if (existingSalaryConfig) return res.status(400).send('Paramètres de salaire déjà existants');
    const salaryConfig = new SalaryConfig({
        user: req.user._id,
        ...req.body
    });
    try {
        await salaryConfig.save();
        res.status(201).send(salaryConfig);
    } catch (err) {
        res.status(400).send(err);
    }
}

// Récupérer les paramètres de salaire de l'utilisateur connecté
async function getSalaryConfig(req, res) {
    const userId = req.user._id;
    try {
        const salaryConfig = await SalaryConfig.findOne({ user: userId });
        if (!salaryConfig) return res.status(404).send('Paramètres de salaire non trouvés');
        res.send(salaryConfig);
    } catch (err) {
        res.status(500).send(err);
    }
}

// Mettre à jour les paramètres de salaire de l'utilisateur connecté
async function updateSalaryConfig(req, res) {
    const userId = req.user._id;
    const updates = Object.keys(req.body);
    try {
        const salaryConfig = await SalaryConfig.findOne({ user: userId });
        if (!salaryConfig) return res.status(404).send('Paramètres de salaire non trouvés');
        updates.forEach(update => salaryConfig[update] = req.body[update]);
        await salaryConfig.save();
        res.send(salaryConfig);
    } catch (err) {
        res.status(500).send(err);
    }
}

export { createSalaryConfig, getSalaryConfig, updateSalaryConfig };