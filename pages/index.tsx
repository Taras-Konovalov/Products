import React, { FC, useState } from "react";
import { PageLayout } from "@/components/PageLayout";
import styles from "../styles/pages/products.module.css";
import { products, Products } from "@/utils/products";
import moment from "moment";
import { Product } from "@/components/Product";
import { Select } from "@/components/Select";

const options = [
  { label: "All", value: "" },
  { label: "Monitors", value: "monitors" },
  { label: "Phone", value: "phone" },
  { label: "Keyboard", value: "keyboard" },
  { label: "Laptop", value: "laptop" },
  { label: "TV", value: "tv" },
];

const applyFilter = (value: string, products: Products[]) => {
  return products.filter((product) => {
    if (!value) {
      return true;
    } else {
      return product.type.toLowerCase() === value;
    }
  });
};

const Products: FC = () => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleChangeSelect = (value: string) => {
    setSelectedOption(value);
  };

  const filtredProducts = applyFilter(selectedOption, products);

  return (
    <PageLayout title="Products" content="">
      <section className={styles.products}>
        <div className={styles.selectType}>
          <span>Type :</span>
          <Select
            options={options}
            value={selectedOption}
            onSelect={handleChangeSelect}
          />
        </div>
        <div className={styles.productsContainer}>
          {filtredProducts.map(({ id, title, type, guarantee, price }) => {
            const fromDate = moment(
              guarantee.start,
              "YYYY-MM-DD HH:mm:ss"
            ).format("MM/DD/YY");
            const toDate = moment(guarantee.end, "YYYY-MM-DD HH:mm:ss").format(
              "MM/DD/YY"
            );
            return (
              <Product
                key={id}
                title={title}
                type={type}
                fromDate={fromDate}
                toDate={toDate}
                price={price}
              />
            );
          })}
        </div>
      </section>
    </PageLayout>
  );
};

export default Products;
