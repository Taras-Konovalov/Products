import React, { FC, useMemo, useState } from "react";
import { PageLayout } from "@/components/PageLayout";
import { useSelector } from "react-redux";
import { Product } from "@/components/Product";
import { Products } from "@/utils/products";
import styles from "../../styles/pages/orders.module.css";
import { OrdersDetails } from "@/components/OrdersDetails";

const Orders: FC = () => {
  const products = useSelector((state: any) => state.products.basket);

  const [showDetails, setShowDetails] = useState(false);
  const [productId, setProductId] = useState<number | null>(null);

  const handleShowDetails = (id: number) => {
    setShowDetails(true);
    setProductId(id);
  };

  const handleHideDetails = () => {
    setShowDetails(false);
  };

  const findProduct = useMemo(() => {
    return products.find(
      (product: Products) => product.id === productId
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  const allProductsInOrder = Array.from(
    { length: findProduct?.quantity },
    () => ({
      ...findProduct,
    })
  );

  return (
    <PageLayout title="Orders" content="">
      <div className={styles.ordersWrapper}>
        {products.length ? (
          <>
            <div className={styles.orders}>
              {products.map((product: Products) => (
                <Product
                  key={product.id}
                  product={product}
                  onShowDetails={() => handleShowDetails(product.id)}
                  onHideDetails={handleHideDetails}
                  isBasket
                />
              ))}
            </div>
            {showDetails && (
              <OrdersDetails
                orders={allProductsInOrder}
                onClose={() => setShowDetails(false)}
              />
            )}
          </>
        ) : (
          <h3>No orders</h3>
        )}
      </div>
    </PageLayout>
  );
};

export default Orders;
