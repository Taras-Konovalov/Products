import React, { FC } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import clsx from "clsx";
import styles from "./NavigationMenu.module.css";

type Props = {
  routes: Array<{ path: string; name: string }>;
};

export const NavigationMenu: FC<Props> = ({ routes }) => {
  const { pathname } = useRouter();
  return (
    <nav className={styles.navigation}>
      <div>
        {routes.map(({ path, name }) => (
          <Link
            key={name}
            href={path}
            className={clsx(styles.link, pathname === path && styles.activLink)}
          >
            {name}
          </Link>
        ))}
      </div>
    </nav>
  );
};
