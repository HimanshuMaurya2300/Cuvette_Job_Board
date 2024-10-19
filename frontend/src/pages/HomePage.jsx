import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import InterviewCard from "../components/InterviewCard"

const API_URL = import.meta.env.VITE_API_URL
const BASE_URL = import.meta.env.VITE_FRONTEND_URL

const HomePage = () => {

    const navigate = useNavigate()

    const [interviews, setInterviews] = useState([])
    const [name, setName] = useState("")

    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const token = localStorage.getItem("token")


    useEffect(() => {
        const fetchInterviews = async () => {
            const response = await fetch(`${API_URL}/api/interview`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            })
            const data = await response.json()
            // console.log(data)
            setInterviews(data)
        }
        fetchInterviews()
    }, [token])

    useEffect(() => {
        const fetchUser = async () => {
            const response = await fetch(`${API_URL}/api/company/checkVerification`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            })

            const data = await response.json()
            // console.log(data[0].name)
            setName(data[0].name)
        }

        fetchUser()
    }, [token])


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
                                src={`${BASE_URL}/public/logo.svg`}
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
                            src={`${BASE_URL}/public/homeIcon.svg`}
                            alt="home-icon"
                            className="h-[42px] w-[42px] object-cover sm:w-full"
                            onClick={() => navigate("/")}
                        />
                    </div>

                    <div className="py-[43px] ml-[40px]">
                        <button className="self-stretch rounded-md font-bold px-4 bg-blue-a700 text-white-a700 flex flex-row items-center justify-center cursor-pointer whitespace-nowrap py-2"
                            onClick={() => navigate("/interview-form")}>
                            Create Interview
                        </button>

                        <div className="flex gap-5 flex-wrap">
                            {interviews.map((interview) => (
                                <InterviewCard
                                    key={interview._id}
                                    title={interview.title}
                                    description={interview.description}
                                    experienceLevel={interview.experienceLevel}
                                    emails={interview.candidates}
                                    endDate={interview.endDate}
                                />
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </div >
    )
}

export default HomePage
