import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import DatePicker from "../components/DatePicker"

const API_URL = import.meta.env.VITE_API_URL

const InterviewForm = () => {

    const navigate = useNavigate()

    const [candidates, setCandidates] = useState([]);
    const [newCandidate, setNewCandidate] = useState('');

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [experienceLevel, setExperienceLevel] = useState("")
    const [endDate, setEndDate] = useState("")
    const [name, setName] = useState("")

    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleAddCandidate = (e) => {
        e.preventDefault();
        if (newCandidate && !candidates.includes(newCandidate)) {
            setCandidates([...candidates, newCandidate]);
            setNewCandidate('');
        }
    };

    const handleRemoveCandidate = (candidate) => {
        setCandidates(candidates.filter(c => c !== candidate));
    };

    const handleSubmit = async (e) => {
        e.preventDefault()

        const token = localStorage.getItem("token")

        const response = await fetch(`${API_URL}/api/interview`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title,
                description,
                experienceLevel,
                endDate,
                candidates
            }),
        })

        const data = await response.json()
        console.log(data)

        setTitle("")
        setDescription("")
        setExperienceLevel("")
        setEndDate("")
        setCandidates([])

        navigate("/")
    }

    useEffect(() => {

        const checkVerification = async () => {
            const token = localStorage.getItem("token")
            const response = await fetch(`${API_URL}/api/company/checkVerification`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            })
            const data = await response.json()
            setName(data[0].name)
        }

        checkVerification()

    }, [navigate])


    const handleLogout = () => {
        localStorage.removeItem("token")
        navigate("/login")
    }

    return (
        <div className="w-full bg-white-a700">
            <div className="flex flex-col">
                <div className="border-b border-blue_gray-100 pb-4 py-[26px] px-[26px]">
                    <header className="flex items-center">
                        <div className="flex w-full justify-between gap-5">
                            <img
                                src="../../public/logo.svg"
                                alt="logo"
                                className="h-[43px] w-[165px]"
                            />
                            <div className="flex gap-8 items-center">
                                <div className="font-dmsans font-medium text-blue_gray-600 lg:text-[23px] md:text-[22px]">
                                    Contact
                                </div>

                                <div className="relative inline-block text-left">
                                    <button
                                        onClick={handleToggle}
                                        className="flex items-center border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        {/* Avatar */}
                                        <div className="h-6 w-6 rounded-full bg-gray-300 mr-2" />

                                        {/* Name */}
                                        <span className="text-gray-700">{name}</span>

                                        {/* Dropdown Arrow */}
                                        <svg
                                            className="ml-2 h-5 w-5 text-gray-500"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </button>

                                    {/* Dropdown */}
                                    {isOpen && (
                                        <div className="absolute right-0 mt-2 w-32 origin-top-right bg-white border border-gray-200 rounded-lg shadow-lg">
                                            <button
                                                onClick={handleLogout}
                                                className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
                                            >
                                                Logout
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </header >
                </div>

                <div className="flex gap-98 sm:flex-col">
                    <div className="border-r border-blue_gray-100 px-5 h-screen py-[43px]">
                        <img
                            src="../../public/homeIcon.svg"
                            alt="home-icon"
                            className="h-[42px] w-[42px] object-cover sm:w-full"
                            onClick={() => navigate("/")}
                        />
                    </div>

                    <div className="flex w-[66%] flex-col items-end gap-11 py-10">
                        <div className="flex flex-col gap-[30px] self-stretch">
                            <div className="flex items-start justify-end gap-[57px] md:flex-col">
                                <p className="mt-2 text-[32px] font-normal text-black-900 lg:text-[27px] md:mt-0 md:text-[26px] sm:text-[24px]">
                                    Job Title
                                </p>

                                <input
                                    type="text"
                                    name="job_title"
                                    placeholder="Enter Job Title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="w-[60%] self-center rounded-[10px] !border px-[30px] md:w-full sm:px-4"
                                />
                            </div>

                            <div className="flex items-start justify-end gap-[57px] md:flex-col">
                                <p className="mt-3 text-[32px] font-normal text-black-900 lg:text-[27px] md:mt-0 md:text-[26px] sm:text-[24px]">
                                    Job Description
                                </p>

                                <textarea
                                    name="job_description"
                                    placeholder="Enter Job Description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="w-[60%] self-center rounded-[10px] !border !border-blue_gray-100_01 px-[30px] text-blue_gray-700_b2 sm:px-4"
                                />
                            </div>

                            <div className="flex flex-col gap-[30px]">
                                <div className="flex items-center justify-end gap-[57px] md:flex-col">
                                    <p className="text-[32px] font-normal text-black-900 lg:text-[27px] md:text-[26px] sm:text-[24px]">
                                        Expericence Level
                                    </p>

                                    <div className="flex w-[60%] item-end justify-between gap-5 rounded-[10px] border border-solid border-blue_gray-100_01 px-[26px] py-3.5 md:w-full sm:px-4">
                                        <select
                                            id="experienceLevel"
                                            name="experienceLevel"
                                            value={experienceLevel}
                                            onChange={(e) => setExperienceLevel(e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            <option value="" name="experienceLevel">Select Experience Level</option>
                                            <option value="fresher" name="experienceLevel">Fresher</option>
                                            <option value="intermediate" name="experienceLevel">Intermediate</option>
                                            <option value="senior" name="experienceLevel">Senior</option>
                                        </select>

                                        {/* <p className="text-[24px] font-normal text-blue_gray-700_b2 lg:text-[20px]">
                                            Select Experience Level
                                        </p> */}

                                        <img
                                            src='../../public/selectIcon.svg'
                                            alt='select_icon'
                                            className="mb-1 h-[26px] w-[26px] rounded"
                                        />
                                    </div>
                                </div>

                                <div className="flex items-start justify-end gap-[57px] md:flex-col">
                                    <p className="mt-2 text-[32px] font-normal text-black-900 lg:text-[27px] md:mt-0 md:text-[26px] sm:text-[24px]">
                                        Add Candidate
                                    </p>

                                    <div className="flex w-[60%] self-center py-[24px] rounded-[10px] border border-solid border-blue_gray-100_01 px-6 md:w-full sm:p-4 flex-col">
                                        {/* <div className="flex w-[50%] items-center rounded-[22px] border border-solid border-blue_gray-100_01 p-1.5">
                                            <div className="h-[26px] w-[26px] rounded-full bg-gray-300" />
                                            <p className="ml-1.5 text-[20px] font-normal text-blue_gray-700_b2 lg:text-[17px]">
                                                xyz@gmail.com
                                            </p>
                                            <img src="../../public/closeIcon.svg" alt="close_icon"
                                                className="ml-3 h-[10px] w-[10px]"
                                            />
                                        </div> */}

                                        <div className="flex items-center space-x-2">
                                            <input
                                                type="email"
                                                id="addCandidate"
                                                value={newCandidate}
                                                onChange={(e) => setNewCandidate(e.target.value)}
                                                placeholder="Enter email"
                                                className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                            <button
                                                onClick={handleAddCandidate}
                                                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            >
                                                Add
                                            </button>
                                        </div>
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            {candidates.length > 0 && candidates.map((candidate, index) => (
                                                <div key={index} className="flex items-center bg-gray-100 px-2 py-1 rounded-md">
                                                    <span className="text-sm">{candidate}</span>
                                                    <button
                                                        onClick={() => handleRemoveCandidate(candidate)}
                                                        className="ml-2 text-gray-500 hover:text-gray-700 focus:outline-none"
                                                    >
                                                        <img src="../../public/closeIcon.svg" alt="close_icon"
                                                            className="ml-3 h-[10px] w-[10px]"
                                                        />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>


                                <div className="flex items-start justify-end gap-[57px] md:flex-col relative">
                                    <p className="mt-3 text-[32px] font-normal text-black-900 lg:text-[27px] md:mt-0 md:text-[26px] sm:text-[24px]">
                                        End Date
                                    </p>
                                    <DatePicker
                                        name='Date Picker'
                                        placeholder={'Select a Date'}
                                        value={endDate}
                                        onChange={setEndDate}
                                        className='flex w-[60%] gap-[34px] self-center rounded-[10px] border border-solid border-blue_gray-100_01 bg-transparent px-[30px] py-4 text-[24px] text-blue_gray-700_b2 md:w-full sm:px-4'
                                    />
                                    <img
                                        src='../../public/calendarIcon.svg'
                                        alt='calendar icon'
                                        className='w-5 h-5 cursor-pointer absolute right-5 top-[50%] translate-y-[-50%]'
                                    />
                                </div>
                            </div>
                        </div>
                        <button className="mt-4 bg-blue-a700 text-white-a700 flex flex-row items-center justify-center cursor-pointer whitespace-nowrap py-2 min-w-[164px] rounded-[10px] px-[34] font-bold sm:px-4"
                            onClick={handleSubmit}
                        >
                            Send
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InterviewForm