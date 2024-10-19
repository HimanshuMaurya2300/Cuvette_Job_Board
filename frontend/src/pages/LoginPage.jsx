import { useState } from "react"
import Header from "../components/Header"
import { useNavigate } from "react-router-dom"

const BASE_URL = import.meta.env.VITE_BASE_URL

const LoginPage = () => {

    const navigate = useNavigate()

    const [name, setName] = useState("")
    const [companyName, setCompanyName] = useState("")
    const [companyEmail, setCompanyEmail] = useState("")

    const handleLogin = async (e) => {

        e.preventDefault()

        const response = await fetch(`${BASE_URL}/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name,
                companyName,
                companyEmail,
            }),
        })

        const data = await response.json()

        localStorage.setItem("token", data.token)

        navigate("/")
    }

    return (
        <div className="flex w-full flex-col items-center gap-[102px] bg-white-a700 py-[46px] lg:gap-[102px] md:gap-[76px] sm:gap-[51px] sm:py-4">
            <div className="container-xs lg:px-5 md:px-5">
                <Header />
            </div>

            <div className="mb-1 flex justify-center self-stretch">
                <div className="container-xs flex items-center justify-between gap-5 px-[26px] lg:px-10 md:flex-col md:px-10">
                    <div className="ml-[42px] w-[42%] text-[22.24px] font-medium leading-7 text-gray-900_b2 lg:ml-0 lg:w-[42%] lg:text-[18px] md:ml-0 md:w-full md:self-auto">
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere dolorum corrupti ut id illo. A eius, quidem, quia modi corporis voluptate saepe possimus quasi nulla, ea illo impedit praesentium iure!
                    </div>

                    <div className="signupColumn_border flex w-[42%] flex-col items-center rounded-[14px] bg-white-a700 p-[26px] md:w-full sm:p-4">
                        <a href="#" className="mt-2 lg:text-[27px] md:text-[26px] sm:text-[24px]">
                            <div className="text-[32px] font-semibold text-black-900">
                                Login
                            </div>
                        </a>
                        <div className="mt-2 text-[16px] font-medium text-gray-900_b2 lg:text-[13px]">
                            Lorem ipsum dolor sit amet.
                        </div>

                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="mt-[42px] gap-4 self-stretch rounded-md border border-blue_gray-100"
                        />

                        <input
                            type='text'
                            name='company_name'
                            placeholder="Company Name"
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            className="mt-[30px] gap-4 self-stretch rounded-md border border-blue_gray-100"
                        />

                        <input
                            type='email'
                            name='company_email'
                            placeholder="Company Email"
                            value={companyEmail}
                            onChange={(e) => setCompanyEmail(e.target.value)}
                            className="mt-[30px] gap-4 self-stretch rounded-md border border-blue_gray-100"
                        />

                        <div className="mt-[30px] w-[64%] text-center text-[16px] font-bold leading-5 text-gray-900_b2 lg:w-full lg:text-[13px] md:w-full">
                            <span className="text-gray-900_b2">
                                By clicking on proceed you will accept our
                            </span>
                            <br />
                            <span
                                className='text-blue-a700_b2'
                            >
                                Terms
                            </span>
                            <span className="text-gray-900_b2">
                                &nbsp;&&nbsp;
                            </span>
                            <span
                                className='text-blue-a700_b2'
                            >
                                Conditions
                            </span>
                        </div>

                        <button className="mt-4 self-stretch rounded-md px-[34px] font-bold sm:px-4 bg-blue-a700 text-white-a700 flex flex-row items-center justify-center cursor-pointer whitespace-nowrap py-2"
                            onClick={handleLogin}
                        >
                            Proceed
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage