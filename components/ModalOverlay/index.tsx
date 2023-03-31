import React, { FC, MouseEventHandler } from "react";
import { Button } from "../common/Button";
import { Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./ModalOverlay.module.css";

type Props = {
  show: boolean;
  onHide: () => void;
  onDelete: MouseEventHandler<HTMLButtonElement>;
  title: string;
  quantity: number | undefined;
};

export const ModalOverlay: FC<Props> = ({
  show,
  onHide,
  onDelete,
  title,
  quantity,
}) => {
  return (
    <Modal show={show} centered onHide={onHide} size="lg" backdrop="static">
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
        <Button onClick={onHide}>Cancel</Button>
        <Button onClick={onDelete}>Delete</Button>
      </Modal.Footer>
    </Modal>
  );
};
