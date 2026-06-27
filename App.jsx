import React, { useState, useEffect } from 'react';

export default function App() {
  const [vendors, setVendors] = useState([]);
  const [quotations, setQuotations] = useState([]);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [vendorForm, setVendorForm] = useState({ id: '', vendorName: '', companyName: '', email: '' });
  const [quoteForm, setQuoteForm] = useState({ title: '', vendorId: '', amount: '' });

  useEffect(() => { fetchVendors(); fetchQuotations(); }, []);

  const fetchVendors = () => fetch('http://localhost:5000/api/vendors').then(res => res.json()).then(setVendors);
  const fetchQuotations = () => fetch('http://localhost:5000/api/quotations').then(res => res.json()).then(setQuotations);

  const handleVendorSubmit = (e) => {
    e.preventDefault();
    const url = vendorForm.id ? `http://localhost:5000/api/vendors/${vendorForm.id}` : 'http://localhost:5000/api/vendors';
    fetch(url, {
      method: vendorForm.id ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(vendorForm)
    }).then(() => { fetchVendors(); setVendorForm({ id: '', vendorName: '', companyName: '', email: '' }); });
  };

  const handleDeleteVendor = (id) => {
    fetch(`http://localhost:5000/api/vendors/${id}`, { method: 'DELETE' }).then(() => { fetchVendors(); fetchQuotations(); });
  };

  const handleQuoteSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:5000/api/quotations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(quoteForm)
    }).then(() => { fetchQuotations(); setQuoteForm({ title: '', vendorId: '', amount: '' }); });
  };

  const handleStatusChange = (id, status) => {
    fetch(`http://localhost:5000/api/quotations/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    }).then(() => fetchQuotations());
  };

  const getVendorName = (id) => vendors.find(v => v.id === id)?.vendorName || 'Unknown';
  const lowestQuotation = quotations.length > 0 
    ? quotations.reduce((min, q) => parseFloat(q.amount) < parseFloat(min.amount) ? q : min, quotations[0])
    : null;

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #e5e7eb', paddingBottom: '15px', marginBottom: '20px' }}>
        <h2>🏛️ Vendor & Quotation System</h2>
        <div>
          <button className="btn btn-primary" style={{ marginRight: '10px' }} onClick={() => setActiveTab('dashboard')}>Dashboard</button>
          <button className="btn btn-primary" style={{ marginRight: '10px' }} onClick={() => setActiveTab('vendors')}>Vendors</button>
          <button className="btn btn-primary" onClick={() => setActiveTab('quotations')}>Quotations</button>
        </div>
      </div>

      {activeTab === 'dashboard' && (
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '30px' }}>
            <div className="card" style={{ background: '#3b82f6', color: 'white' }}><h3>Total Vendors</h3><p style={{ fontSize: '24px', fontWeight: 'bold' }}>{vendors.length}</p></div>
            <div className="card" style={{ background: '#10b981', color: 'white' }}><h3>Total Quotations</h3><p style={{ fontSize: '24px', fontWeight: 'bold' }}>{quotations.length}</p></div>
            <div className="card" style={{ background: '#f59e0b', color: 'white' }}><h3>Pending Quotes</h3><p style={{ fontSize: '24px', fontWeight: 'bold' }}>{quotations.filter(q => q.status === 'Pending').length}</p></div>
          </div>
          <div className="card">
            <h3>📊 Live Quotation Comparison</h3>
            <table>
              <thead>
                <tr style={{ background: '#f3f4f6' }}><th>Title</th><th>Vendor</th><th>Amount</th><th>Status</th><th>Actions</th></tr>
              </thead>
              <tbody>
                {quotations.map(q => (
                  <tr key={q.id} className={lowestQuotation && lowestQuotation.id === q.id ? 'best-deal' : ''}>
                    <td>{q.title} {lowestQuotation && lowestQuotation.id === q.id && '⭐ (Best Price)'}</td>
                    <td>{getVendorName(q.vendorId)}</td><td>Rs. {q.amount}</td><td>{q.status}</td>
                    <td>
                      <button className="btn btn-primary" style={{ padding: '4px 8px', marginRight: '5px' }} onClick={() => handleStatusChange(q.id, 'Approved')}>Approve</button>
                      <button className="btn btn-danger" style={{ padding: '4px 8px' }} onClick={() => handleStatusChange(q.id, 'Rejected')}>Reject</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'vendors' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '20px' }}>
          <div className="card">
            <h3>{vendorForm.id ? '✏️ Edit Vendor' : '➕ Add Vendor'}</h3>
            <form onSubmit={handleVendorSubmit}>
              <div className="form-group"><label>Vendor Name</label><input type="text" className="form-control" required value={vendorForm.vendorName} onChange={e => setVendorForm({ ...vendorForm, vendorName: e.target.value })} /></div>
              <div className="form-group"><label>Company Name</label><input type="text" className="form-control" value={vendorForm.companyName} onChange={e => setVendorForm({ ...vendorForm, companyName: e.target.value })} /></div>
              <div className="form-group"><label>Email</label><input type="email" className="form-control" required value={vendorForm.email} onChange={e => setVendorForm({ ...vendorForm, email: e.target.value })} /></div>
              <button type="submit" className="btn btn-primary">Save</button>
            </form>
          </div>
          <div className="card">
            <h3>👥 Registered Vendors</h3>
            <table>
              <thead><tr><th>Name</th><th>Company</th><th>Email</th><th>Actions</th></tr></thead>
              <tbody>
                {vendors.map(v => (
                  <tr key={v.id}>
                    <td>{v.vendorName}</td><td>{v.companyName}</td><td>{v.email}</td>
                    <td>
                      <button className="btn btn-primary" style={{ padding: '4px 8px', marginRight: '5px' }} onClick={() => setVendorForm(v)}>Edit</button>
                      <button className="btn btn-danger" style={{ padding: '4px 8px' }} onClick={() => handleDeleteVendor(v.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'quotations' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '20px' }}>
          <div className="card">
            <h3>📩 Request Quotation</h3>
            <form onSubmit={handleQuoteSubmit}>
              <div className="form-group"><label>Title</label><input type="text" className="form-control" required value={quoteForm.title} onChange={e => setQuoteForm({ ...quoteForm, title: e.target.value })} /></div>
              <div className="form-group">
                <label>Select Vendor</label>
                <select className="form-control" required value={quoteForm.vendorId} onChange={e => setQuoteForm({ ...quoteForm, vendorId: e.target.value })}>
                  <option value="">-- Choose --</option>
                  {vendors.map(v => <option key={v.id} value={v.id}>{v.vendorName}</option>)}
                </select>
              </div>
              <div className="form-group"><label>Amount (PKR)</label><input type="number" className="form-control" required value={quoteForm.amount} onChange={e => setQuoteForm({ ...quoteForm, amount: e.target.value })} /></div>
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
          </div>
          <div className="card">
            <h3>📜 Quotation Logs</h3>
            <table>
              <thead><tr><th>Title</th><th>Vendor</th><th>Amount</th><th>Status</th></tr></thead>
              <tbody>
                {quotations.map(q => <tr key={q.id}><td>{q.title}</td><td>{getVendorName(q.vendorId)}</td><td>Rs. {q.amount}</td><td>{q.status}</td></tr>)}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}