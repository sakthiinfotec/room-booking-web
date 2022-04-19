import styles from "./ComponentStyles.module.css";

export function TitleSection({ title, children }: { title: string; children?: JSX.Element }) {
  return (
    <div className={styles.headerWrapper}>
      <h2 className={styles.header}>{title}</h2>
      <div>{children}</div>
    </div>
  );
}
