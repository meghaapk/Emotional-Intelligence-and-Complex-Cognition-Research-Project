import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        consent : false,
        name: "",
        age: "",
        gender : "",
        education : "",
        exposed : ""
    });

  return (
    <div className="text-center">
        <h1 className="text-3xl"> Emotional Intelligence and Complex Cognition Research</h1>
        <div className="text-left w-9/12 mx-auto border-2 p-5 mt-5">
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
            <div className="flex flex-row">
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
                    className="ml-2"
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
                        <select value={userData.gender} onChange={(e) => setUserData({ ...userData, gender: e.target.value})} 
                        className="border border-gray-500 ml-2">
                            <option value={""}>Select</option>
                            <option value={"Male"}>Male</option>
                            <option value={"Male"}>Female</option>
                            <option value={"Male"}>Non Binary</option>
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
                    Are you constantly exposed to Sanskrit language learning or usage. This includes individuals enrolled in Sanskrit language programs, individuals practicing Sanskrit mantras, or those belonging to communities where Sanskrit is used frequently.
                    {/* yes or no radio button */}
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
                    <button type="submit"
                        className="bg-blue-500 text-white px-5 py-2 mt-5 w-3/4 mx-auto"
                        onClick={(e) => {
                            e.preventDefault();
                            if(userData.name === "" || userData.age === "" || userData.education === "" || userData.gender === "" || userData.exposed === "") {
                                alert("Please fill all the fields");
                            } else {
                                if(userData.age < 18 || userData.age > 29) {
                                    alert("You are not eligible for the study");
                                } else {
                                    navigate("/phase1");
                                }
                            }
                        }
                    }>
                    Start
                    </button>
                </div>
            )}
        </form>
    </div>
  );
}