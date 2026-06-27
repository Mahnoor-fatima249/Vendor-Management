import React, { useState } from 'react';
import { Edit, Trash2 } from 'lucide-react';

export default function VendorManager({ vendors, vendorForm, setVendorForm, handleVendorSubmit, handleDeleteVendor }) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredVendors = vendors.filter(v => 
    v.vendorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    v.companyName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '20px' }}>
      <div className="card">
        <h3>{vendorForm.id ? '✏️ Edit Vendor' : '➕ Add New Vendor'}</h3>
        <form onSubmit={handleVendorSubmit}>
          <div className="form-group"><label>Vendor Name</label><input type="text" className="form-control" required value={vendorForm.vendorName} onChange={e => setVendorForm({ ...vendorForm, vendorName: e.target.value })} /></div>
          <div className="form-group"><label>Company Name</label><input type="text" className="form-control" value={vendorForm.companyName} onChange={e => setVendorForm({ ...vendorForm, companyName: e.target.value })} /></div>
          <div className="form-group"><label>Email Address</label><input type="email" className="form-control" required value={vendorForm.email} onChange={e => setVendorForm({ ...vendorForm, email: e.target.value })} /></div>
          <div className="form-group"><label>Contact Number</label><input type="text" className="form-control" value={vendorForm.contactNumber} onChange={e => setVendorForm({ ...vendorForm, contactNumber: e.target.value })} /></div>
          <button type="submit" className="btn btn-primary">{vendorForm.id ? 'Update' : 'Save'}</button>
        </form>
      </div>

      <div className="card">
        <h3>👥 Registered Vendors</h3>
        <input type="text" className="form-control" style={{ marginBottom: '15px' }} placeholder="🔍 Search vendors..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
        <table>
          <thead><tr><th>Name</th><th>Company</th><th>Email</th><th>Actions</th></tr></thead>
          <tbody>
            {filteredVendors.map(v => (
              <tr key={v.id}>
                <td>{v.vendorName}</td><td>{v.companyName}</td><td>{v.email}</td>
                <td>
                  <button className="btn btn-primary" style={{ padding: '4px 8px', marginRight: '5px', background: '#3b82f6' }} onClick={() => setVendorForm(v)}><Edit size={14} /></button>
                  <button className="btn btn-danger" style={{ padding: '4px 8px' }} onClick={() => handleDeleteVendor(v.id)}><Trash2 size={14} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}