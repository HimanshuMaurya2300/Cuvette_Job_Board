import { useEffect, useState } from "react"
import Header from "../components/Header"
import { useLocation, useNavigate } from "react-router-dom"

const API_URL = import.meta.env.VITE_API_URL

const VerifySignupPage = () => {

    const navigate = useNavigate()

    const query = new URLSearchParams(useLocation().search)
    const companyEmail = query.get("companyEmail")

    const [company, setCompany] = useState({})
    const [emailOTP, setEmailOTP] = useState("")
    const [mobileOTP, setMobileOTP] = useState("")
    const [isEmailVerified, setIsEmailVerified] = useState(false)
    const [isMobileVerified, setIsMobileVerified] = useState(false)

    useEffect(() => {
        const fetchCompany = async () => {
            const company = await fetch(`${API_URL}/api/company/${companyEmail}`)
            const data = await company.json()
            setCompany(data)
            setIsEmailVerified(data?.isEmailVerified)
            setIsMobileVerified(data?.isMobileVerified)
        }

        fetchCompany()
    }, [companyEmail])

    useEffect(() => {
        if (isEmailVerified && isMobileVerified) {
            setTimeout(() => {
                navigate("/login")
            }, 2000)
        }
    }, [isEmailVerified, isMobileVerified, navigate])


    const verifyEmailOTP = async () => {

        const response = await fetch(`${API_URL}/api/auth/verify-email`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                companyEmail,
                emailOTP,
            }),
        })

        const data = await response.json()
        console.log(data)

        setEmailOTP("")
        setIsEmailVerified(true)
    }

    const verifyMobileOTP = async () => {

        const response = await fetch(`${API_URL}/api/auth/verify-mobile`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                phoneNo: company.phoneNo,
                mobileOTP
            })
        })

        const data = await response.json()
        console.log(data)

        setMobileOTP("")
        setIsMobileVerified(true)
    }

    return (
        <div className="flex w-full flex-col items-center gap-[242px] bg-white-a700 py-[46px] lg:gap-[181px] md:gap-[181px] md:py-5 sm:gap-[121px] sm:py-4">
            <div className="container-xs lg:px-5 md:px-5">
                <Header />
            </div>

            <div className="mb-1 flex justify-center self-stretch">
                <div className="container-xs flex items-center justify-between gap-5 px-[26px] lg:px-10 md:flex-col md:px-10">
                    <div className="ml-[42px] w-[42%] text-[22.24px] font-medium leading-7 text-gray-900_b2 lg:ml-0 lg:w-[42%] lg:text-[18px] md:ml-0 md:w-full md:self-auto">
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere dolorum corrupti ut id illo. A eius, quidem, quia modi corporis voluptate saepe possimus quasi nulla, ea illo impedit praesentium iure!
                    </div>

                    <div className="signupColumn_border flex w-[42%] flex-col items-center gap-[42px] rounded-[14px] bg-white-a700 p-[34px] md:w-full sm:p-4">
                        <div className="flex flex-col items-center gap-2">
                            <a href="#" className="lg:text-[27px] md:text-[26px] sm:text-[24px]">
                                <div className="text-[32px] font-semibold text-black-900">
                                    Sign Up
                                </div>
                            </a>
                            <div className="text-[16px] font-medium text-gray-900_b2 lg:text-[13px]">
                                Lorem ipsum dolor sit amet.
                            </div>
                        </div>
                        <div className="mb-10 self-stretch">
                            <input
                                type='text'
                                name='email_otp'
                                placeholder="Email OTP"
                                value={emailOTP}
                                disabled={isEmailVerified}
                                onChange={(e) => setEmailOTP(e.target.value)}
                                className="gap-4 rounded-md border border-blue_gray-100"
                            />

                            {isEmailVerified ? <div className="text-green-500">Email Verified</div> : <button className="mt-3.5 self-stretch rounded-md px-[34px] font-bold sm:px-4 bg-blue-a700 text-white-a700 flex flex-row items-center justify-center cursor-pointer whitespace-nowrap py-2 w-full"
                                onClick={verifyEmailOTP}>
                                Verify
                            </button>}

                            <input
                                type='text'
                                name='mobile_otp'
                                placeholder="Mobile OTP"
                                value={mobileOTP}
                                disabled={isMobileVerified}
                                onChange={(e) => setMobileOTP(e.target.value)}
                                className="gap-4 rounded-md border border-blue_gray-100 mt-3.5"
                            />

                            {isMobileVerified ? <div className="text-green-500">Mobile Verified</div> : <button className="mt-3.5 self-stretch rounded-md px-[34px] font-bold sm:px-4 bg-blue-a700 text-white-a700 flex flex-row items-center justify-center cursor-pointer whitespace-nowrap py-2 w-full"
                                onClick={verifyMobileOTP}>
                                Verify
                            </button>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VerifySignupPage