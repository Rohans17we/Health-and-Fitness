import React from 'react';

const SleepTableFilters = ({ filters, onChange }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange({ ...filters, [name]: value });
  };

  const resetFilters = () => {
    onChange({
      dateFrom: '',
      dateTo: '',
      hoursMin: '',
      hoursMax: '',
    });
  };
  return (
    <div className="filters-container">
      <h3>Filter Sleep Records</h3>
    <div className="filters-row">
        <div className="filter-group">
          <label>From Date</label>
          <div className="date-input-container">
            <input
              type="date"
              name="dateFrom"
              value={filters.dateFrom}
              onChange={handleChange}
              className="date-input"
            />
          </div>
        </div>
        <div className="filter-group">
          <label>To Date</label>
          <div className="date-input-container">
            <input
              type="date"
              name="dateTo"
              value={filters.dateTo}
              onChange={handleChange}
              className="date-input"
            />
          </div>
        </div>
      </div>
      
    <div className="filters-row">
        <div className="filter-group">
          <label>Min Hours</label>
          <input
            type="number"
            name="hoursMin"
            min="0"
            max="24"
            step="0.5"
            value={filters.hoursMin}
            onChange={handleChange}
            placeholder="e.g. 6"
            className="number-input"
          />
        </div>
        <div className="filter-group">
          <label>Max Hours</label>
          <input
            type="number"
            name="hoursMax"
            min="0"
            max="24"
            step="0.5"
            value={filters.hoursMax}
            onChange={handleChange}
            placeholder="e.g. 10"
            className="number-input"
          />
        </div>
      </div>
      
      <div className="filters-actions">
        <button className="reset-filters-btn" onClick={resetFilters}>Reset Filters</button>
      </div>
    </div>
  );
};

export default SleepTableFilters;
