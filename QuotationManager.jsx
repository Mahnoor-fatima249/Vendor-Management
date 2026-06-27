import React from 'react';

export default function QuotationManager({ vendors, quotations, quoteForm, setQuoteForm, handleQuoteSubmit }) {
  const getVendorName = (id) => vendors.find(v => v.id === id)?.vendorName || 'Unknown';

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '20px' }}>
      <div className="card">
        <h3>📩 Request a Quotation</h3>
        <form onSubmit={handleQuoteSubmit}>
          <div className="form-group">
            <label>Quotation Title</label>
            <input type="text" className="form-control" required value={quoteForm.title} onChange={e => setQuoteForm({ ...quoteForm, title: e.target.value })} />
          </div>
          <div className="form-group">
            <label>Select Vendor</label>
            <select className="form-control" required value={quoteForm.vendorId} onChange={e => setQuoteForm({ ...quoteForm, vendorId: e.target.value })}>
              <option value="">-- Choose Vendor --</option>
              {vendors.map(v => <option key={v.id} value={v.id}>{v.vendorName}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label>Amount (PKR)</label>
            <input type="number" className="form-control" required value={quoteForm.amount} onChange={e => setQuoteForm({ ...quoteForm, amount: e.target.value })} />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>

      <div className="card">
        <h3>📜 All Quotation Logs</h3>
        <table>
          <thead><tr><th>Requirements Title</th><th>Vendor</th><th>Amount</th><th>Status</th></tr></thead>
          <tbody>
            {quotations.map(q => (
              <tr key={q.id}>
                <td>{q.title}</td><td>{getVendorName(q.vendorId)}</td><td>Rs. {q.amount}</td><td>{q.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}