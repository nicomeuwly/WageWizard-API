import SalaryAdjustment from "../models/salaryAdjustment.js";

// Créer un ajustement de salaire
async function createSalaryAdjustement(req, res) {
    const userId = req.user._id;
    const salaryAdjustment = new SalaryAdjustment({
        user: req.user._id,
        ...req.body
    });
    try {
        await salaryAdjustment.save();
        res.status(201).send(salaryAdjustment);
    } catch (err) {
        res.status(400).send(err);
    }
}

// Récupérer tous les ajustements de salaire de l'utilisateur connecté
async function getSalaryAdjustements(req, res) {
    const userId = req.user._id;
    try {
        const salaryAdjustments = await SalaryAdjustment.find({ user: userId });
        res.send(salaryAdjustments);
    } catch (err) {
        res.status(500).send(err);
    }
}

// Mettre à jour un ajustement de salaire de l'utilisateur connecté
async function updateSalaryAdjustement(req, res) {
    const userId = req.user._id;
    const _id = req.params.id;
    const updates = Object.keys(req.body);
    try {
        const salaryAdjustment = await SalaryAdjustment.findOne({ _id, user: userId });
        if (!salaryAdjustment) return res.status(404).send('Ajustement de salaire non trouvé');
        updates.forEach(update => salaryAdjustment[update] = req.body[update]);
        await salaryAdjustment.save();
        res.send(salaryAdjustment);
    } catch (err) {
        res.status(500).send(err);
    }
}

// Supprimer un ajustement de salaire de l'utilisateur connecté
async function deleteSalaryAdjustement(req, res) {
    const userId = req.user._id;
    const _id = req.params.id;
    try {
        const salaryAdjustment = await SalaryAdjustment.findOneAndDelete({ _id, user: userId });
        if (!salaryAdjustment) return res.status(404).send('Ajustement de salaire non trouvé');
        res.send(salaryAdjustment);
    } catch (err) {
        res.status(500).send(err);
    }
}

export { createSalaryAdjustement, getSalaryAdjustements, updateSalaryAdjustement, deleteSalaryAdjustement };