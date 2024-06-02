import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BugService from '../services/BugService';

const UpdateBugComponent = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [bugReporter, setBugReporter] = useState('');
    const [bugType, setBugType] = useState('');
    const [reason, setReason] = useState('');
    const [siteLink, setSiteLink] = useState('');
    const [siteName, setSiteName] = useState('');

    useEffect(() => {
        BugService.getBugById(id).then((res) => {
            let bug = res.data;
            setBugReporter(bug.bugReporter);
            setBugType(bug.bugType);
            setReason(bug.reason);
            setSiteLink(bug.siteLink);
            setSiteName(bug.siteName);
        });
    }, [id]);

    const updateBug = (e) => {
        e.preventDefault();
        console.log('Updating bug...');
        
        let bug = {
            bugReporter,
            bugType,
            reason,
            siteLink,
            siteName
        };
        console.log('Bug data:', bug);
        
        BugService.updateBug(bug, id).then((res) => {
            console.log('Update response:', res.data);
            navigate('/recordBug');
        }).catch((error) => {
            console.error('Update error:', error);
            // Handle error here
        });
    }
    

    return (
        <div>
            <div className='container'>
                <div className='row'>
                    <form style={{ margin: '20px auto', maxWidth: '400px' }}>
                        <div className='form-group'>
                            <label>Bug Reporter</label>
                            <input
                                placeholder='Bug Reporter'
                                name='bugReporter'
                                className='form-control'
                                value={bugReporter}
                                onChange={(e) => setBugReporter(e.target.value)}
                            />
                        </div>

                        <div className="form-group my-1">
                            <label>Bug Type</label>
                            <input
                                placeholder='Bug Type'
                                name='bugType'
                                className='form-control'
                                value={bugType}
                                onChange={(e) => setBugType(e.target.value)}
                            />
                        </div>

                        <div className="form-group my-1">
                            <label>Reason</label>
                            <input
                                placeholder='Reason'
                                name='reason'
                                className='form-control'
                                value={reason}
                                onChange={(e) => setReason(e.target.value)}
                            />
                        </div>

                        <div className="form-group my-1">
                            <label>Site Link</label>
                            <input
                                placeholder='Site Link'
                                name='siteLink'
                                className='form-control'
                                value={siteLink}
                                onChange={(e) => setSiteLink(e.target.value)}
                            />
                        </div>

                        <div className="form-group my-1">
                            <label>Site Name</label>
                            <input
                                placeholder='Site Name'
                                name='siteName'
                                className='form-control'
                                value={siteName}
                                onChange={(e) => setSiteName(e.target.value)}
                            />
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <button className='btn btn-success' onClick={updateBug}>Update</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default UpdateBugComponent;
