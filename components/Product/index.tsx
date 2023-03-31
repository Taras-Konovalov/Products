import React, { FC } from "react";
import { Button } from "../common/Button";
import styles from "./Product.module.css";
import { Products } from "@/utils/products";
import moment from "moment";
import { useDispatch } from "react-redux";
import { addItemToBasket } from "@/store";

type Props = {
  product: Products;
};

export const Product: FC<Props> = ({ product }) => {
  const { title, type, price, guarantee } = product;

  const fromDate = moment(guarantee.start, "YYYY-MM-DD HH:mm:ss").format(
    "MM/DD/YY"
  );
  const toDate = moment(guarantee.end, "YYYY-MM-DD HH:mm:ss").format(
    "MM/DD/YY"
  );

  const dispatch = useDispatch();

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
      <Button onClick={() => dispatch(addItemToBasket(product))}>
        Add to Basket
      </Button>
    </div>
  );
};
