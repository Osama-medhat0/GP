import MainLayout from "@/Layouts/MainLayout";
import React from "react";

const CarPriceEstimate = () => {
    return (
        <>
            <MainLayout>
                <div className="p-4">
                    <iframe
                        src="http://localhost:8501"
                        width="100%"
                        height="800"
                        style={{ border: "none" }}
                        title="Car Price Prediction"
                    ></iframe>
                </div>
            </MainLayout>
        </>
    );
};

export default CarPriceEstimate;
