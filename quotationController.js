let quotations = [];

const createQuotation = (req, res) => {
    const { title, description, vendorId, amount } = req.body;
    if (!title || !vendorId || !amount) {
        return res.status(400).json({ error: "Title, Vendor, and Amount are required" });
    }
    const newQuotation = {
        id: Date.now().toString(),
        title,
        description,
        vendorId,
        amount: parseFloat(amount),
        submissionDate: new Date().toISOString().split('T')[0],
        status: 'Pending'
    };
    quotations.push(newQuotation);
    res.status(201).json(newQuotation);
};

const getQuotations = (req, res) => {
    res.json(quotations);
};

const updateQuotationStatus = (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    let index = quotations.findIndex(q => q.id === id);
    if (index !== -1) {
        quotations[index].status = status;
        return res.json(quotations[index]);
    }
    res.status(404).json({ error: "Quotation not found" });
};

module.exports = { createQuotation, getQuotations, updateQuotationStatus, quotations };