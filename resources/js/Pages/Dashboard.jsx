import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { PieChart } from '@mui/x-charts/PieChart';
import { LineChart } from '@mui/x-charts/LineChart';
import Box from '@mui/material/Box';
import useDarkMode from '@/Components/IsDark';
import { useState } from 'react';
import { Modal, Box as MuiBox, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export default function Dashboard({ orderAmount, expenseAmount, netIncome, pieData, lineData }) {
    const [openModal, setOpenModal] = useState(null);
    const isDark = useDarkMode();

    const textColor = isDark ? '#E5E7EB' : '#1F2937';
    const gridColor = isDark ? '#374151' : '#E5E7EB';
    const bgColor = isDark ? '#1F2937' : '#FFFFFF';

    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="max-w-6xl my-9 mx-auto bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">Today’s Report</h2>
                                <span className="text-sm text-gray-500 dark:text-gray-400">{new Date().toDateString()}</span>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div className="flex flex-col items-center justify-center bg-blue-500 text-white rounded-lg py-4 shadow">
                                    <p className="text-sm font-medium">Total Orders</p>
                                    <p className="text-2xl font-bold">₱{orderAmount.toLocaleString()}</p>
                                </div>

                                <div className="flex flex-col items-center justify-center bg-yellow-600 text-white rounded-lg py-4 shadow">
                                    <p className="text-sm font-medium">Total Expenses</p>
                                    <p className="text-2xl font-bold">₱{expenseAmount.toLocaleString()}</p>
                                </div>

                                <div className="flex flex-col items-center justify-center bg-green-500 text-white rounded-lg py-4 shadow">
                                    <p className="text-sm font-medium">Net Income</p>
                                    <p className="text-2xl font-bold">₱{netIncome.toLocaleString()}</p>
                                </div>
                            </div>
                        </div>

                        {/* Charts */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div
                                onClick={() => setOpenModal('pie')}
                                className="cursor-pointer bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow p-6 flex flex-col items-center mx-8 hover:scale-[1.02] transition-transform"
                            >
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
                                    Expenses by Label
                                </h3>

                                <Box sx={{ width: '100%', maxWidth: 280, height: 220, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <Box sx={{ width: '100%', flex: '0 0 auto', display: 'flex', justifyContent: 'center' }}>
                                        <PieChart
                                            series={[{ data: pieData, label: { visible: false } }]}
                                            width={220}
                                            height={130}
                                            sx={{
                                                backgroundColor: bgColor,
                                                '& .MuiChartsLegend-root': { display: 'none' },
                                                '& .MuiChartsLabel-root': { display: 'none' },
                                            }}
                                        />
                                    </Box>

                                    <div
                                        className="w-full mt-2"
                                        style={{
                                            maxHeight: 68,     
                                            overflowY: 'auto',
                                            paddingRight: 6,
                                        }}
                                    >
                                        {pieData.map((slice, i) => {
                                            const color = slice.color || (slice[2] ? slice[2] : null) || '#BBBBBB';
                                            const label = slice.label ?? slice.name ?? `Item ${i + 1}`;
                                            const value = slice.value ?? slice.y ?? slice[1] ?? '';
                                            return (
                                                <div key={i} className="flex items-start gap-3 py-1">
                                                    <div style={{
                                                        width: 10,
                                                        height: 10,
                                                        borderRadius: 6,
                                                        background: color,
                                                        marginTop: 4,
                                                        flex: '0 0 10px'
                                                    }} />
                                                    <div className="truncate" style={{ fontSize: 12, lineHeight: '14px', color: textColor }}>
                                                        <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{label}</div>
                                                        {value !== '' && <div style={{ fontSize: 11, opacity: 0.8 }}>₱{Number(value).toLocaleString()}</div>}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </Box>

                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                                    Click to view detailed charts
                                </p>
                            </div>

                            {/* Line Chart */}
                            <div
                                onClick={() => setOpenModal('line')}
                                className="cursor-pointer bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow p-6 flex flex-col items-center mx-8 hover:scale-[1.02] transition-transform"
                            >
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
                                    Revenue vs Expenses (Last 7 Days)
                                </h3>
                                <Box sx={{ width: '100%', maxWidth: 280, height: 220 }}>
                                    <LineChart
                                        series={[
                                            { data: lineData.orders, label: 'Revenue', color: '#2563eb', area: true, showMark: false },
                                            { data: lineData.expenses, label: 'Expenses', color: '#dc2626', area: true, showMark: false },
                                        ]}
                                        xAxis={[{
                                            scaleType: 'point',
                                            data: lineData.labels,
                                            tickLabelStyle: { fill: textColor, fontSize: 10 },
                                        }]}
                                        yAxis={[{ tickLabelStyle: { fill: textColor, fontSize: 10 } }]}
                                        sx={{
                                            [`& .MuiChartsAxis-line`]: { stroke: gridColor },
                                            [`& .MuiChartsGrid-line`]: { stroke: gridColor },
                                            [`& .MuiChartsLegend-root`]: { color: textColor },
                                        }}
                                    />
                                </Box>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                                    Click to view detailed charts
                                </p>
                            </div>
                        </div>


                        {/* Action Buttons */}
                        <div className="flex flex-wrap justify-between gap-4 mt-8 mx-6 mb-10">
                            <Link href={route('orders.create')} className="flex-1 min-w-[200px] text-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-base font-semibold rounded-lg shadow transition duration-150">Generate Orders</Link>
                            <Link href={route('reports.index')} className="flex-1 min-w-[200px] text-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white text-base font-semibold rounded-lg shadow transition duration-150">View Recent Reports</Link>
                            <Link href={route('expenses.create')} className="flex-1 min-w-[200px] text-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-base font-semibold rounded-lg shadow transition duration-150">Generate Expenses</Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Chart Modal */}
            <Modal
                open={Boolean(openModal)}
                onClose={() => setOpenModal(null)}
                aria-labelledby="chart-modal-title"
            >
                <MuiBox
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        bgcolor: bgColor,
                        color: textColor,
                        boxShadow: 24,
                        borderRadius: 2,
                        width: '90%',
                        maxWidth: 900,
                        maxHeight: '90vh',
                        overflowY: 'auto',
                        p: 4,
                    }}
                >
                    <div className="flex justify-between items-center mb-4">
                        <Typography id="chart-modal-title" variant="h6" component="h2">
                            {openModal === 'pie' ? 'Detailed Expense Breakdown' : 'Revenue vs Expenses (Last 7 Days)'}
                        </Typography>
                        <IconButton onClick={() => setOpenModal(null)} sx={{ color: textColor }}>
                            <CloseIcon />
                        </IconButton>
                    </div>

                    {openModal === 'pie' && (
                        <div className="flex justify-center">
                            <PieChart
                                series={[{ data: pieData, label: { visible: true } }]}
                                width={500}
                                height={400}
                                sx={{
                                    backgroundColor: bgColor,
                                    '& .MuiChartsLabel-root': { fill: textColor },
                                    '& .MuiChartsLegend-root': { color: textColor },
                                }}
                            />
                        </div>
                    )}

                    {openModal === 'line' && (
                        <Box sx={{ width: '100%', height: 400 }}>
                            <LineChart
                                series={[
                                    { data: lineData.orders, label: 'Revenue', color: '#2563eb', area: true, showMark: false },
                                    { data: lineData.expenses, label: 'Expenses', color: '#dc2626', area: true, showMark: false },
                                ]}
                                xAxis={[{
                                    scaleType: 'point',
                                    data: lineData.labels,
                                    tickLabelStyle: { fill: textColor },
                                }]}
                                yAxis={[{ tickLabelStyle: { fill: textColor } }]}
                                sx={{
                                    [`& .MuiChartsAxis-line`]: { stroke: gridColor },
                                    [`& .MuiChartsGrid-line`]: { stroke: gridColor },
                                    [`& .MuiChartsTooltip-root`]: { backgroundColor: bgColor, color: textColor },
                                    [`& .MuiChartsLegend-root`]: { color: textColor },
                                    [`& .MuiChartsLegend-series text`]: { fill: textColor },
                                }}
                            />
                        </Box>
                    )}
                </MuiBox>
            </Modal>

        </AuthenticatedLayout>
    );
}
