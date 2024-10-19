const InterviewCard = ({ title, description, experienceLevel, emails, endDate }) => {
    return (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden my-4">
            <div className="p-6">
                <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
                <p className="text-gray-600 mt-2">{description}</p>

                <div className="mt-4">
                    <span className="text-gray-500 font-medium">Experience Level: </span>
                    <span className="text-gray-800">{experienceLevel}</span>
                </div>

                <div className="mt-2">
                    <span className="text-gray-500 font-medium">Candidate Email: </span>
                    {emails.map((email, index) => (
                        <>
                            <span key={index} className="text-blue-500 mr-2">{email}</span>
                        </>
                    ))}
                </div>

                <div className="mt-2">
                    <span className="text-gray-500 font-medium">End Date: </span>
                    <span className="text-gray-800">{endDate}</span>
                </div>
            </div>
        </div>
    );
};

export default InterviewCard;
