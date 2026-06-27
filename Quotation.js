// Quotation Model Prototype
class Quotation {
    constructor(id, title, description, vendorId, amount, submissionDate, status = 'Pending') {
        this.id = id;
        this.title = title;
        this.description = description;
        this.vendorId = vendorId;
        this.amount = parseFloat(amount);
        this.submissionDate = submissionDate;
        this.status = status; // Pending, Approved, Rejected
    }
}

module.exports = Quotation;