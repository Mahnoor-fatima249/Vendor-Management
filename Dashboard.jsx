import React from 'react';

export default function Dashboard({ vendors, quotations, handleStatusChange }) {
  const lowestQuotation = quotations.length > 0 
    ? quotations.reduce((min, q) => parseFloat(q.amount) < parseFloat(min.amount) ? q : min, quotations[0])
    : null;

  const getVendorName = (id) => vendors.find(v => v.id === id)?.vendorName || 'Unknown';

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '30px' }}>
        <div className="card" style={{ background: '#3b82f6', color: 'white' }}>
          <h3>Total Vendors</h3>
          <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{vendors.length}</p>
        </div>
        <div className="card" style={{ background: '#10b981', color: 'white' }}>
          <h3>Total Quotations</h3>
          <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{quotations.length}</p>
        </div>
        <div className="card" style={{ background: '#f59e0b', color: 'white' }}>
          <h3>Pending Quotes</h3>
          <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{quotations.filter(q => q.status === 'Pending').length}</p>
        </div>
      </div>

      <div className="card">
        <h3>📊 Live Quotation Comparison (Evaluation Sheet)</h3>
        <table>
          <thead>
            <tr style={{ background: '#f3f4f6' }}>
              <th>Quotation Title</th>
              <th>Vendor Name</th>
              <th>Amount (PKR)</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {quotations.map(q => (
              <tr key={q.id} className={lowestQuotation && lowestQuotation.id === q.id ? 'best-deal' : ''}>
                <td>{q.title} {lowestQuotation && lowestQuotation.id === q.id && '⭐ (Best Price Deal)'}</td>
                <td>{getVendorName(q.vendorId)}</td>
                <td>Rs. {q.amount}</td>
                <td><span className="status-badge">{q.status}</span></td>
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
  );
}