import React from "react";
import { Headset, ShoppingCart, BadgePoundSterling } from "lucide-react";
import { Link } from "react-router-dom";

const AboutUs = () => {
    return (
        <section className="px-6 py-12 bg-gray-100 text-center">
            <div className="max-w-4xl mx-auto">
                <div className="grid md:grid-cols-3 gap-8">
                    <Link to="/buybooks" className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="flex justify-center items-center text-center mb-4">
                            <ShoppingCart size={50} />
                        </h2>
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">BROWSE & BUY</h3>
                        <p className="text-gray-500">Affordable reads, delivered to your doorstep.</p>
                    </Link>
                    <Link to="/sellbooks" className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="flex justify-center items-center text-center mb-4">
                            <BadgePoundSterling size={50} />
                        </h2>
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">RESELL WITH EASE</h3>
                        <p className="text-gray-500">Reach book buyers easily and securely.  Once a book is sold, it remains on the platform, offering users the opportunity to express interest by liking the listing.</p>
                    </Link>
                    <Link to="https://adedamola-araoye.onrender.com/" className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="flex justify-center items-center text-center mb-4">
                        <Headset size={50} />
                        </h2>
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">NEED HELP?</h3>
                        <p className="text-gray-500">We’re happy to assist you at every step.</p>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default AboutUs;
