import React from 'react';

const WaterTable = ({ logs }) => {
  if (!logs.length) return <div className="no-water-logs">No water intake records yet.</div>;

  return (
    <div className="water-table-container">
      <h2>Water Intake History</h2>
      <table className="water-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Time</th>
            <th>Amount (ml)</th>
            <th>Note</th>
          </tr>
        </thead>
        <tbody>
          {logs.map(log => {
            const dt = new Date(log.intakeTime);
            return (
              <tr key={log.id}>
                <td>{dt.toLocaleDateString()}</td>
                <td>{dt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                <td>{log.amount}</td>
                <td>{log.note || '–'}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default WaterTable;
