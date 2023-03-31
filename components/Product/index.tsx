import React, { FC } from "react";
import { Button } from "../common/Button";
import styles from "./Product.module.css";

type Props = {
  title: string;
  type: string;
  fromDate: string;
  toDate: string;
  price: Array<{ value: number; symbol: string; isDefault: number }>;
};

export const Product: FC<Props> = ({
  title,
  type,
  fromDate,
  toDate,
  price,
}) => {
  return (
    <div className={styles.productsItem}>
      <span className={styles.name}>{title}</span>
      <span className={styles.type}>{type}</span>
      <div className={styles.guarantee}>
        <span>
          from <strong>{fromDate}</strong>
        </span>
        <span>
          to <strong>{toDate}</strong>
        </span>
      </div>
      <div className={styles.price}>
        {price.map(({ value, symbol }, index) => (
          <span key={index}>{`${value} ${symbol}`}</span>
        ))}
      </div>
      <Button>Add to Basket</Button>
    </div>
  );
};
