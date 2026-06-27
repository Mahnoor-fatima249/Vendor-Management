// Vendor Model Prototype
class Vendor {
    constructor(id, vendorName, companyName, email, contactNumber, address) {
        this.id = id;
        this.vendorName = vendorName;
        this.companyName = companyName;
        this.email = email;
        this.contactNumber = contactNumber;
        this.address = address;
    }
}

module.exports = Vendor;
