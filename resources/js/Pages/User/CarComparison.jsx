import MainLayout from "@/Layouts/MainLayout";
import { Link, usePage } from "@inertiajs/react";

const CarComparison = () => {
    const { cars } = usePage().props;

    if (!cars || cars.length < 2) {
        return (
            <MainLayout>
                <div className="container text-center my-5">
                    <h2 className="text-danger">Not enough cars to compare</h2>
                    <button
                        onClick={() => window.history.back()}
                        className="px-10  bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200"
                    >
                        Back to Cars
                    </button>
                </div>
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            <section className="container my-5 ">
                <h2 className="text-center mb-12">Car Comparison</h2>

                <div className="flex justify-center flex-wrap  gap-4">
                    {cars.map((car) => {
                        const images = JSON.parse(car.images);
                        const imageUrl = `/storage/${images[0]}`;

                        return (
                            <div
                                key={car.id}
                                className="flex-1 min-w-0 max-w-[300px] w-full"
                            >
                                <div className="card text-center p-1 shadow-sm rounded border h-full text-sm">
                                    <img
                                        src={imageUrl}
                                        alt={`${car.make} ${car.model}`}
                                        className="card-img-top rounded mb-2 mx-auto"
                                        style={{
                                            height: "170px",
                                            width: "100%",
                                            objectFit: "cover",
                                        }}
                                    />
                                    <style>{`
                                        @media (max-width: 500px) {
                                            .card-body.no-padding-500 {
                                                padding: 0 !important;
                                            }
                                        }
                                    `}</style>

                                    <div className="card-body no-padding-500">
                                        <h5 className="font-semibold mt-2  mb-4 car-data-responsive ">
                                            {car.make} {car.model}
                                        </h5>
                                        <p className="border-b py-1 mb-4  car-data-responsive">
                                            Year: <strong>{car.year}</strong>
                                        </p>
                                        <p className="border-b py-1 mb-4  car-data-responsive">
                                            Price:{" "}
                                            <strong>
                                                ${car.price.toLocaleString()}
                                            </strong>
                                        </p>
                                        <p className="border-b py-1 mb-4 car-data-responsive">
                                            Mileage:{" "}
                                            <strong>{car.mileage} km</strong>
                                        </p>
                                        <p className="border-b py-1 mb-4 car-data-responsive">
                                            Transmission:{" "}
                                            <strong>{car.transmission}</strong>
                                        </p>
                                        <p className="py-1 mb-4 car-data-responsive">
                                            Fuel Type:{" "}
                                            <strong>{car.fuelType}</strong>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="text-center mt-5">
                    <button
                        onClick={() => window.history.back()}
                        className="px-10  bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200"
                    >
                        Back to Cars
                    </button>
                </div>
            </section>
        </MainLayout>
    );
};

export default CarComparison;
