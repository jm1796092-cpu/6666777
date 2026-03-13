"use client";

import { useState } from "react";

export default function TestPage() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen bg-white p-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        测试页面
      </h1>
      <p className="text-gray-600 mb-4">
        如果这个页面能正常显示，说明代码本身没有问题
      </p>
      <button
        onClick={() => setCount(count + 1)}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg"
      >
        点击计数：{count}
      </button>
      <p className="text-gray-600 mt-4">
        当前计数：{count}
      </p>
    </div>
  );
}
