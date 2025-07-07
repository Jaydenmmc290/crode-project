import React, { useEffect, useState } from 'react';
import api from './api';
import './OpportunitiesBoard.css';

function OpportunitiesBoard() {
  const [opps, setOpps] = useState([]);

  useEffect(() => {
    const fetchOpps = async () => {
      try {
        const res = await api.get('/opportunities/');
        setOpps(res.data);
      } catch (err) {
        console.error('Error loading opportunities', err);
      }
    };
    fetchOpps();
  }, []);

  return (
    <div className="board-container">
      <h2>Opportunities Board</h2>
      <div className="opps-grid">
        {opps.map((op, idx) => (
          <div key={idx} className="opp-card">
            <h3>{op.title}</h3>
            <p>{op.description}</p>
            <p className="posted-by">Posted by: {op.posted_by}</p>
            <span className="date">{new Date(op.date_posted).toLocaleDateString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OpportunitiesBoard;
