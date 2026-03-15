import { Link } from "react-router-dom";
import css from "./HomePage.module.css";
import { useFormsList } from "../../hooks/useFormsList";
import { FormCard } from "../../components/FormCard/FormCard";
import Loader from "../../components/Loader/Loader";
import { SEO } from "../../components/SEO/SEO";

export function HomePage() {
  const { forms, isLoading, isDeleting, handleDelete } = useFormsList();

  if (isLoading) {
    return (
      <div className={css.container}>
        <div className={css.loaderWrapper}>
          <Loader />
        </div>
      </div>
    );
  }

  return (
    <div className={css.container}>
      <SEO title={"Мої форми"} />

      <header className={css.header}>
        <h1>Мої форми</h1>
        <Link to="/forms/new">
          <button className={css.createBtn}>+ Створити форму</button>
        </Link>
      </header>

      <div className={css.grid}>
        {forms.length === 0 ? (
          <p className={css.emptyText}>У вас поки немає створених форм.</p>
        ) : (
          forms.map((form) => (
            <FormCard
              key={form.id}
              form={form}
              onDelete={handleDelete}
              isDeleting={isDeleting}
            />
          ))
        )}
      </div>
    </div>
  );
}
