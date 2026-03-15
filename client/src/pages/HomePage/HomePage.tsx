import { Link } from "react-router-dom";
import styles from "./HomePage.module.css";
import { useFormsList } from "../../hooks/useFormsList";
import { FormCard } from "../../components/FormCard/FormCard";
import Loader from "../../components/Loader/Loader";

export function HomePage() {
  const { forms, isLoading, isDeleting, handleDelete } = useFormsList();

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.loaderWrapper}>
          <Loader />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Мої форми</h1>
        <Link to="/forms/new">
          <button className={styles.createBtn}>+ Створити форму</button>
        </Link>
      </header>

      <div className={styles.grid}>
        {forms.length === 0 ? (
          <p className={styles.emptyText}>У вас поки немає створених форм.</p>
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
