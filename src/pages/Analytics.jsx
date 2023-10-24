import BarChartBox from "../components/BarChartBox"
import AddsRevenueChartBox from "../components/AddsRevenueChartBox"
import PieChartBox from "../components/PieChartBox"
import TinyBarChartBox from "../components/TinyBarChartBox"
import { addsRevenue, profileVisitors } from "../data"
import ProfileVisitorChartBox from "../components/ProfileVisitorChartBox"
import Footer from "../components/Footer"

const Analytics = () => {
    return (
        <div className="w-full flex flex-col">
            <div className="w-full flex flex-col xxs:grid grid-cols-2 xl:grid-cols-3 gap-4 mt-5 auto-rows-[minmax(140px,auto)]">
                <div className="w-full shadow-lg p-4 rounded-lg">
                    <TinyBarChartBox />
                </div>
                <div className="w-full shadow-lg p-4 rounded-lg">
                    <ProfileVisitorChartBox {...profileVisitors} />
                </div>
                <div className="w-full shadow-lg p-4 rounded-lg">
                    <AddsRevenueChartBox {...addsRevenue} />
                </div>
                <div className="w-full shadow-lg row-span-2 p-4 rounded-lg">
                    <PieChartBox />
                </div>
                <div className="w-full shadow-lg p-4 col-span-2 row-span-2 rounded-lg">
                    <BarChartBox />
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Analytics
