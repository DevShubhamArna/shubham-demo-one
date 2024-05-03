import React, { useEffect,useState } from 'react';
import axios from 'axios';
import light from '../assets/bannerImg.jpg'
import dark from '../assets/DarkTheme.jpg'
function Theme() {
    const [theme, settheme] = useState("");
    const [color, setcolor] = useState("");
    useEffect(() => {
        const tenantId = 2;  // please change Id to Change theme. I added  2 themes Light theme id =1, Dark theme id = 2 and themes will be change with following api call. 
        const fetchData = () => {
            axios.get(`https://localhost:7082/api/tenants/${tenantId}`)
                .then(response => {
                    console.log('Data received:', response.data);
                    settheme(response?.data?.themeName)
                    setcolor(response?.data?.color)
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        };

        fetchData();
        return () => {
        };
    }, []);
    return (
        <div style={{ width: '100%', position: 'fixed', top: '10px', right:"0px", }}>
            <nav className={`navbar navbar-expand-lg navbar-light bg-${theme}`}>
                <div className="container-fluid white-text">
                    <a className="navbar-brand" href="#" style={{ color: color }} >Navbar</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="#" style={{ color: color }}>Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#" style={{ color: color }}>Link</a>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-expanded="false" style={{ color: color }}>
                                    Dropdown
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><a className="dropdown-item" href="#">Action</a></li>
                                    <li><a className="dropdown-item" href="#">Another action</a></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><a className="dropdown-item" href="#">Something else here</a></li>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link disabled" href="#" tabIndex="-1" aria-disabled="true" style={{ color: color }}>Disabled</a>
                            </li>
                        </ul>
                        <form className="d-flex">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success" type="submit" >Search</button>
                        </form>
                    </div>
                </div>
            </nav>
            <img src={color === "black" ? light : dark } width="100%" alt="home" />
        </div>
    );
}

export default Theme;