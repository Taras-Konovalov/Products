import React, { FC } from "react";
import styles from "./OrdersDetails.module.css";
import { CloseButton } from "react-bootstrap";
import { Products } from "@/utils/products";

type Props = {
  orders: Products[];
  onClose: () => void;
};

export const OrdersDetails: FC<Props> = ({ orders, onClose }) => {
  return (
    <div className={styles.details}>
      <div className={styles.detailsHeader}>
        <h4>Order Details</h4>
        <CloseButton onClick={onClose} />
      </div>
      <div className={styles.orderItems}>
        {orders.map(({ title, id, photo }) => (
          <div key={id} className={styles.item}>
            <div className={styles.img}>{photo}</div>
            <span>{title}</span>
            <span>free</span>
          </div>
        ))}
      </div>
    </div>
  );
};
