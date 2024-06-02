import PropTypes from 'prop-types';
import React, { Component } from 'react';
import BugService from '../services/BugService';
import { Link } from 'react-router-dom';

export default class ListBugComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bugs: []
    };
    this.deleteBug = this.deleteBug.bind(this);
  }

  deleteBug(id) {
    BugService.deleteBug(id).then((res) => {
      this.setState({ bugs: this.state.bugs.filter((bug) => bug.id !== id) });
    });
  }

  componentDidMount() {
    BugService.getBugs().then((res) => {
      this.setState({ bugs: res.data });
    });
  }

  getStatistics() {
    const { bugs } = this.state;
    const numReporters = new Set(bugs.map(bug => bug.bugReporter)).size;
    const numBugs = bugs.length;

    const bugTypeCount = bugs.reduce((acc, bug) => {
      acc[bug.bugType] = (acc[bug.bugType] || 0) + 1;
      return acc;
    }, {});

    const mostCommonBugType = Object.keys(bugTypeCount).reduce((a, b) => bugTypeCount[a] > bugTypeCount[b] ? a : b, '');

    return {
      numReporters,
      numBugs,
      mostCommonBugType
    };
  }

  render() {
    const { numReporters, numBugs, mostCommonBugType } = this.getStatistics();

    return (
      <div style={{ margin: '100px auto', maxWidth: '900px', minHeight: '100vh' }} className="bug-list-container">
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }} className="bug-list-heading">Recorded Bugs</h2>

        <div className="statistics-cards" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div className="card" style={{ padding: '20px', backgroundColor: '#5A67D8', color: 'white', borderRadius: '8px', flex: '1', marginRight: '10px', textAlign: 'center' }}>
            <h3>No. of Reporters</h3>
            <p>{numReporters}</p>
          </div>
          <div className="card" style={{ padding: '20px', backgroundColor: '#68D391', color: 'white', borderRadius: '8px', flex: '1', marginRight: '10px', textAlign: 'center' }}>
            <h3>Bugs Count</h3>
            <p>{numBugs}</p>
          </div>
          <div className="card" style={{ padding: '20px', backgroundColor: '#63B3ED', color: 'white', borderRadius: '8px', flex: '1', textAlign: 'center' }}>
            <h3>Most Common Bug</h3>
            <p>{mostCommonBugType}</p>
          </div>
        </div>

        <div style={{ marginBottom: '20px' }} className="add-bug-link">
          <Link to="/addBug" className="btn btn-primary">
            Add Bug
          </Link>
        </div>

        <div style={{ overflowX: 'auto' }} className="bug-table-container">
          <table style={{ width: '100%' }} className="bug-table table table-striped table-bordered">
            <thead>
              <tr>
                <th>Bug Reporter</th>
                <th>Bug Type</th>
                <th>Reason</th>
                <th>Site Name</th>
                <th>Site Link</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {this.state.bugs.map((bug) => (
                <tr key={bug.id}>
                  <td>{bug.bugReporter}</td>
                  <td>{bug.bugType}</td>
                  <td>{bug.reason}</td>
                  <td>{bug.siteName}</td>
                  <td>{bug.siteLink}</td>
                  <td style={{ display: 'flex' }}>
                    <Link to={`/updateBug/${bug.id}`} className="btn btn-info" style={{ marginRight: '5px' }}>
                      Update
                    </Link>
                    <button
                      onClick={() => this.deleteBug(bug.id)}
                      className="btn btn-danger"
                      style={{ marginRight: '5px' }}
                    >
                      Delete
                    </button>
                    <Link
                      to={`/viewBug/${bug.id}`}
                      className="btn btn-info"
                      style={{ marginRight: '5px' }}
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
