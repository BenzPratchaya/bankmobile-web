"use client";

import { useEffect, useState } from "react";
import { config } from "@/app/config";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import dayjs from "dayjs";

export default function Page() {
  // รับค่า id จาก query string
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [sell, setSell] = useState<any>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await axios.get(`${config.apiUrl}/sell/info/${id}`);
    setSell(response.data);
    printDocument();
  };

  const printDocument = () => {
    // เพิ่ม CSS rules สําหรับการพิมพ์
    const style = document.createElement("style");
    style.textContent = `
   @media print {
        body * {
            visibility: hidden;
        }
        #print-content,
        #print-content * {
            visibility: visible;
        }
        #print-content {
            position: absolute;
            left: 0;
            top: 0;
            width: 80mm; // 80mm
            height: 100%;
        }
        .content-header {
            display: none;
        }
    }
    `;
    document.head.appendChild(style);
    // print
    setTimeout(() => {
      window.print();
    }, 300);
  };

  return (
    <div>
      <div className="content-header flex justify-between">
        <div>พิมพ์บิล</div>
        <div>
          <button className="btn btn-primary text-xl" onClick={printDocument}>
            พิมพ์บิล
          </button>
        </div>
      </div>
      <div id="print-content">
        <div className="text-2xl font-bold text-center">ใบเสร็จรับเงิน</div>
        <div className="text-left">วันที่ {dayjs(sell?.payDate).format("DD/MM/YYYY")}</div>
        <div className="text-left">รายการ: {sell?.product.name}</div>
        <div className="text-left">ราคา: {sell?.price.toLocaleString()}</div>
        <div className="text-left">วันที่ออกบิล: {dayjs(sell?.payDate).format("DD/MM/YYYY")}</div>
      </div>
    </div>
  );
}
