"use client";

import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { config } from "../../config";
import axios from "axios";
import Swal from "sweetalert2";

export default function Page() {
  const [data, setData] = useState<any[]>([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalRepair, setTotalRepair] = useState(0);
  const [totalSale, setTotalSale] = useState(0);

  useEffect(() => {
    fetchData();
    renderChart();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${config.apiUrl}/sell/dashboard`);
      setTotalIncome(response.data.totalIncome);
      setTotalRepair(response.data.totalRepair);
      setTotalSale(response.data.totalSale);
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "ผิดพลาด",
        text: error.message,
      });
    }
  };

  const renderChart = () => {
    const months = [
      "มกราคม",
      "กุมภาพันธ์",
      "มีนาคม",
      "เมษายน",
      "พฤษภาคม",
      "มิถุนายน",
      "กรกฎาคม",
      "สิงหาคม",
      "กันยายน",
      "ตุลาคม",
      "พฤศจิกายน",
      "ธันวาคม",
    ];

    const data = months.map((month, index) => ({
      name: month,
      income: Math.floor(Math.random() * 10000),
    }));

    setData(data);
  };

  const box = (color: string, title: string, value: string) => {
    return (
      <div className={`flex flex-col gap-4 items-end w-full ${color} p-4 rounded-lg text-white`}>
        <div className="text-2xl font-bold">{title}</div>
        <div className="text-4xl font-bold">{value}</div>
      </div>
    );
  };

  return (
    <div>
      <h1 className="content-header">Dashboard</h1>
      <div className="flex gap-4">
        {box("bg-purple-500", "ยอดขายทั้งหมด", (totalIncome ?? 0).toLocaleString() + " บาท")}
        {box("bg-orange-500", "งานรับซ่อม", (totalRepair ?? 0).toLocaleString() + " งาน")}
        {box("bg-blue-500", "รายการขาย", (totalSale ?? 0).toLocaleString() + " รายการ")}
      </div>
      <div className="text-center mb-4 mt-5 text-xl font-bold">รายได้แต่ละเดือน</div>
      <div style={{ width: "100%", height: 400 }}>
        <ResponsiveContainer>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip formatter={(value: number) => `รายได้ ${value.toLocaleString()} บาท`} />
            <Legend />
            <Bar dataKey="income" fill="teal" opacity={0.5} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
