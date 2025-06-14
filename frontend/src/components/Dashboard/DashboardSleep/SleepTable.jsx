import React from 'react';

const SleepTable = ({ logs }) => {
  if (!logs.length) return <div className="no-sleep-logs">No sleep records yet.</div>;

  const getQualityClass = (quality) => {
    switch(quality.toLowerCase()) {
      case 'poor': return 'poor';
      case 'average': return 'average';
      case 'good': return 'good';
      default: return '';
    }
  };

  return (
    <div className="sleep-table-container">
      <h2>Sleep History</h2>
      <table className="sleep-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Hours Slept</th>
            <th>Sleep Quality</th>
          </tr>
        </thead>
        <tbody>
          {logs.map(log => {
            const date = new Date(log.date);
            return (
              <tr key={log.id}>
                <td>{date.toLocaleDateString()}</td>
                <td>{log.hoursSlept} hrs</td>
                <td>
                  <span className={`quality-badge ${getQualityClass(log.sleepQuality)}`}>
                    {log.sleepQuality}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default SleepTable;
