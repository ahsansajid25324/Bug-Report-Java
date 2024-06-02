import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BugService from '../services/BugService';

const ViewBugComponent = () => {
  const { id } = useParams();
  const [bug, setBug] = useState({});

  useEffect(() => {
    BugService.getBugById(id).then(res => {
      setBug(res.data);
    });
  }, [id]);

  return (
    <div style={{ marginTop: '20px' }}>
      <div className='card col-md-6 offset-md-3' style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <h3 className='card-header text-center' style={{ backgroundColor: '#007bff', color: '#fff', borderRadius: '0 0 0 0', padding: '10px 0' }}>View Bug Details</h3>
        <div className='card-body'>
          <div className='row'>
            <div className='col-12 mb-3'>
              <label><strong>Bug Reporter:</strong></label>
              <div>{bug.bugReporter}</div>
            </div>
            <div className='col-12 mb-3'>
              <label><strong>Bug Type:</strong></label>
              <div>{bug.bugType}</div>
            </div>
            <div className='col-12 mb-3'>
              <label><strong>Reason:</strong></label>
              <div>{bug.reason}</div>
            </div>
            <div className='col-12 mb-3'>
              <label><strong>Site Link:</strong></label>
              <div>{bug.siteLink}</div>
            </div>
            <div className='col-12 mb-3'>
              <label><strong>Site Name:</strong></label>
              <div>{bug.siteName}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewBugComponent;
