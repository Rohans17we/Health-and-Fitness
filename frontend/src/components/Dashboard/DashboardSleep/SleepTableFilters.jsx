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
      quality: '',
    });
  };

  return (
    <div className="filters-container">
      <h3>Filter Sleep Records</h3>
      <div className="filters-row">
        <div className="filter-group">
          <label>From Date</label>
          <input
            type="date"
            name="dateFrom"
            value={filters.dateFrom}
            onChange={handleChange}
          />
        </div>
        <div className="filter-group">
          <label>To Date</label>
          <input
            type="date"
            name="dateTo"
            value={filters.dateTo}
            onChange={handleChange}
          />
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
            value={filters.hoursMin}
            onChange={handleChange}
            placeholder="e.g. 6"
          />
        </div>
        <div className="filter-group">
          <label>Max Hours</label>
          <input
            type="number"
            name="hoursMax"
            min="0"
            max="24"
            value={filters.hoursMax}
            onChange={handleChange}
            placeholder="e.g. 10"
          />
        </div>
        <div className="filter-group">
          <label>Sleep Quality</label>
          <select name="quality" value={filters.quality} onChange={handleChange}>
            <option value="">All</option>
            <option value="Poor">Poor</option>
            <option value="Average">Average</option>
            <option value="Good">Good</option>
          </select>
        </div>
      </div>
      
      <div className="filters-actions">
        <button className="reset-filters-btn" onClick={resetFilters}>Reset Filters</button>
      </div>
    </div>
  );
};

export default SleepTableFilters;
