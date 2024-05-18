import React, { useEffect, useState, useRef } from 'react';
import Login from "./Login";
import { useNavigate } from "react-router-dom";
import Sidebar from "./sidebar";
import Chart from 'chart.js/auto';
import BASE_URL from './config';

const Dashboard = () => {
    const auth = localStorage.getItem("adminLogin");
    const navigator = useNavigate();
    const [selectedOption, setSelectedOption] = useState(localStorage.getItem("selectedOption") || 'Inquiries');
    const [data, setData] = useState([]);
    const [totalInquiries, setTotalInquiries] = useState(0);

    const chartRef = useRef(null);

    useEffect(() => {
        fetchSelectedData();
    }, [selectedOption]);

    useEffect(() => {
        // Store selected option in localStorage
        localStorage.setItem("selectedOption", selectedOption);
    }, [selectedOption]);

    const fetchSelectedData = () => {
        let apiUrl = '';
        switch (selectedOption) {
            case 'Inquiries':
                apiUrl = `${BASE_URL}/showInquiries`;
                break;
            case 'Get in touch':
                apiUrl = `${BASE_URL}/showGetintouchs`;
                break;
            case 'Join our team':
                apiUrl = `${BASE_URL}/showTeam`;
                break;
            case 'Channel partner':
                apiUrl = `${BASE_URL}/showCpartners`;
                break;
            case 'Contact Us':
                apiUrl = `${BASE_URL}/showContacts`;
                break;
            default:
                break;
        }

        if (apiUrl) {
            fetch(apiUrl)
                .then(response => response.json())
                .then(data => {
                    setData(data);
                    calculateTotalInquiries(data);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        }
    };

    const calculateTotalInquiries = (data) => {
        let total = 0;
        data.forEach(item => {
            total++;
        });
        setTotalInquiries(total);
    };

    const logout = () => {
        localStorage.removeItem("adminLogin");
        navigator("/");
    }

    useEffect(() => {
        // Draw chart when data changes
        if (data.length > 0) {
            const ctx = document.getElementById('inquiryChart').getContext('2d');

            // Destroy previous chart instance if exists
            if (chartRef.current !== null) {
                chartRef.current.destroy();
            }

            // Calculate counts for each status
            const statusCounts = {};
            data.forEach(item => {
                statusCounts[item.status] = (statusCounts[item.status] || 0) + 1;
            });

            // Create new chart instance
            chartRef.current = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: Object.keys(statusCounts),
                    datasets: [{
                        label: `${selectedOption} Status`,
                        data: Object.values(statusCounts),
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    },
                    responsive: true,
                    maintainAspectRatio: false
                }
            });
        }
    }, [data]);

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    return (
        <>
            {auth ? (
                <>
                    <Sidebar />
                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        <div className='dashboard-title'>
                            <h1>Dashboard</h1>
                        </div>
                        <div className="row mt-3">
                            <div className="col">
                                {/* <h4>{selectedOption}: {totalInquiries}</h4> */}
                                <h4>Total records: {totalInquiries}</h4>
                            </div>
                        </div>

                        <div className="row mt-3">
                            <div className="col-md-6">
                                <select className="form-select form-select-lg mb-3 w-100" value={selectedOption} onChange={handleOptionChange}>
                                    <option value="Inquiries">Inquiries</option>
                                    <option value="Get in touch">Get in touch</option>
                                    <option value="Join our team">Join our team</option>
                                    <option value="Channel partner">Channel partner</option>
                                    <option value="Contact Us">Contact Us</option>
                                </select>
                            </div>
                        </div>

                        <div className="row mt-3">
                            <div className="col">
                                <div className="chart-container">
                                    <canvas className='chart-canvas' id="inquiryChart"></canvas>
                                </div>
                            </div>
                        </div>
                    </main>
                </>
            ) : (
                <Login />
            )}
        </>
    );
}

export default Dashboard;











