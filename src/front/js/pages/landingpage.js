import React from "react";
import WelcomeBanner from "../component/WelcomeBanner.jsx";
import "../../styles/landingpage.css";

//create your first component
export const LandingPage = () => {
	return (
		<div className="text-center">

            <WelcomeBanner/>

		</div>
	);
};
