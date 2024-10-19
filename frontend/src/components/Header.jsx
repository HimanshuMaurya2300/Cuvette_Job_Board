const Header = () => {

    return (
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
                </div>
            </div>
        </header >
    )
}

export default Header