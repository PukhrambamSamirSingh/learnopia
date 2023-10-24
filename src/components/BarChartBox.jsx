import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const BarChartBox = () => {
    const data = [
        {
            name: 'Jan',
            followers: 45,
            followings: 76
        },
        {
            name: 'Feb',
            followers: 89,
            followings: 120
        },
        {
            name: 'Mar',
            followers: 123,
            followings: 129
        },
        {
            name: 'Apr',
            followers: 145,
            followings: 149
        },
        {
            name: 'May',
            followers: 178,
            followings: 191
        },
        {
            name: 'Jun',
            followers: 179,
            followings: 202
        },
        {
            name: 'Jul',
            followers: 179,
            followings: 209
        },
        {
            name: 'Aug',
            followers: 165,
            followings: 206
        },
        {
            name: 'Sept',
            followers: 0,
            followings: 0
        },
        {
            name: 'Oct',
            followers: 0,
            followings: 0
        },
        {
            name: 'Nov',
            followers: 0,
            followings: 0
        },
        {
            name: 'Dec',
            followers: 0,
            followings: 0,
        },

    ];
    return (
        <div className='w-full h-full flex flex-col justify-between'>
            <h1 className='text-xl font-bold'>Followings and followers ({new Date().getFullYear()})</h1>

            <div className='w-full'>
                <ResponsiveContainer width="99%" height={300}>
                    <BarChart
                        width={500}
                        height={300}
                        data={data}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip
                            contentStyle={{ background: "black" }}
                            cursor={{ fill: "none" }}
                        />
                        <Legend />
                        <Bar dataKey="followings" fill="#8884d8" />
                        <Bar dataKey="followers" fill="#82ca9d" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export default BarChartBox
