import { useLocation } from "react-router-dom";
import { correctStyle } from "../helpers/correctStyle";
import { deliveryPercent } from "../helpers/deliveryPercent";
import { formatDate } from "../helpers/formatDate";
import { ReactComponent as Gift } from "../assets/svg/gift.svg";
import "../styles/DeliveryProgress.scss";
import { useState } from "react";
import { useEffect } from "react";

const DeliveryProgress = ({ order }) => {
//   const location = useLocation();
//   let actualDate = new Date().getTime(-10800000);
//   console.log(actualDate)
//   console.log(order)

  const location = useLocation();
  const [actualDate, setActualDate] = useState(new Date().getTime());
  console.log(actualDate)
  console.log(order)
  console.log(order.delivery_date)
    console.log(location)
  useEffect(() => {
    const interval = setInterval(() => {
      setActualDate(new Date().getTime());
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="delivery-progress-container">
      <p
        className={actualDate < order.delivery_date ? "processing" : "delivery-finished"}
      >
        {deliveryPercent(order.delivery_date, order.payment_date).state}
      </p>
      <div className="delivery-container">
        <div className="delivery-inner">
          <div
            className="delivery-bar"
            style={correctStyle(
              order.flash_shipping,
              deliveryPercent(order.delivery_date, order.payment_date).step
            )}
          >
            {order.flash_shipping ? (
              <div className="ship-gradient delivery-pointer"></div>
            ) : (
              <div>
                <Gift className="delivery-pointer" />
              </div>
            )}
            <div className="delivery-pointer-back"></div>
          </div>
        </div>
      </div>
      {/* {location.pathname !== "/profile/orders" && (
        <>
          <p>Dirección de envío:</p>
          <b>{`${order?.shipping_address.street_name} ${order?.shipping_address.street_number}, ${order?.shipping_address.city}, ${order?.shipping_address.state}`}</b>
        </>
      )} */}

      <p className="arrive">
        {" "}
        {actualDate < order.delivery_date ? "Llega el " : "Llegó el "}
        <b>{formatDate(order.delivery_date)}</b>
      </p>
    </div>
  );
};

export default DeliveryProgress;