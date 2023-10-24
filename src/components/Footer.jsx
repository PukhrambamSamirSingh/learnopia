import { MdOutlineLocationOn, MdEmail } from "react-icons/md"
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa"

const Footer = () => {
    return (
        <footer className="w-full flex flex-col gap-4 px-6 py-4 mt-8">
            <hr />
            <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 xl:gap-4 justify-between items-start md:items-center">
                <div className="w-full h-full flex flex-col items-center md:items-start gap-2">
                    <h2 className="text-xl">(+91) 897 482 4047</h2>
                    <div className="flex items-center gap-1">
                        <MdOutlineLocationOn className="text-lg" />
                        <span>736 NW. Street Norway</span>
                    </div>
                    <div className="flex gap-2">
                        <FaFacebook className="text-lg" />
                        <FaInstagram className="text-lg" />
                        <FaTwitter className="text-lg" />
                    </div>
                </div>
                <div className="w-full h-full flex flex-col items-center md:items-start gap-2">
                    <h3 className="text-md">Information</h3>
                    <span className="text-sm">About Us</span>
                    <span className="text-sm">More Search</span>
                    <span className="text-sm">Blog</span>
                    <span className="text-sm">Testimonials</span>
                    <span className="text-sm">Events</span>
                </div>
                <div className="w-full h-full flex flex-col items-center md:items-start gap-2">
                    <h3 className="text-md">Helpful Links</h3>
                    <span className="text-sm">Services</span>
                    <span className="text-sm">Supports</span>
                    <span className="text-sm">Terms & Conditions</span>
                    <span className="text-sm">Privacy Policy</span>
                </div>
                <div className="w-full h-full flex flex-col items-center md:items-start gap-2">
                    <h3 className="text-md">Subscribe For More</h3>
                    <form className="flex flex-col items-center md:items-start gap-2">
                        <div className="flex gap-2 p-2 items-center bg-white rounded-md border">
                            <MdEmail className="mt-1 text-gray-500 text-lg" />
                            <input className="bg-transparent outline-none border-none text-black" type="email" placeholder="Enter your email" />
                        </div>
                        <button className="max-w-max bg-red-500 px-2 py-1 rounded-md text-sm font-semibold">Subscribe</button>
                    </form>
                </div>
            </div>
            <hr />
            <div className="w-full flex justify-center">
                <p>&copy; 2023 Your Website. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
