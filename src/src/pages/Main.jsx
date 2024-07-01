import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ref, getDownloadURL, uploadString } from "firebase/storage";
import { auth, storage, signInAnonymousUser } from "./firebase";

export default function Home() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        consent: false,
        name: "",
        email: "",
        age: "",
        gender: "",
        education: "",
        exposed: false,
        phase1: 0,
        phase2: 0,
        phase3: 0,
    });

    useEffect(() => {
        // Sign in anonymously on component mount
        signInAnonymousUser();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!userData.consent || !userData.name || !userData.email || !userData.age || !userData.gender || !userData.education || userData.exposed === "") {
            alert("Please fill out all fields and consent to participate.");
        } else if (userData.age < 18 || userData.age > 29) {
            alert("You are not eligible for the study (age must be between 18 and 29).");
        } else {
            try {
                const csvRef = ref(storage, 'user.csv');
                let csvContent = "data:text/csv;charset=utf-8,";

                // Get existing CSV file
                try {
                    const url = await getDownloadURL(csvRef);
                    const response = await fetch(url, 
                        {
                            method: 'GET',
                            mode: 'no-cors',
                            headers: {
                                'Content-Type': 'text/csv',
                            }
                        }
                    );
                    const existingCsv = await response.text();
                    const existingUsers = existingCsv.split("\n").slice(1).map((line) => line.split(","));
                    const existingUser = existingUsers.find((user) => user[1] === userData.email);
                    console.log("Existing user: ", existingUsers);
                    if (existingUser) {
                        alert("User already exists. Please use the same email address.");
                        return;
                    }
                    csvContent += existingCsv;
                } catch (error) {
                    csvContent += "name,email,age,gender,education,exposed,phase1,phase2,phase3\n";
                }

                const newUserEntry = `${userData.name},${userData.email},${userData.age},${userData.gender},${userData.education},${userData.exposed},${userData.phase1},${userData.phase2},${userData.phase3}\n`;
                csvContent += newUserEntry;

                // Upload updated CSV file
                await uploadString(csvRef, csvContent, 'data_url');
                alert("User data has been submitted successfully!");
                navigate("/phase1");
            } catch (error) {
                console.error("Error uploading CSV file: ", error);
                alert("Error submitting user data. Please try again.");
            }
        }
    };

    return (
        <div className="text-center">
            <h1 className="text-3xl mt-5">Emotional Intelligence and Complex Cognition Research</h1>
            <div className="text-left w-7/12 mx-auto border-2 p-5 mt-5">
                <p className="font-bold">Greetings !</p>
                <p>You are being asked to take part in a study conducted by Megha from Srishti Manipal Institute of Art , Design and Technology.</p>
                <p>As part of my research , I aim to study and analyze "Relationship between Emotional Intelligence and Complex Cognition". This survey is designed to collect the demographics and consent.</p>
                <p>
                    <span className="font-bold">Eligibility :</span> 
                    18-29 year-olds 
                </p>
                <p>
                    <span className="font-bold">Ethical Considerations :</span> 
                    Participation in this study is completely voluntary, This session may be recorded (Audio , Video and Photographs)for research purposes only and you may withdraw from the study at any time. 
                    All of the information that you provide in this survey will be kept confidential. Your responses will be aggregated with the responses of other participants, and your individual identity will not be revealed.</p>
                <p>The results of this survey will be used to understand the demographics and consent to the study. The results may be published in academic journals or presented at conferences, but your individual identity will not be revealed. </p>
                <div>
                    If you have any questions or concerns about this survey, please contact the researcher at
                    <a className="ml-1 font-bold" href="mailto:megha.smiblr2023@learner.manipal.edu">megha.smiblr2023@learner.manipal.edu</a>
                </div>
            </div>
            <form className="text-left flex flex-col border w-7/12 mx-auto p-5 mt-5">
                <label>
                    <span className="mr-2">I consent to participate in the research</span>
                    <input
                        type="checkbox"
                        checked={userData.consent}
                        onChange={(e) => setUserData({ ...userData, consent: e.target.checked })}
                    />
                </label>
                {userData.consent && (
                    <div className="flex flex-col mx-auto gap-2">
                        <label className="flex flex-row w-full">
                            Name:
                            <input
                                type="text"
                                className="border border-gray-500 ml-2"
                                value={userData.name}
                                onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                            />
                        </label>
                        <label className="flex flex-row w-full">
                            Email :
                            <input
                                type="email"
                                className="border border-gray-500 ml-2"
                                value={userData.email}
                                onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                            />
                        </label>
                        <label className="flex flex-row w-full">
                            Age:
                            <input
                                type="number"
                                className="border border-gray-500 ml-2"
                                value={userData.age}
                                onChange={(e) => setUserData({ ...userData, age: e.target.value })}
                            />
                        </label>
                        <label className="flex flex-row w-full">
                            Gender :
                            <select
                                value={userData.gender}
                                onChange={(e) => setUserData({ ...userData, gender: e.target.value })}
                                className="border border-gray-500 ml-2"
                            >
                                <option value="">Select</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Non Binary">Non Binary</option>
                            </select>
                        </label>
                        <label className="flex flex-row w-full">
                            What is your highest level of education?
                            <input
                                type="text"
                                className="border border-gray-500 ml-2"
                                value={userData.education}
                                onChange={(e) => setUserData({ ...userData, education: e.target.value })}
                            />
                        </label>
                        <label className="flex flex-row w-full">
                            Are you constantly exposed to Sanskrit language learning or usage?
                            <div className="flex flex-row w-1/2 justify-evenly">
                                <label htmlFor="yes">
                                    <p>Yes</p>
                                    <input
                                        type="radio"
                                        id="yes"
                                        name="exposed"
                                        value="Yes"
                                        onChange={(e) => setUserData({ ...userData, exposed: e.target.value })}
                                    />
                                </label>
                                <label htmlFor="no">
                                    <p>No</p>
                                    <input
                                        type="radio"
                                        id="no"
                                        name="exposed"
                                        value="No"
                                        onChange={(e) => setUserData({ ...userData, exposed: e.target.value })}
                                    />
                                </label>
                            </div>
                        </label>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-5 py-2 mt-5 w-3/4 mx-auto"
                            onClick={handleSubmit}
                        >
                            Start
                        </button>
                    </div>
                )}
            </form>
        </div>
    );
}
