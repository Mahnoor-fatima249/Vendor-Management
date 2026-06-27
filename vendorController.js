// Temporary In-memory Database for Vendors
let vendors = [];

const getVendors = (req, res) => {
    res.json(vendors);
};

const createVendor = (req, res) => {
    const { vendorName, companyName, email, contactNumber, address } = req.body;
    if (!vendorName || !email) {
        return res.status(400).json({ error: "Vendor Name and Email are required" });
    }
    const newVendor = { id: Date.now().toString(), vendorName, companyName, email, contactNumber, address };
    vendors.push(newVendor);
    res.status(201).json(newVendor);
};

const updateVendor = (req, res) => {
    const { id } = req.params;
    const { vendorName, companyName, email, contactNumber, address } = req.body;
    let index = vendors.findIndex(v => v.id === id);
    if (index !== -1) {
        vendors[index] = { ...vendors[index], vendorName, companyName, email, contactNumber, address };
        return res.json(vendors[index]);
    }
    res.status(404).json({ error: "Vendor not found" });
};

const deleteVendor = (req, res) => {
    const { id } = req.params;
    vendors = vendors.filter(v => v.id !== id);
    res.json({ message: "Vendor deleted successfully" });
};

module.exports = { getVendors, createVendor, updateVendor, deleteVendor, vendors };