import css from "./Loader.module.css";

export default function Loader() {
  return (
    <div className={css.container}>
      <svg className={css.svg} viewBox="25 25 50 50">
        <circle className={css.circle} r="20" cy="50" cx="50"></circle>
      </svg>
    </div>
  );
}
