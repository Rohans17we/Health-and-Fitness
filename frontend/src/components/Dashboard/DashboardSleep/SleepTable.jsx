import React from 'react';

const SleepTable = ({ logs }) => {
  if (!logs.length) return <div className="no-sleep-logs">No sleep records yet.</div>;

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="sleep-table-container">
      <h2>Sleep History</h2>
      <table className="sleep-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Sleep Start</th>
            <th>Sleep End</th>
            <th>Hours Slept</th>
          </tr>
        </thead>
        <tbody>
          {logs.map(log => {
            const date = new Date(log.date);
            return (
              <tr key={log.id}>
                <td>{date.toLocaleDateString()}</td>
                <td>{formatTime(log.sleepStart)}</td>
                <td>{formatTime(log.sleepEnd)}</td>
                <td>{log.hoursSlept.toFixed(1)} hrs</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default SleepTable;
