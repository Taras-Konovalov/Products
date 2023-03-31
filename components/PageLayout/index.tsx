import React, { FC } from "react";
import Head from "next/head";
import styles from "./PageLayout.module.css";
import { Roboto } from "@next/font/google";
import { TopMenu } from "../TopMenu";
import clsx from "clsx";
import { NavigationMenu } from "../NavigationMenu";
import { appRoutes } from "@/utils/routes";
const _ = require("lodash");

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

type Props = {
  title: string;
  content: string;
  children?: React.ReactNode;
};

export const PageLayout: FC<Props> = ({ title, content, children }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={content} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={clsx(roboto.className, styles.wrapper)}>
        <TopMenu />
        <main className={styles.main}>
          <NavigationMenu routes={appRoutes} />
          <div className={styles.content}>{children}</div>
        </main>
      </div>
    </>
  );
};
