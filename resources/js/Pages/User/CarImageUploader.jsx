import React, { useState } from "react";
import { cilCamera } from "@coreui/icons";
import CIcon from "@coreui/icons-react";

const CarImageUploader = ({ images, setImages }) => {
    // const [images, setImages] = useState([]);

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setImages([...images, ...files]);
    };

    const removeImage = (index) => {
        const updatedImages = images.filter((_, i) => i !== index);
        setImages(updatedImages);
    };

    return (
        <div className="image-uploader ">
            <label htmlFor="file-input" className="add-image">
                +
            </label>
            <input
                id="file-input"
                type="file"
                multiple
                onChange={handleImageChange}
                style={{ display: "none" }}
                disabled={images.length === 4}
            />

            {images.map((image, index) => (
                <div
                    key={index}
                    className={`image-preview ${index === 0 ? "cover" : ""}`}
                >
                    <img
                        src={URL.createObjectURL(image)}
                        alt={`Car ${index + 1}`}
                    />
                    <button
                        className="remove-btn  pb-4"
                        onClick={() => removeImage(index)}
                    >
                        ×
                    </button>
                    {index === 0 && <span className="cover-tag">COVER</span>}
                </div>
            ))}
            {Array.from({ length: 4 - images.length }).map((_, index) => (
                <label
                    key={`empty-${index}`}
                    className="empty-slot cursor-pointer"
                >
                    <input
                        type="file"
                        multiple
                        onChange={handleImageChange}
                        className="hidden"
                    />
                    <CIcon
                        icon={cilCamera}
                        style={{
                            width: "22px",
                            marginLeft: "10px",
                        }}
                    />
                    <div>+</div>
                </label>
            ))}
        </div>
    );
};

export default CarImageUploader;
