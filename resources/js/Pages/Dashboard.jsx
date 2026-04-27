import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { PieChart } from "@mui/x-charts/PieChart";
import { LineChart } from "@mui/x-charts/LineChart";
import Box from "@mui/material/Box";
import useDarkMode from "@/Components/IsDark";
import { useState } from "react";
import { Modal, Box as MuiBox, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function Dashboard({
    orderAmount,
    expenseAmount,
    netIncome,
    pieData,
    lineData,
}) {
    const [openModal, setOpenModal] = useState(null);
    const isDark = useDarkMode();

    const textColor = isDark ? "#E5E7EB" : "#1F2937";
    const gridColor = isDark ? "#374151" : "#E5E7EB";
    const bgColor = isDark ? "#1F2937" : "#FFFFFF";

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="max-w-6xl my-9 mx-auto bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                                    Today’s Report
                                </h2>
                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                    {new Date().toDateString()}
                                </span>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div className="flex flex-col items-center justify-center bg-blue-500 text-white rounded-lg py-4 shadow">
                                    <p className="text-sm font-medium">
                                        Total Orders
                                    </p>
                                    <p className="text-2xl font-bold">
                                        ₱{orderAmount.toLocaleString()}
                                    </p>
                                </div>

                                <div className="flex flex-col items-center justify-center bg-yellow-600 text-white rounded-lg py-4 shadow">
                                    <p className="text-sm font-medium">
                                        Total Expenses
                                    </p>
                                    <p className="text-2xl font-bold">
                                        ₱{expenseAmount.toLocaleString()}
                                    </p>
                                </div>

                                <div className="flex flex-col items-center justify-center bg-green-500 text-white rounded-lg py-4 shadow">
                                    <p className="text-sm font-medium">
                                        Net Income
                                    </p>
                                    <p className="text-2xl font-bold">
                                        ₱{netIncome.toLocaleString()}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Charts */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
                            <div
                                onClick={() => setOpenModal("pie")}
                                className="cursor-pointer bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg p-8 flex flex-col items-center hover:shadow-xl hover:scale-[1.01] transition-all duration-200"
                            >
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-6 text-center">
                                    💰 Expenses by Label
                                </h3>

                                <Box
                                    sx={{
                                        width: "100%",
                                        maxWidth: 320,
                                        height: 280,
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                    }}
                                >
                                    <Box
                                        sx={{
                                            width: "100%",
                                            flex: "0 0 auto",
                                            display: "flex",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <PieChart
                                            series={[
                                                {
                                                    data: pieData,
                                                    label: { visible: false },
                                                    cornerRadius: 5,
                                                },
                                            ]}
                                            width={280}
                                            height={180}
                                            sx={{
                                                backgroundColor: bgColor,
                                                "& .MuiChartsLegend-root": {
                                                    display: "none",
                                                },
                                                "& .MuiChartsLabel-root": {
                                                    display: "none",
                                                },
                                            }}
                                        />
                                    </Box>

                                    <div
                                        className="w-full mt-4 px-2"
                                        style={{
                                            maxHeight: 90,
                                            overflowY: "auto",
                                            paddingRight: 8,
                                        }}
                                    >
                                        {pieData.map((slice, i) => {
                                            const color =
                                                slice.color ||
                                                (slice[2] ? slice[2] : null) ||
                                                "#BBBBBB";
                                            const label =
                                                slice.label ??
                                                slice.name ??
                                                `Item ${i + 1}`;
                                            const value =
                                                slice.value ??
                                                slice.y ??
                                                slice[1] ??
                                                "";
                                            return (
                                                <div
                                                    key={i}
                                                    className="flex items-start gap-3 py-1.5"
                                                >
                                                    <div
                                                        style={{
                                                            width: 12,
                                                            height: 12,
                                                            borderRadius: 6,
                                                            background: color,
                                                            marginTop: 3,
                                                            flex: "0 0 12px",
                                                            boxShadow: `0 0 8px ${color}40`,
                                                        }}
                                                    />
                                                    <div
                                                        className="truncate flex-1"
                                                        style={{
                                                            fontSize: 13,
                                                            lineHeight: "16px",
                                                            color: textColor,
                                                        }}
                                                    >
                                                        <div
                                                            style={{
                                                                whiteSpace:
                                                                    "nowrap",
                                                                overflow:
                                                                    "hidden",
                                                                textOverflow:
                                                                    "ellipsis",
                                                                fontWeight: 500,
                                                            }}
                                                        >
                                                            {label}
                                                        </div>
                                                        {value !== "" && (
                                                            <div
                                                                style={{
                                                                    fontSize: 12,
                                                                    opacity: 0.75,
                                                                    marginTop: 2,
                                                                }}
                                                            >
                                                                ₱
                                                                {Number(
                                                                    value,
                                                                ).toLocaleString()}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </Box>

                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
                                    Click to expand
                                </p>
                            </div>

                            {/* Line Chart */}
                            <div
                                onClick={() => setOpenModal("line")}
                                className="cursor-pointer bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg p-8 flex flex-col items-center hover:shadow-xl hover:scale-[1.01] transition-all duration-200"
                            >
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-6 text-center">
                                    📈 Revenue vs Expenses (Last 7 Days)
                                </h3>
                                <Box
                                    sx={{
                                        width: "100%",
                                        maxWidth: 360,
                                        height: 280,
                                    }}
                                >
                                    <LineChart
                                        series={[
                                            {
                                                data: lineData.orders,
                                                label: "Revenue",
                                                color: "#2563eb",
                                                area: true,
                                                showMark: true,
                                                curve: "natural",
                                            },
                                            {
                                                data: lineData.expenses,
                                                label: "Expenses",
                                                color: "#dc2626",
                                                area: true,
                                                showMark: true,
                                                curve: "natural",
                                            },
                                        ]}
                                        xAxis={[
                                            {
                                                scaleType: "point",
                                                data: lineData.labels,
                                                tickLabelStyle: {
                                                    fill: textColor,
                                                    fontSize: 11,
                                                },
                                            },
                                        ]}
                                        yAxis={[
                                            {
                                                tickLabelStyle: {
                                                    fill: textColor,
                                                    fontSize: 11,
                                                },
                                            },
                                        ]}
                                        margin={{
                                            top: 10,
                                            bottom: 30,
                                            left: 60,
                                            right: 10,
                                        }}
                                        sx={{
                                            [`& .MuiChartsAxis-line`]: {
                                                stroke: gridColor,
                                            },
                                            [`& .MuiChartsGrid-line`]: {
                                                stroke: gridColor,
                                            },
                                            [`& .MuiChartsLegend-root`]: {
                                                color: textColor,
                                            },
                                            [`& .MuiChartsLegend-series text`]:
                                                { fill: textColor },
                                        }}
                                    />
                                </Box>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
                                    Click to expand
                                </p>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap justify-center gap-4 mt-12 mb-12">
                            <Link
                                href={route("orders.create")}
                                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                            >
                                ✨ Generate Orders
                            </Link>
                            <Link
                                href={route("reports.index")}
                                className="px-8 py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                            >
                                📊 View Recent Reports
                            </Link>
                            <Link
                                href={route("expenses.create")}
                                className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                            >
                                💳 Generate Expenses
                            </Link>
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
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        bgcolor: bgColor,
                        color: textColor,
                        boxShadow: 24,
                        borderRadius: 2,
                        width: "90%",
                        maxWidth: 900,
                        maxHeight: "90vh",
                        overflowY: "auto",
                        p: 4,
                    }}
                >
                    <div className="flex justify-between items-center mb-6">
                        <Typography
                            id="chart-modal-title"
                            variant="h5"
                            component="h2"
                            sx={{ fontWeight: 700 }}
                        >
                            {openModal === "pie"
                                ? " Detailed Expense Breakdown"
                                : " Revenue vs Expenses (Last 7 Days)"}
                        </Typography>
                        <IconButton
                            onClick={() => setOpenModal(null)}
                            sx={{
                                color: textColor,
                                "&:hover": {
                                    backgroundColor: isDark
                                        ? "#374151"
                                        : "#f3f4f6",
                                },
                            }}
                        >
                            <CloseIcon />
                        </IconButton>
                    </div>

                    {openModal === "pie" && (
                        <div className="flex justify-center py-4">
                            <PieChart
                                series={[
                                    {
                                        data: pieData,
                                        label: { visible: true },
                                        cornerRadius: 5,
                                    },
                                ]}
                                width={Math.min(600, window.innerWidth - 80)}
                                height={450}
                                sx={{
                                    backgroundColor: bgColor,
                                    "& .MuiChartsLabel-root": {
                                        fill: textColor,
                                        fontSize: 14,
                                    },
                                    "& .MuiChartsLegend-root": {
                                        color: textColor,
                                    },
                                    "& .MuiChartsLegend-series text": {
                                        fill: textColor,
                                    },
                                }}
                            />
                        </div>
                    )}

                    {openModal === "line" && (
                        <Box sx={{ width: "100%", height: 450, py: 2 }}>
                            <LineChart
                                series={[
                                    {
                                        data: lineData.orders,
                                        label: "Revenue",
                                        color: "#2563eb",
                                        area: true,
                                        showMark: true,
                                        curve: "natural",
                                    },
                                    {
                                        data: lineData.expenses,
                                        label: "Expenses",
                                        color: "#dc2626",
                                        area: true,
                                        showMark: true,
                                        curve: "natural",
                                    },
                                ]}
                                xAxis={[
                                    {
                                        scaleType: "point",
                                        data: lineData.labels,
                                        tickLabelStyle: {
                                            fill: textColor,
                                            fontSize: 12,
                                        },
                                    },
                                ]}
                                yAxis={[
                                    {
                                        tickLabelStyle: {
                                            fill: textColor,
                                            fontSize: 12,
                                        },
                                    },
                                ]}
                                margin={{
                                    top: 15,
                                    bottom: 40,
                                    left: 80,
                                    right: 20,
                                }}
                                sx={{
                                    [`& .MuiChartsAxis-line`]: {
                                        stroke: gridColor,
                                    },
                                    [`& .MuiChartsGrid-line`]: {
                                        stroke: gridColor,
                                    },
                                    [`& .MuiChartsTooltip-root`]: {
                                        backgroundColor: bgColor,
                                        color: textColor,
                                        border: `1px solid ${gridColor}`,
                                    },
                                    [`& .MuiChartsLegend-root`]: {
                                        color: textColor,
                                    },
                                    [`& .MuiChartsLegend-series text`]: {
                                        fill: textColor,
                                    },
                                }}
                            />
                        </Box>
                    )}
                </MuiBox>
            </Modal>
        </AuthenticatedLayout>
    );
}
