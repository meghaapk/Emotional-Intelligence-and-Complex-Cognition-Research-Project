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
        <h1> Emotional Intelligence and Complex Cognition Research</h1>
        <div className="text-justify w-7/12 mx-auto">
            <p>Greetings !</p>
            <p>You are being asked to take part in a study conducted by Megha from Srishti Manipal Institute of Art , Design and Technology . </p>
            <p>As part of my research , I aim to study and analyze" Relationship between Emotional Intelligence and Complex Cognition " . This survey is designed to collect the demographics and consent .</p>
            <p>Eligibility : 18-29 year-olds </p>
            <p>Ethical Considerations :</p>
            <p>Participation in this study is completely voluntary, This session may be recorded (Audio , Video and Photographs)for research purposes only and you may withdraw from the study at any time. All of the information that you provide in this survey will be kept confidential. Your responses will be aggregated with the responses of other participants, and your individual identity will not be revealed.</p>
            <p>The results of this survey will be used to understand the demographics and consent to the study. The results may be published in academic journals or presented at conferences, but your individual identity will not be revealed. </p>
        </div>
        <p>If you have any questions or concerns about this survey, please contact the researcher at megha.smiblr2023@learner.manipal.edu</p>
        <form className="text-center flex flex-col">
            <label>
            <input
                type="checkbox"
                checked={userData.consent}
                onChange={(e) => setUserData({ ...userData, consent: e.target.checked })}
            />
            I consent to participate in the research
            </label>
            {userData.consent && (
                <div className="flex flex-col w-1/4 mx-auto gap-2 text-left">
                    <label>
                    Name:
                    <input
                        type="text"
                        value={userData.name}
                        onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                    />
                    </label>
                    <label>
                    Age:
                    <input
                        type="number"
                        value={userData.age}
                        onChange={(e) => setUserData({ ...userData, age: e.target.value })}
                    />
                    </label>
                    <label>
                        Gender :
                        <select value={userData.gender} onChange={(e) => setUserData({ ...userData, gender: e.target.value})}>
                            <option value={""}>Select</option>
                            <option value={"Male"}>Male</option>
                            <option value={"Male"}>Female</option>
                            <option value={"Male"}>Non Binary</option>
                        </select>
                    </label>
                    <label>
                    What is your highest level of education?
                    <input
                        type="text"
                        value={userData.education}
                        onChange={(e) => setUserData({ ...userData, education: e.target.value })}
                    />
                    </label>
                    <label>
                    Are you constantly exposed to Sanskrit language learning or usage. This includes individuals enrolled in Sanskrit language programs, individuals practicing Sanskrit mantras, or those belonging to communities where Sanskrit is used frequently.
                    <input
                        type="radio"
                        value={userData.education}
                        onChange={(e) => setUserData({ ...userData, exposed: e.target.value })}
                    />
                    </label>
                    <button type="submit" onClick={(e) => {
                        e.preventDefault();
                        if(userData.name === "" || userData.age === "" || userData.education === "" || userData.gender
                        === "" || userData.exposed === ""){
                            alert("Please fill all the fields");
                        } else {
                            navigate("/phase1");
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