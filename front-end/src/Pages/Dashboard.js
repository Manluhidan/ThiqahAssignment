import React, {useEffect, useState} from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LoginImg from "../logo.png"

function DashboardPage() {

    var navigate = useNavigate();

    Axios.defaults.withCredentials = true;

    function Logout(){
        Axios.get("http://localhost:3001/api/logout").then((response) => {

            console.log("Logged out")
            navigate("/");
        })
    }
    const [FirstName, setFirstName] = useState("");
    const [LastName, setLastName] = useState("");
    const [Photo, setPhoto] = useState("");
    const [LevelOfStudy, setLevelOfStudy] = useState('');
    const [Program, setProgram] = useState('');
    const [Division, setDivision] = useState('');
    const [Path, setPath] = useState('');

    Axios.defaults.withCredentials = true;

    const Dashboard = () => {
    console.log(FirstName + "  " + LastName + "  " + Photo + " " + LevelOfStudy + " " + Program + " " + Division)
    Axios.get("http://localhost:3001/api/dashboard", {

        }).then((response) => {

        setFirstName(response.data.First_Name)
        setLastName(response.data.Last_Name)
        setPhoto(response.data.Photo)
        setLevelOfStudy(response.data.LOS)
        setProgram(response.data.Program)
        setDivision(response.data.Division)

        console.log(FirstName + "  " + LastName + "  " + Photo + " " + LevelOfStudy + " " + Program + " " + Division)
        })
    };

    useEffect(() => {
        Axios.get("http://localhost:3001/api/login_status").then((response) => {
            console.log(response.data)
            if (response.data){
                Dashboard();

                Axios.get("http://localhost:3001/api/getImage").then((response) => {
                    setPath(response.data.PhotoName.Photo);
                    console.log(response.data.PhotoName.Photo);
                })

            }else {
                console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaa")
                navigate("/login")
            }
        })
      }, [])


      return (
        <div className="Dashboard">
    
            <div className='DashboardContainer'>
    
                <div className='rightSideDashboard'>
    
                    <div className='Dashboard-form'>
    
                        <img className='Dashboard-imgContent' src={LoginImg} alt="Login-img" />
                        <h1 className='DashboardTitle'>Student Dashboard</h1>
                            <div className='Dashboard-box'>
                                <div>
                                    <img src={`http://localhost:3001/` + Path} style={{width: 120, height: 150, borderRadius: 100/ 2}} ></img>
                                </div>

                                <div>
                                    <label>Name: {FirstName + " " + LastName}</label>
                                </div>

                                <div>
                                    <label>Level of Study: {LevelOfStudy}</label>
                                </div>

                                <div>
                                    <label>Program: {Program}</label>
                                </div>

                                <div>
                                    <label>Faculty/Division: {Division}</label>
                                </div>
                            </div>
                            <button onClick={Logout} type='button' >Logout</button>
                    </div>
    
                </div>
    
            </div>
    
        </div>
      );
}

export default DashboardPage;