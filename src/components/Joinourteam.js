import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./sidebar";
import Login from "./Login";
import DataTable from 'react-data-table-component';
import { BsSearch } from 'react-icons/bs';
import "jquery-ui-dist/jquery-ui"
import { pdfjs } from 'react-pdf';
import { message, Popconfirm } from 'antd'
import BASE_URL from "./config";


pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.js',
    import.meta.url,
).toString();


const Joinourteam = () => {
    const auth = localStorage.getItem("adminLogin")
    const navigator = useNavigate();
    const [showTeams, setShowTeams] = useState([]);
    const [filterText, setFilterText] = useState('');
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [pdfFile, setPdfFile] = useState(null);



    useEffect(() => {
        showTeam();
    }, [navigator]);


    const showTeam = async () => {
        const datas = await fetch(`${BASE_URL}/showTeam`);
        const results = await datas.json();
        if (results) {
            setShowTeams(results);
            console.log(results);
        }
    };

    const handleChangeStatus = async (newValue, id) => {
        const result = await fetch(`${BASE_URL}/teamStatus/${id}`, {
            method: "Put",
            body: JSON.stringify({ "status": newValue }),
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await result.json();
        if (data) {
            message.success('The status has been updated')
            setShowTeams(prevState =>
                prevState.map(row =>
                    row._id === id ? { ...row, status: newValue } : row
                )
            );
        }
    };


    // Delet data functions
    const deleteData = async (_id) => {
        const datas = await fetch(`${BASE_URL}/deleteTeam/${_id}`, {
            method: "delete"
        });
        const results = await datas.json();
        if (results) {
            showTeam();
        }
    };

    const handleDeleteConfirmation = async (id) => {
        try {
            await deleteData(id);
            message.success('Inquiry deleted successfully');
        } catch (error) {
            message.error('Failed to delete inquiry');
        }
    };


    //Full message popup
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
    const filteredData = showTeams.filter(item =>
        item.name.toLowerCase().includes(filterText.toLowerCase()) ||
        item.email.toLowerCase().includes(filterText.toLowerCase()) ||
        item.phone.toLowerCase().includes(filterText.toLowerCase()) ||
        item.select.toLowerCase().includes(filterText.toLowerCase()) ||
        item.status.toLowerCase().includes(filterText.toLowerCase()) ||
        item.comment.toLowerCase().includes(filterText.toLowerCase())
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
    const downloadCSV = (array) => {
        const csv = convertArrayOfObjectsToCSV(array);
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', 'joinourteam.csv');
        link.click();
        message.success('CSV file downloaded successfully');
    };
    const exportCSV = () => {
        downloadCSV(filteredData);
    };


    // Display resume pdf
    const showPdf = (pdf) => {
        window.open(`http://localhost:4500/files/${pdf}`, "_blank", "noreferrer");
    };

    const columns = [
        {
            name: 'Name',
            selector: row => row.name,
            sortable: true
        },

        {
            name: 'Email',
            cell: row => (
                <a
                    href={`mailto:${row.email}`}
                    className="btn btn-link"
                    style={{ fontSize: '13px', textDecoration: 'none', color: 'black' }}
                >
                    {row.email.length > 32 ? row.email.substring(0, 32) + '...' : row.email}
                </a>
            ),
            sortable: true
        },

        {
            name: 'Phone',
            selector: row => row.phone,
            sortable: true
        },

        {
            name: 'Applay For',
            selector: row => row.select,
            sortable: true
        },

        {
            name: 'Resume',
            cell: row => (
                <button
                    type="button"
                    className="btn btn-outline-dark btn-sm"
                    onClick={() => showPdf(row.image)}
                >
                    View PDF
                </button>
            ),
            sortable: false
        },

        {
            name: 'Comment',
            cell: row => {
                const truncatedMessage = row.comment.length > 50 ? `${row.comment.slice(0, 50)}...` : row.comment;
                return (
                    <span style={{ cursor: 'pointer' }} onClick={() => handleViewFullMessage(row.comment)} data-toggle="modal" data-target=".bd-example-modal-lg">
                        {truncatedMessage}
                    </span>
                );
            },
            sortable: true
        },

        {
            name: 'Status',
            cell: row => {
                const options = ["Pending Review", "Shortlisted", "Non-shortlisted", "On Hold"].filter(option => option !== row.status);
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
                                <h1 className="h2">Join Our Team</h1>
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
                                            <h5 className="modal-title">Full Comment</h5>
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
    )
}
export default Joinourteam;




