import { usePathname } from "next/navigation";
import Link from "next/link";
import styles from "./sidebar.module.css";
import classNames from "classnames";

const navItems = {
  "/": {
    name: "home",
  },
  "/about": {
    name: "about",
  },
  "/blog": {
    name: "blog",
  },
  "/create-post": {
    name: "create post",
  },
  "/login": {
    name: "login",
  },
};

export default function Navbar() {
  let pathname = usePathname() || "/";
  if (pathname.includes("/blog/")) {
    pathname = "/blog";
  }

  return (
    <aside className={styles.container}>
      <div className={styles.sticky}>
        <nav className={styles.navigation} id="nav">
          <div className={styles.navigationItemWrapper}>
            {Object.entries(navItems).map(([path, { name }]) => {
              const isActive = path === pathname;
              return (
                <Link
                  key={path}
                  href={path}
                  className={classNames(styles.navigationItem, {
                    [styles.textNeutral]: !isActive,
                    [styles.fontBold]: isActive,
                  })}
                >
                  <span className={styles.linkName}>{name}</span>
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </aside>
  );
}
