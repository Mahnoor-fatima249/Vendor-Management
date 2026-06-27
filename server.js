import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

let vendors = [];
let quotations = [];

// 1. VENDOR ROUTING
const vendorRouter = express.Router();
vendorRouter.get('/', (req, res) => res.json(vendors));
vendorRouter.post('/', (req, res) => {
    const { vendorName, companyName, email } = req.body;
    if (!vendorName || !email) return res.status(400).json({ error: "Required fields missing" });
    const newVendor = { id: Date.now().toString(), vendorName, companyName, email };
    vendors.push(newVendor);
    res.status(201).json(newVendor);
});
vendorRouter.put('/:id', (req, res) => {
    const { id } = req.params;
    let index = vendors.findIndex(v => v.id === id);
    if (index !== -1) {
        vendors[index] = { ...vendors[index], ...req.body };
        return res.json(vendors[index]);
    }
    res.status(404).json({ error: "Not found" });
});
vendorRouter.delete('/:id', (req, res) => {
    vendors = vendors.filter(v => v.id !== req.params.id);
    quotations = quotations.filter(q => q.vendorId !== req.params.id);
    res.json({ message: "Deleted" });
});

// 2. QUOTATION ROUTING
const quotationRouter = express.Router();
quotationRouter.get('/', (req, res) => res.json(quotations));
quotationRouter.post('/', (req, res) => {
    const { title, vendorId, amount } = req.body;
    if (!title || !vendorId || !amount) return res.status(400).json({ error: "Required fields missing" });
    const newQuotation = { id: Date.now().toString(), title, vendorId, amount: parseFloat(amount), status: 'Pending' };
    quotations.push(newQuotation);
    res.status(201).json(newQuotation);
});
quotationRouter.patch('/:id/status', (req, res) => {
    let index = quotations.findIndex(q => q.id === req.params.id);
    if (index !== -1) {
        quotations[index].status = req.body.status;
        return res.json(quotations[index]);
    }
    res.status(404).json({ error: "Not found" });
});

app.use('/api/vendors', vendorRouter);
app.use('/api/quotations', quotationRouter);

app.listen(PORT, () => {
    console.log("In-Memory Local Database Layer Initialized Successfully.");
    console.log(`Server running smoothly on http://localhost:${PORT}`);
});