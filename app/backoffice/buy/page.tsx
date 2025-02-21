"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { config } from "@/app/config";
import Swal from "sweetalert2";

export default function Page() {
  return (
    <>
      <h1 className="content-header">รายการซื้อ</h1>

      <div>
        <button className="btn">
          <i className="fa-solid fa-plus mr-2"></i>
          เพิ่มรายการ
        </button>
      </div>
    </>
  );
}
