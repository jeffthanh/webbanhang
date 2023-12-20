import React, { useState, useEffect } from "react";
import axios from "axios";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";
import { formathMoney } from 'ultils/fn';

const Charttable = () => {
  const [completedOrders, setCompletedOrders] = useState([]);
  const [productList, setProductList] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [dateList, setDateList] = useState([]);
  const [totalOrdersDaily, setTotalOrdersDaily] = useState(0);
  const [totalOrdersMonthly, setTotalOrdersMonthly] = useState(0);
  const [totalRevenueMonthly, setTotalRevenueMonthly] = useState(0);
  const [yearList, setYearList] = useState([]); // Added state variable for years
  const [selectedYear, setSelectedYear] = useState(""); // Added state variable for selected year
  const [cancelledOrders, setCancelledOrders] = useState(0);
  const [successfulOrders, setSuccessfulOrders] = useState(0);
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const fetchCompletedOrders = async () => {
      try {
        const localStorageData = window.localStorage.getItem(
          "persist:shop/user"
        );
        const { token } = JSON.parse(localStorageData);
        const tokenWithQuotes = token;
        const tokenWithoutQuotes = tokenWithQuotes.substring(
          1,
          tokenWithQuotes.length - 1
        );

        const response = await axios.get("http://localhost:5000/order", {
          headers: {
            Authorization: `Bearer ${tokenWithoutQuotes}`,
          },
        });

        const bieudo = response.data;
        const completedOrders = response.data.filter(
          (order) => order.status === "Thành công"
        );
        setCompletedOrders(completedOrders);
        setOrders(bieudo)
        const products = completedOrders.flatMap((order) => order.products);
        const uniqueProducts = Array.from(new Set(products.map((p) => p.name)));
        setProductList(uniqueProducts);

        const uniqueDates = Array.from(
          new Set(completedOrders.map((order) => order.orderDate))
        );

        const uniqueYears = Array.from(
          new Set(
            completedOrders.map((order) =>
              new Date(order.orderDate).getFullYear()
            )
          )
        );

        setDateList(uniqueDates);
        setYearList(uniqueYears);

        if (uniqueDates.length > 0) {
          setSelectedDate(uniqueDates[0]);
        }

        if (uniqueYears.length > 0) {
          setSelectedYear(uniqueYears[0]);
        }
      } catch (error) {
        console.error("Lỗi khi lấy hóa đơn đã hoàn thành:", error);
      }
    };

    fetchCompletedOrders();
  }, []);

  const filteredOrders = completedOrders.filter(
    (order) => new Date(order.orderDate).getFullYear() === selectedYear
  );

  const data = filteredOrders.reduce((acc, order) => {
    order.products.forEach((product) => {
      const productId = product._id;
      const productName = product.name;
      const productQuantity = product.quantity || 1;
      const productRevenue = product.price * productQuantity || 0;

      const existingProduct = acc.find(
        (item) => item.productName === productName
      );

      if (existingProduct) {
        existingProduct.count += productQuantity;
        existingProduct.revenue += productRevenue;
      } else {
        acc.push({
          productId,
          productName,
          count: productQuantity,
          revenue: productRevenue,
        });
      }
    });

    return acc;
  }, []);

  const calculateTotalOrders = () => {
    const totalDaily = completedOrders.reduce((sum, order) => {
      if (order.orderDate === selectedDate) {
        return sum + 1;
      }
      return sum;
    }, 0);
    setTotalOrdersDaily(totalDaily);

    const totalMonthly = completedOrders.reduce((sum, order) => {
      if (
        new Date(order.orderDate).getMonth() ===
        new Date().getMonth()
      ) {
        return sum + 1;
      }
      return sum;
    }, 0);
    setTotalOrdersMonthly(totalMonthly);
  };

  useEffect(() => {
    calculateTotalOrders();
  }, [completedOrders, selectedDate]);

  const calculateTotalRevenue = () => {
    const total = data.reduce((sum, product) => sum + product.revenue, 0);
    setTotalRevenueMonthly(total);
  };

  useEffect(() => {
    calculateTotalRevenue();
  }, [data]);

  useEffect(() => {
    const calculateCancelledAndSuccessfulOrders = () => {
      const cancelled = orders.reduce((sum, order) => {
        if (order.status === "Đã hủy") {
          return sum + 1;
        }
        return sum;
      }, 0);
      setCancelledOrders(cancelled);

      const successful = orders.reduce((sum, order) => {
        if (order.status === "Thành công") {
          return sum + 1;
        }
        return sum;
      }, 0);
      setSuccessfulOrders(successful);
    };

    calculateCancelledAndSuccessfulOrders();
  }, [completedOrders]);
  const totalOrders = cancelledOrders + successfulOrders;
  const cancelledPercentage = (cancelledOrders / totalOrders) * 100;
  const successfulPercentage = (successfulOrders / totalOrders) * 100;
  return (
    <div className="w-full p-2 mx-auto mt-5">
      <h1 className="h-75px flex justify-center mt-5 items-center font-bold px-4">
        <span>Thống Kê</span>
      </h1>
      <h3 className="text-[25px]">Tổng quan</h3>

      <div className="flex justify-between items-center text-center">
        <div className="flex-1 border h-[90px] flex flex-col bg-gray-200">
          <span className="text-[20px]">Tổng đơn hàng(ngày)</span>
          <span className="text-orange-500 text-[25px]">{totalOrdersDaily}</span>
        </div>
        <div className="flex-1 border h-[90px] flex flex-col bg-gray-200">
          <span className="text-[20px]">Tổng đơn hàng(tháng)</span>
          <span className="text-orange-500 text-[25px]">{totalOrdersMonthly}</span>
        </div>
        <div className="flex-1 border h-[90px] flex flex-col bg-gray-200">
          <span className="text-[20px]">Doanh thu(tháng)</span>
          <span className="text-orange-500 text-[25px]">{`${formathMoney(totalRevenueMonthly)} VNĐ`}</span>
        </div>
      </div>
      <div className="h-[50px]"></div>

      <div>
        <div className="">
          <span className="text-[25px] w-[150px]">Chú thích:</span>
        </div>
        <div className="flex justify-start items-start">

          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={[
                  { name: "Đơn hủy",  value: cancelledPercentage },
                  { name: "Đơn thành công", value: successfulPercentage },
                ]}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label
              >
                {[
                  { name: "Đơn hủy", fill: "#FF6F61" },
                  { name: "Đơn thành công", fill: "#82ca9d" },
                ].map((entry, index) => (
                  <Cell key={`cell${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Legend
                verticalAlign="top"
                align="right"
                content={(props) => {
                  const { payload } = props;
                  return (
                    <ul>
                      {payload.map((entry, index) => (
                        <li key={`legend-${index}`} style={{ color: entry.color }}>
                          {entry.value}
                        </li>
                      ))}
                    </ul>
                  );
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );

};

export default Charttable;
