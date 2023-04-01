import React, { FC, useState } from "react";
import { Button } from "../common/Button";
import styles from "./Product.module.css";
import { Products } from "@/utils/products";
import moment from "moment";
import { useDispatch } from "react-redux";
import {
  addItemToBasket,
  QuantityProducts,
  removeItemFromBasket,
} from "@/store";
import { ModalOverlay } from "../ModalOverlay";
import Image from "next/image";

type Props = {
  product: Products | QuantityProducts;
  isBasket?: boolean;
  onShowDetails?: () => void;
  onHideDetails?: () => void;
};

export const Product: FC<Props> = ({
  product,
  isBasket = false,
  onShowDetails,
  onHideDetails,
}) => {
  const { id, title, type, price, guarantee } = product;

  const [show, setShow] = useState(false);

  let quantity: number | undefined;

  let dateOfСreation: string | undefined;

  if ("dateOfСreation" in product) {
    dateOfСreation = product.dateOfСreation;
  }

  if ("quantity" in product) {
    quantity = product.quantity;
  }

  const fromDate = moment(guarantee.start, "YYYY-MM-DD HH:mm:ss").format(
    "MM/DD/YY"
  );
  const toDate = moment(guarantee.end, "YYYY-MM-DD HH:mm:ss").format(
    "MM/DD/YY"
  );

  const dispatch = useDispatch();

  const handleEvent = !isBasket
    ? () => dispatch(addItemToBasket(product))
    : () => setShow(!show);

  const deleteProduct = () => {
    dispatch(removeItemFromBasket(id));
    if (onHideDetails) {
      onHideDetails();
    }
  };

  return (
    <div className={styles.productsItem}>
      <span className={styles.name}>{title}</span>
      {!isBasket ? (
        <span className={styles.type}>{type}</span>
      ) : (
        <div className={styles.quantity}>
          <span>Quantity: </span>
          <span>{quantity}</span>
        </div>
      )}
      {isBasket && (
        <div className={styles.dateOfСreation}>
          <span>{moment(dateOfСreation).format("MM/DD")}</span>
          <span>{moment(dateOfСreation).format("DD/MMM/YYYY")}</span>
        </div>
      )}
      {!isBasket && (
        <div className={styles.guarantee}>
          <span>
            from <strong>{fromDate}</strong>
          </span>
          <span>
            to <strong>{toDate}</strong>
          </span>
        </div>
      )}
      <div className={styles.price}>
        {price.map(({ value, symbol }, index) => (
          <span key={index}>{`${value} ${symbol}`}</span>
        ))}
      </div>
      {isBasket && (
        <div className={styles.totalPrice}>
          <span>Total: </span>
          <div className={styles.currency}>
            <span>{`${price[0].value * (quantity || 1)} USD`}</span>
            <span>{`${price[1].value * (quantity || 1)} UAH`}</span>
          </div>
        </div>
      )}
      <Button onClick={handleEvent}>
        {!isBasket ? "Add to Basket" : "Delete"}
      </Button>
      {isBasket && (
        <button className={styles.details} onClick={onShowDetails}>
          <Image src="/icons/arrow.svg" alt="arrow" width={20} height={20} />
        </button>
      )}
      {isBasket && (
        <ModalOverlay
          show={show}
          onHide={() => setShow(!show)}
          onDelete={deleteProduct}
          title={title}
          quantity={quantity}
        />
      )}
    </div>
  );
};
