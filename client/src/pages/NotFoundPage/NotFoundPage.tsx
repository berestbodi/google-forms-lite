import { Link } from "react-router-dom";
import { SEO } from "../../components/SEO/SEO";
import { Button } from "../../components/Button/Button";
import css from "./NotFoundPage.module.css";

export function NotFoundPage() {
  return (
    <div className={css.container}>
      <SEO title="404 - Сторінку не знайдено" />

      <div className={css.content}>
        <h1 className={css.errorCode}>404</h1>
        <h2 className={css.title}>Ой! Сторінку не знайдено</h2>
        <p className={css.text}>
          На жаль, ми не можемо знайти сторінку, яку ви шукаєте. Можливо, адреса
          застаріла або ви помилилися при введенні.
        </p>

        <Link to="/" className={css.homeLink}>
          <Button variant="primary">Повернутися на головну</Button>
        </Link>
      </div>
    </div>
  );
}
