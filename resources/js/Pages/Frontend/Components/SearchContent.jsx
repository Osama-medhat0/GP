const SearchContent = () => {
    return (
        <>
            <div
                className="container d-flex justify-content-center align-items-center pb-6 pt-4"
                style={{
                    backgroundColor: "white",
                    borderRadius: "10px",
                    width: "40rem",
                    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
                }}
            >
                <div>
                    <h1
                        className="text-center"
                        style={{ color: "#01D28E", marginBottom: "45px" }}
                    >
                        Find a Car
                    </h1>
                    <div className="model-search-content">
                        <div className="row justify-content-center">
                            <div className="col-md-4 pb-4">
                                <div className="single-model-search">
                                    <h6>Year</h6>
                                    <div className="model-select-icon">
                                        <select
                                            className="form-control"
                                            style={{
                                                backgroundColor: "lightgray",
                                                color: "gray",
                                                border: "1px solid #ccc",
                                                borderRadius: "8px",
                                                padding: "8px",
                                            }}
                                            defaultValue="" // Fixes the "selected" warning
                                        >
                                            <option value="" disabled hidden>
                                                Year
                                            </option>
                                            <option value={2018}>2018</option>
                                            <option value={2017}>2017</option>
                                            <option value={2016}>2016</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="single-model-search pt-5">
                                    <h6>Body style</h6>
                                    <div className="model-select-icon">
                                        <select
                                            className="form-control"
                                            defaultValue=""
                                        >
                                            <option value="" disabled hidden>
                                                style
                                            </option>
                                            <option value="sedan">sedan</option>
                                            <option value="van">van</option>
                                            <option value="roadster">
                                                roadster
                                            </option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="single-model-search">
                                    <h6>Select make</h6>
                                    <div className="model-select-icon">
                                        <select
                                            className="form-control"
                                            defaultValue=""
                                        >
                                            <option value="" disabled hidden>
                                                make
                                            </option>
                                            <option value="toyota">
                                                toyota
                                            </option>
                                            <option value="holden">
                                                holden
                                            </option>
                                            <option value="mercedes-benz">
                                                mercedes-benz
                                            </option>
                                        </select>
                                    </div>
                                </div>
                                <div className="single-model-search pt-5">
                                    <h6>Car condition</h6>
                                    <div className="model-select-icon">
                                        <select
                                            className="form-control"
                                            defaultValue=""
                                        >
                                            <option value="" disabled hidden>
                                                condition
                                            </option>
                                            <option value="new">new</option>
                                            <option value="used">used</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="single-model-search">
                                    <h6>Model</h6>
                                    <div className="model-select-icon">
                                        <select
                                            className="form-control"
                                            defaultValue=""
                                        >
                                            <option value="" disabled hidden>
                                                model
                                            </option>
                                            <option value="kia-rio">
                                                kia-rio
                                            </option>
                                            <option value="mitsubishi">
                                                mitsubishi
                                            </option>
                                            <option value="ford">ford</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="single-model-search pt-5">
                                    <h6>Price Range</h6>
                                    <div className="model-select-icon">
                                        <select
                                            className="form-control"
                                            defaultValue=""
                                        >
                                            <option value="" disabled hidden>
                                                price
                                            </option>
                                            <option value="$0.00">$0.00</option>
                                            <option value="$10000.00">
                                                $10000.00
                                            </option>
                                            <option value="$20000.00">
                                                $20000.00
                                            </option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="text-center mt-3">
                            <button
                                className="welcome-btn model-search-btn"
                                style={{
                                    color: "white",
                                    backgroundColor: "#01D28E",
                                    borderRadius: "10px",
                                    padding: "7px",
                                    width: "6rem",
                                }}
                                onClick={() => (window.location.href = "#")} // Fixes the "onClick" warning
                            >
                                <span style={{ fontSize: "1.2rem" }}>
                                    search
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SearchContent;
