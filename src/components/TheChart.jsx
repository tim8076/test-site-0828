import { useEffect, useRef } from "react";
import c3 from "c3";
import "c3/c3.css"; // 引入 C3 的 CSS

export default function TheChart({ categoryData, data }) {
  const chartRef = useRef(null);
  const types = [categoryData.map(item => item[0])];
  const months = data.map(item => item['年月'])
  useEffect(() => {
    // 初始化圖表
    const chart = c3.generate({
      bindto: chartRef.current,
      data: {
        columns: categoryData,
        type: "bar",
        groups: types
      },
      axis: {
        x: {
          type: "category",
          categories: months
        },
      },
    });

    // 清理圖表
    return () => {
      chart.destroy();
    };
  }, [categoryData]);

  return <div ref={chartRef}></div>;
}
