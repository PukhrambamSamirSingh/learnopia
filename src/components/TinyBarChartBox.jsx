import { BarChart, Bar, Tooltip, ResponsiveContainer, XAxis } from 'recharts';

const TinyBarChartBox = () => {
    const data = [
        {
            name: 'Jan',
            uv: 4000,
            pv: 2400
        },
        {
            name: 'Feb',
            uv: 3000,
            pv: 1398
        },
        {
            name: 'Mar',
            uv: 2000,
            pv: 9800
        },
        {
            name: 'Apr',
            uv: 2780,
            pv: 3908
        },
        {
            name: 'May',
            uv: 1890,
            pv: 4800
        },
        {
            name: 'Jun',
            uv: 2390,
            pv: 3800
        },
        {
            name: 'Jul',
            uv: 3490,
            pv: 4300
        },
        {
            name: 'Aug',
            uv: 3490,
            pv: 4300
        },
        {
            name: 'Sep',
            uv: 0,
            pv: 0
        },
        {
            name: 'Oct',
            uv: 0,
            pv: 0
        },
        {
            name: 'Nov',
            uv: 0,
            pv: 0
        },
        {
            name: 'Dec',
            uv: 0,
            pv: 0
        }
    ];

    return (
        <div className='w-full h-full flex flex-col justify-between'>
            <h1 className='text-lg font-bold'>Visits for all posts per month</h1>
            <div>
                <ResponsiveContainer width="99%" height={140}>
                    <BarChart data={data}>
                        <Tooltip
                            contentStyle={{ background: "black" }}
                            cursor={{ fill: "none" }}
                        />
                        <XAxis dataKey="name" />
                        <Bar dataKey="uv" fill="#8884d8" />
                        <Bar dataKey="pv" fill='cyan' />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export default TinyBarChartBox
