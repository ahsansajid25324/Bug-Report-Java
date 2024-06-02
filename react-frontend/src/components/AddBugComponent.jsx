import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class AddBugComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            bugReporter: '',
            bugType: '',
            reason: '',
            siteLink: '',
            siteName: ''
        };
        this.changeBugReporterHandler = this.changeBugReporterHandler.bind(this);
        this.changeBugTypeHandler = this.changeBugTypeHandler.bind(this);
        this.changeReasonHandler = this.changeReasonHandler.bind(this);
        this.changeSiteNameHandler = this.changeSiteNameHandler.bind(this);
        this.changeSiteLinkHandler = this.changeSiteLinkHandler.bind(this);
        this.saveBug = this.saveBug.bind(this);
    }

    saveBug = (e) => {
        e.preventDefault();
        let bug = {
            bugReporter: this.state.bugReporter,
            bugType: this.state.bugType,
            reason: this.state.reason,
            siteLink: this.state.siteLink,
            siteName: this.state.siteName
        };
        console.log('bug =>'+ JSON.stringify(bug));
    
        // Send a POST request to your backend API to save the bug
        fetch('http://localhost:8080/api/v1/bug', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bug)
        })
        .then(response => {
            if (response.ok) {
                // Assuming the bug was successfully saved
                console.log('Bug saved successfully');
                // Clear the form fields after successful submission
                this.setState({
                    bugReporter: '',
                    bugType: '',
                    reason: '',
                    siteName: '',
                    siteLink: ''
                });
            } else {
                throw new Error('Failed to save bug');
            }
        })
        .catch(error => {
            console.error('Error occurred while saving bug:', error);
        });
    }
    

    // Update change handlers as they don't require dynamic imports

    changeBugReporterHandler=(event)=> {
        this.setState({ bugReporter: event.target.value });
    }

    changeBugTypeHandler=(event)=> {
        this.setState({ bugType: event.target.value });
    }

    changeReasonHandler=(event)=> {
        this.setState({ reason: event.target.value });
    }

    changeSiteNameHandler=(event)=> {
        this.setState({ siteName: event.target.value });
    }

    changeSiteLinkHandler=(event)=>{
        this.setState({ siteLink: event.target.value });
    }

    render() {
        return (
            <div className="container">
                <div className='row justify-content-center'>
                    <div className='col-md-6'>
                        <form id="bugForm" action="/addBug" method="post" style={{ margin: '20px auto', maxWidth: '400px' }}>
                            <div className="form-group text-center">
                                <h4>Bug Report Form</h4>
                            </div>
                            <div className='form-group'>
                                <label>Bug Reporter</label>
                                <input
                                    placeholder='Bug Reporter'
                                    name='bugReporter'
                                    className='form-control'
                                    value={this.state.bugReporter}
                                    onChange={this.changeBugReporterHandler}
                                />
                            </div>
                            <div className="form-group my-1">
                                <label>Bug Type</label>
                                <input
                                    placeholder='Bug Type'
                                    name='bugType'
                                    className='form-control'
                                    value={this.state.bugType}
                                    onChange={this.changeBugTypeHandler}
                                />
                            </div>
                            <div className="form-group my-1">
                                <label>Reason</label>
                                <input
                                    placeholder='Reason'
                                    name='reason'
                                    className='form-control'
                                    value={this.state.reason}
                                    onChange={this.changeReasonHandler}
                                />
                            </div>
                            <div className="form-group my-1">
                                <label>Site Link</label>
                                <input
                                    placeholder='Site Link'
                                    name='siteLink'
                                    className='form-control'
                                    value={this.state.siteLink}
                                    onChange={this.changeSiteLinkHandler}
                                />
                            </div>
                            <div className="form-group my-1">
                                <label>Site Name</label>
                                <input
                                    placeholder='Site Name'
                                    name='siteName'
                                    className='form-control'
                                    value={this.state.siteName}
                                    onChange={this.changeSiteNameHandler}
                                />
                            </div>
                            <div className="form-group text-center">
                                <button className="btn btn-success" onClick={this.saveBug}>Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
