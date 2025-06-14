import React from 'react';
import './WaterTableFilters.css';

const WaterTableFilters = ({ filters, onChange }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange({ ...filters, [name]: value });
  };

  return (
    <div className="water-table-filters-container">
      <div className="water-table-filters-label">Filter Water Logs</div>
      <div className="water-table-filters">
        <input type="date" name="dateFrom" value={filters.dateFrom} onChange={handleChange} />
        <input type="date" name="dateTo" value={filters.dateTo} onChange={handleChange} />
        <input type="number" name="amountMin" value={filters.amountMin} onChange={handleChange} placeholder="Min Amount (ml)" min="0" style={{width: 120}} />
        <input type="number" name="amountMax" value={filters.amountMax} onChange={handleChange} placeholder="Max Amount (ml)" min="0" style={{width: 120}} />
        <input type="text" name="note" value={filters.note} onChange={handleChange} placeholder="Note contains..." style={{width: 160}} />
      </div>
    </div>
  );
};

export default WaterTableFilters;
