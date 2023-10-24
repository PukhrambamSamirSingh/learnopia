import { PieChart, Cell, Pie, ResponsiveContainer, Tooltip } from 'recharts';

const PieChartBox = () => {
    const data = [
        { name: 'Gymnasium', value: 12 },
        { name: 'Education', value: 21 },
        { name: 'Programming', value: 26 },
        { name: 'Travelling', value: 4 },
    ];

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    return (
        <div className='w-full h-full flex flex-col justify-between'>
            <h1 className='text-xl font-bold'>Posts types by %</h1>
            <div className='w-full h-full flex justify-center'>
                <ResponsiveContainer width="99%" height={300}>
                    <PieChart>
                        <Tooltip
                            contentStyle={{ background: 'none' }}
                        />
                        <Pie
                            data={data}
                            innerRadius={60}
                            outerRadius={80}
                            fill="#8884d8"
                            paddingAngle={2}
                            dataKey="value"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
            </div>
            <ul className='grid grid-cols-2'>
                {data.map((entry, index) => (
                    <li key={index} className='text-sm text-gray-700'>
                        <span className='inline-block w-3 h-3 mr-1 rounded-full' style={{ backgroundColor: COLORS[index % COLORS.length] }}></span>
                        {entry.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PieChartBox;
