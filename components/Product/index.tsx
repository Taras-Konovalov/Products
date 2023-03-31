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
import { Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

type Props = {
  product: Products | QuantityProducts;
  isBasket?: boolean;
};

export const Product: FC<Props> = ({ product, isBasket = false }) => {
  const { id, title, type, price, guarantee } = product;

  const [show, setShow] = useState(false);

  let quantity: number | undefined;

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
      <Button onClick={handleEvent}>
        {!isBasket ? "Add to Basket" : "Delete"}
      </Button>
      {isBasket && (
        <Modal
          show={show}
          centered
          onHide={() => setShow(!show)}
          size="lg"
          backdrop="static"
        >
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            <h4>Are you sure you want to delete these items?</h4>
            <div className={styles.modalInfo}>
              <span>{title}</span>
              <div className={styles.quantity}>
                <span>Quantity: </span>
                <span>{quantity}</span>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => setShow(!show)}>Cancel</Button>
            <Button onClick={() => dispatch(removeItemFromBasket(id))}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};
