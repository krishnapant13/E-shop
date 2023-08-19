import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersOfShop } from "../../redux/actions/order";
import styles from "../../styles/styles";

const WithdrawMoney = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.order);
  const { seller } = useSelector((state) => state.seller);
  const [delivered, setDelivered] = useState(null);
  useEffect(() => {
    dispatch(getAllOrdersOfShop(seller._id));
    const orderData =
      orders && orders.filter((item) => item.status === "Delivered");
    setDelivered(orderData);
  }, [dispatch]);

  const totalEarningWithoutTax =
    delivered && delivered.reduce((acc, item) => acc + item.totalPrice, 0);

  const serviceCharge = totalEarningWithoutTax * 0.1;
  const availableBalance = totalEarningWithoutTax - serviceCharge.toFixed(2);
  return (
    <div className="w-full h-[90vh] px-5 pb-5">
      <div className="w-full bg-white h-full rounded flex items-center justify-center flex-col ">
        <h5 className="pt-2  pl-1 text-[20px] font-[500]">
          Available Balance : ₹ {availableBalance}
        </h5>
        <div
          className={`${styles.button} !rounded-[4px]  bg-gradient-to-r
            from-blue-900
            via-purple
            to-black text-white`}
        >
          {" "}
          Withdraw Money
        </div>
      </div>
    </div>
  );
};

export default WithdrawMoney;
