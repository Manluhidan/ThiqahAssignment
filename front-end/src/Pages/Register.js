import React, {useEffect, useState} from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LoginImg from "../logo.png"

function RegisterPage() {

    const [Email, setEmail] = useState("");
    const [FirstName, setFirstName] = useState("");
    const [LastName, setLastName] = useState("");
    const [Birthdate, setBirthdate] = useState("");
    const [Photo, setPhoto] = useState(null);
    const [Password, setPassword] = useState("");
    const [ConfirmPassword, setConfirmPassword] = useState("");
    const [PhotoPath, setPhotoPath] = useState("");
    const [Page, setPage] = useState(true);
    const [LevelOfStudy, setLevelOfStudy] = useState('');
    const [Program, setProgram] = useState('');
    const [Division, setDivision] = useState('');
    const [Majors, setMajors] = useState([]);

    const [EmailError, setEmailError] = useState("");
    const [FirstNameError, setFirstNameError] = useState("");
    const [LastNameError, setLastNameError] = useState("");
    const [BirthDateError, setBirthDateError] = useState("");
    const [PhotoError, setPhotoError] = useState("");
    const [PasswordError, setPasswordError] = useState("");
    const [ConfirmPasswordError, setConfirmPasswordError] = useState("");
    const [LevelOfStudyError, setLevelOfStudyError] = useState("");
    const [ProgramError, setProgramError] = useState("");
    const [DivisionError, setDivisionError] = useState("");
  
    const handlePhoto = (event) => {
        setPhoto(event.target.files[0]);
        setPhotoPath(event.target.value);
      };


    const handleLevelOfStudy = (event) => {
      setLevelOfStudy(event.target.value);
    };

    const handleProgram = (event) => {
      setProgram(event.target.value);
    };

    const handleDivision = (event) => {
        setDivision(event.target.value);

        if(event.target.value === "Computer and Information Sciences"){
            setMajors(["Computer Science" ,"Information System" ,"Computer Engineering" ,"Software Engineering" ,"Information Technology"]);
        }

        else if(event.target.value === "Engineering"){
            setMajors(["Civil Engineering", "Electrical Engineering", "Mechanical Engineering", "Chemical Engineering", "Industrial Engineering"]);
        }

        else if(event.target.value === "Science"){
            setMajors(["Mathematics", "Actuarial And Financial Mathematics", "Chemistry", "Physics", "Geology"]);
        }

        else if(event.target.value === "Business Administration"){
            setMajors(["Accounting","Finance", "Management Information Systems","Public Administration","Health Administration"]);
        }

        else if(event.target.value === "Medicine"){
            setMajors(["Surgery", "Physiology", "Medicine", "Emergency Medicine", "Anatomy"]);
        }
        else{
            setMajors([]);
        }
        console.log(Majors)
    };

    function Change(){
        setPage(!Page);
    }

    function Login(){
        navigate("/login");
    }

    function studentsValidations(){
        const enteredDate = new Date(Birthdate);
        const currentDate = new Date();
        const EmailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        var counter = 0;

        if (Email.trim().length === 0 || Email.trim().match(/^\s+$/)) {
            setEmailError("Please enter a valid email");

        } else if(!Email.match(EmailFormat)){
            setEmailError('Please enter a valid email');

        } else {
            counter++;
            setEmailError("");
        }

        if (FirstName.trim().length === 0 || FirstName.trim().match(/^\s+$/)) {
            setFirstNameError("Please enter a valid first name");
        } else {
            counter++;
            setFirstNameError("");
        }

        if (LastName.trim().length === 0 || LastName.trim().match(/^\s+$/)) {
            setLastNameError("Please enter a valid last name");
        } else {
            counter++;
            setLastNameError("");
        }

        if (enteredDate > currentDate) {

            setBirthDateError("Birthdate cannot be in the future");

        } else if (Birthdate === "") {

            setBirthDateError("Please enter a birthdate");

        } else {
            counter++;
            setBirthDateError("");
        }

        if (Password === "") {
            setPasswordError("Please enter a password")
        } else {
            counter++;
            setPasswordError("");
        }

        if (ConfirmPassword !== Password) {
            setConfirmPasswordError("Those passwords didn’t match.")
        } else {
            counter++;
            setConfirmPasswordError("");
        }

        if (PhotoPath === "") {
            setPhotoError("Please add a picture")
        } else {
            counter++;
            setPhotoError("");
        }

        console.log(counter);
        if(counter === 7){
            Change();
        }
    }

    function graduateValidations(){
        var counter = 0;

        if (LevelOfStudy === "") {
            setLevelOfStudyError("Please choose an option")
        } else {
            counter++;
            setLevelOfStudyError("");
        }

        if (Program === "") {
            setProgramError("Please choose an option")
        } else {
            counter++;
            setProgramError("");
        }

        if (Division === "") {
            setDivisionError("Please choose an option")
        } else {
            counter++;
            setDivisionError("");
        }

        console.log(counter);
        if(counter === 3){
            alert("You have been registered successfully!")
            Register();
        }else{
            alert("Please choose an option")
        }
    }

  var navigate = useNavigate();

    const Register = () => {

    console.log(Email + "  " + FirstName + "  " + LastName + "  " + Birthdate + " " + PhotoPath + " " + Password + " " + LevelOfStudy + " " + Program + " " + Division)
        Axios.post("http://localhost:3001/api/register", {
            Email: Email,
            FirstName: FirstName,
            LastName: LastName,
            Birthdate: Birthdate,
            Photo: PhotoPath,
            Password: Password,
            LevelOfStudy: LevelOfStudy,
            Program: Program,
            Division: Division
            }).then((response) => {
                const formData = new FormData();
                formData.append('image', Photo);
                console.log(response.data)
                Axios.post("http://localhost:3001/api/upload" , formData)

                navigate("/login");
        })
    };

    useEffect(() => {
        Axios.get("http://localhost:3001/api/login_status").then((response) => {
            if (response.data) navigate("/dashboard");
        })
      }, [])


return (
    <div className="Login">

        <div className='RegisterContainer'>

            <div className='registerSide'>

                <div className='Login-form'>

                    <img className='imgContentRegister' src={LoginImg} alt="Login-img" />
                    <h1 className='registerTitle'>Register</h1>
                    {Page?

                        <div className='registerAllInputs' >
                            <div className='Login-box'>
                                <input type="text" required name='FirstName' onChange={(e) => {
                                    setFirstName(e.target.value)
                                }}/>
                                <span>First Name</span>
                                {FirstNameError && <p className="error">{FirstNameError}</p>}
                            </div>

                            <div className='Login-box'>
                                <input type="email" required name='Email' onChange={(e) => {
                                    setEmail(e.target.value)
                                }}/>
                                <span>Email</span>
                                {EmailError && <p className="error">{EmailError}</p>}
                            </div>

                            <div className='Login-box'>
                                <input type="text" required name='LastName' onChange={(e) => {
                                    setLastName(e.target.value)
                                }}/>
                                <span>Last Name</span>
                                {LastNameError && <p className="error">{LastNameError}</p>}
                            </div>

                            <div className='Login-box'>
                                <input type="date" name="Date" onChange={(e) => {
                                    setBirthdate(e.target.value);
                                }}/>
                                <span>Birthdate</span>
                                {BirthDateError && <p className="error">{BirthDateError}</p>}
                            </div>

                            <div className='Login-box'>
                                <input type="password" required name='Password' onChange={(e) => {
                                    setPassword(e.target.value)
                                    }}/>
                                    <span>Password</span>
                                    {PasswordError && <p className="error">{PasswordError}</p>}
                            </div>

                            <div className='Login-box'>
                                <input type="file" name='image' accept=".png,.jpg,.jpeg" onChange={handlePhoto}  />
                                <span>Picture</span>
                                {PhotoError && <p className="error">{PhotoError}</p>}
                            </div>

                            <div className='Login-box'>
                                <input type="password" required name='ConfirmPassword' onChange={(e) => {
                                    setConfirmPassword(e.target.value)
                                    }}/>
                                    <span>Confirm Password</span>
                                    {ConfirmPasswordError && <p className="error">{ConfirmPasswordError}</p>}
                            </div>
                            <div>
                                <button className='Register-button1' onClick={Login} type="button" >Login</button> 
                                <button className='Register-button' onClick={studentsValidations} type="button" >Next</button>
                            </div>
                        </div>



                            
                            :

                        <div>
                            <div>
                                <label className='Login-box'>Level of Study: </label>
                                <select value={LevelOfStudy} onChange={handleLevelOfStudy}>
                                    <option value="">Select Level</option>
                                    <option value="Diploma's Level">Diploma's Level</option>
                                    <option value="Bachelor's level">Bachelor's level</option>
                                    <option value="Master's level">Master's level</option>
                                </select>
                            </div>

                            <div className='Login-box'>
                                <label>Faculty/Division: </label>
                                <select value={Division} onChange={handleDivision}>
                                    <option value="">Select Faculty/Division</option>
                                    <option value="Computer and Information Sciences">Computer and Information Sciences</option>
                                    <option value="Engineering">Engineering</option>
                                    <option value="Science">Science</option>
                                    <option value="Business Administration">Business Administration</option>
                                    <option value="Medicine">Medicine</option>
                                </select>
                            </div>

                            <div className='Login-box'>
                                <label>Program: </label>
                                <select value={Program} onChange={handleProgram}>
                                    <option value="">Select Program</option>
                                    <option value={Majors[0]}>{Majors[0]}</option>
                                    <option value={Majors[1]}>{Majors[1]}</option>
                                    <option value={Majors[2]}>{Majors[2]}</option>
                                    <option value={Majors[3]}>{Majors[3]}</option>
                                    <option value={Majors[4]}>{Majors[4]}</option>
                                </select>
                            </div>

                            <button className='Register-button' onClick={graduateValidations} type="button" >Submit</button>
                            <button className='Register-button1' onClick={Change}  type="button" >Back</button>
                        </div>
                        
                    }

                </div>

            </div>

        </div>

    </div>


  );
}

export default RegisterPage;