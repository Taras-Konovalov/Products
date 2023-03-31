import React, { FC } from "react";
import { PageLayout } from "@/components/PageLayout";
import { useSelector } from "react-redux";
import { Product } from "@/components/Product";
import { QuantityProducts } from "@/store";
import styles from "../../styles/pages/orders.module.css";

const Orders: FC = () => {
  const products = useSelector((state: any) => state.products.basket);

  return (
    <PageLayout title="Orders" content="">
      <div className={styles.orders}>
        {products.map((product: QuantityProducts) => (
          <Product key={product.id} product={product} isBasket />
        ))}
      </div>
    </PageLayout>
  );
};

export default Orders;
