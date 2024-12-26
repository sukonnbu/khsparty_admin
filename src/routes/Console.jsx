import { useEffect, useState } from "react";
import { db, getUidByEmail } from "../utils/firebase";
import { onValue, ref, update } from "firebase/database";
import { useParams } from "react-router";

export default function Console() {
  const { code } = useParams();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const query = ref(db);
    return onValue(query, (snapshot) => {
      console.log("주문 접수됨");
      if (snapshot.exists()) {
        const data = snapshot.val();
        Object.values(data).forEach((user) => {
          Object.values(user.cartlist).forEach((order) => {
            if (order.booth_code === code && order.order_status === 1) {
              const order_data = {
                username: user.username,
                email: user.email,
                ...order,
              };
              // 주문 처리
              setOrders((orders) => [order_data, ...orders]);
              const updates = user.cartlist.map((order) => {
                if (order.booth_code === code)
                  return {
                    booth_code: code,
                    orders: order.orders,
                    totalprice: order.totalprice,
                    order_status: 2,
                  };
                else return order;
              });
              return update(
                ref(db, "/" + getUidByEmail(order.email) + "/cartlist"),
                updates,
              );
            }
          });
        });
      }
    });
  });
  return (
    <div>
      {orders.map((order) => (
        <span>{order.username}</span>
      ))}
    </div>
  );
}
