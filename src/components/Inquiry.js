import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Login from "./Login";
import DataTable from 'react-data-table-component';
import { BsSearch } from 'react-icons/bs';
import "jquery-ui-dist/jquery-ui"
import Sidebar from "./sidebar";
import { message, Popconfirm } from 'antd'
import BASE_URL from "./config";


const Inquiry = () => {
    const auth = localStorage.getItem("adminLogin");
    const navigator = useNavigate();
    const [showInquiries, setShowInquiries] = useState([]);
    const [filterText, setFilterText] = useState('');
    const [selectedMessage, setSelectedMessage] = useState(null);

    useEffect(() => {
        showInquiry();
    }, [navigator]);

    const showInquiry = async () => {
        const datas = await fetch(`${BASE_URL}/showInquiries`);
        const results = await datas.json();
        if (results) {
            setShowInquiries(results);
            console.log(results);
        }
    };

    const handleChangeStatus = async (newValue, id) => {
        const result = await fetch(`${BASE_URL}/changeStatus/${id}`, {
            method: "Put",
            body: JSON.stringify({ "status": newValue }),
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await result.json();
        if (data) {
            // alert("The status has been updated");
            message.success('The status has been updated')
            setShowInquiries(prevState =>
                prevState.map(row =>
                    row._id === id ? { ...row, status: newValue } : row
                )
            );
        }
    };

    // Delet data functions
    const deleteData = async (_id) => {
        const datas = await fetch(`${BASE_URL}/deleteInquiries/${_id}`, {
            method: "delete"
        });
        const results = await datas.json();
        if (results) {
            showInquiry();
        }
    };

    // Full Message show popup
    const handleViewFullMessage = (message) => {
        setSelectedMessage(message);
    };
    const handleCloseModal = () => {
        setSelectedMessage(null);
    };

    // Filter data function
    const handleFilter = (e) => {
        setFilterText(e.target.value);
    };
    const filteredData = showInquiries.filter(item =>
        item.name.toLowerCase().includes(filterText.toLowerCase()) ||
        item.email.toLowerCase().includes(filterText.toLowerCase()) ||
        item.phone.toLowerCase().includes(filterText.toLowerCase()) ||
        item.interest.toLowerCase().includes(filterText.toLowerCase()) ||
        item.status.toLowerCase().includes(filterText.toLowerCase())
    );

    // CSV file function
    const convertArrayOfObjectsToCSV = (array) => {
        let result = '';
        const keys = Object.keys(array[0]);

        result += keys.join(',') + '\n';

        array.forEach(item => {
            let ctr = 0;
            keys.forEach(key => {
                if (ctr > 0) result += ',';
                result += item[key];
                ctr++;
            });
            result += '\n';
        });

        return result;
    };
    // CSV file function
    const downloadCSV = (array) => {
        const csv = convertArrayOfObjectsToCSV(array);
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', 'inquiries.csv');
        link.click();
        message.success('CSV file downloaded successfully');
    };

    const exportCSV = () => {
        downloadCSV(filteredData);
    };

    const handleDeleteConfirmation = async (id) => {
        try {
            await deleteData(id);
            message.success('Inquiry deleted successfully');
        } catch (error) {
            message.error('Failed to delete inquiry');
        }
    };

    const columns = [
        {
            name: 'Name',
            selector: row => row.name,
            sortable: true
        },
        {
            name: 'Email',
            selector: row => row.email,
            sortable: true
        },
        {
            name: 'Phone',
            selector: row => row.phone,
            sortable: true
        },
        {
            name: 'Interest of user',
            cell: row => {
                const truncatedMessage = row.interest.length > 50 ? `${row.interest.slice(0, 50)}...` : row.interest;
                return (
                    <span style={{ cursor: 'pointer' }} onClick={() => handleViewFullMessage(row.interest)} data-toggle="modal" data-target=".bd-example-modal-lg">
                        {truncatedMessage}
                    </span>
                );
            },
            sortable: true
        },
        {
            name: 'Status',
            cell: row => {
                const options = ["initiated", "hold", "no-answer", "completed", "received"].filter(option => option !== row.status);
                return (
                    <select
                        value={row.status}
                        onChange={(e) => handleChangeStatus(e.target.value, row._id)}
                    >
                        <option value={row.status}>{row.status}</option>
                        {options.map(option => (
                            <option key={option} value={option}>{option}</option>
                        ))}
                    </select>
                );
            }
        },
        {
            name: 'Action',
            cell: row => (
                <Popconfirm
                    title="Are you sure you want to delete this record?"
                    onConfirm={() => handleDeleteConfirmation(row._id)}
                    okText="Yes"
                    cancelText="No"
                >
                    <button className="btn btn-outline-danger border-0">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
                        </svg>
                    </button>
                </Popconfirm>
            ),
            sortable: false
        }
    ];

    return (
        <>
            {
                auth ?
                    <>
                        <Sidebar />

                        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4" >
                            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                                <h1 className="h2">Inquiry</h1>
                                <div className="btn-toolbar mb-2 mb-md-0">
                                    <div className="btn-group me-2">
                                        <button type="button" className="btn btn-sm btn-outline-secondary">Share</button>
                                        <button type="button" onClick={exportCSV} className="btn btn-sm btn-outline-secondary">Export</button>
                                    </div>
                                    <button type="button" className="btn btn-sm btn-outline-secondary dropdown-toggle">
                                        <span data-feather="calendar"></span>
                                        This week
                                    </button>
                                </div>
                            </div>

                            <div className="border rounded overflow-auto example" style={{ maxWidth: "100%", borderRadius: "1rem" }}>

                                <div className="container-fluid">
                                    <form className="d-flex" style={{ justifyContent: "flex-end", padding: "8px" }}>
                                        <div className="position-relative">
                                            <input
                                                className="form-control me-2"
                                                style={{ width: '300px', transition: 'all 0.1s ease', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', borderRadius: '10px', paddingRight: '40px' }}
                                                value={filterText}
                                                onChange={handleFilter}
                                                type="search"
                                                placeholder="Search"
                                                aria-label="Search"
                                            />
                                            <div className="position-absolute top-0 end-0 h-100 d-flex align-items-center" style={{ paddingRight: '10px' }}>
                                                <BsSearch className="m-2" style={{ fontSize: '1.25rem', pointerEvents: 'none' }} />
                                            </div>
                                        </div>
                                    </form>
                                </div>


                                <DataTable
                                    columns={columns}
                                    data={filteredData}
                                    pagination
                                    fixedHeader
                                    fixedHeaderScrollHeight="500px"
                                    highlightOnHover
                                    pointerOnHover
                                />
                            </div>
                        </main>

                        {/* Modal for displaying full message */}
                        {selectedMessage && (
                            <div className="modal bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                                <div className="modal-dialog modal-lg">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title">Full Message</h5>
                                            <button type="button" className="btn-close" onClick={handleCloseModal}></button>
                                        </div>
                                        <div className="modal-body">
                                            {selectedMessage}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                    </> :
                    <Login />
            }
        </>
    );
};

export default Inquiry;






