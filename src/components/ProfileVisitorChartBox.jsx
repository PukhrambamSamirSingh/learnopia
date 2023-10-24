import { LineChart, Line, ResponsiveContainer, Tooltip } from 'recharts';
import PropTypes from "prop-types"

const ProfileVisitorChartBox = ({ title, dataKey, img, percentage, chartData }) => {
    const customTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload; // Get the data object from payload
            return (
                <div className='bg-black text-white p-2 rounded-md'>
                    <p className='mb-0'>{data.name}</p> {/* Display the name */}
                    <p className='mb-0'>{`${dataKey}: ${payload[0].value}`}</p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className='w-full flex flex-col gap-2'>
            <div className='flex gap-2'>
                <img className='w-8 h-8 object-contain' src={img} alt="" />
                <h1 className='text-md font-bold'>{title}</h1>
            </div>
            <div className='w-full flex flex-col'>
                <div className='w-full'>
                    <ResponsiveContainer width="99%" height={100}>
                        <LineChart width={300} height={100} data={chartData}>
                            <Tooltip
                                contentStyle={{ background: "black" }}
                                content={customTooltip}
                            />
                            <Line type="monotone" dataKey={dataKey} stroke="#8884d8" strokeWidth={2} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
                <div className='w-full flex flex-col items-end'>
                    <h2 className={`${percentage > 0 ? "text-green-500" : "text-red-500"} text-xl font-bold`}>{percentage}%</h2>
                    <span className='text-xl font-semibold'>this month</span>
                </div>
            </div>
        </div>
    )
}

export default ProfileVisitorChartBox
ProfileVisitorChartBox.propTypes = {
    title: PropTypes.string.isRequired,
    dataKey: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    percentage: PropTypes.number.isRequired,
    chartData: PropTypes.array.isRequired
}