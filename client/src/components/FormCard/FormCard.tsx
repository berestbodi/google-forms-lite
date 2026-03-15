import { Link } from "react-router-dom";
import { Form } from "../../api/generated";
import styles from "./FormCard.module.css";

interface Props {
  form: Form;
  onDelete: (id: string) => void;
  isDeleting: boolean;
}

export function FormCard({ form, onDelete, isDeleting }: Props) {
  return (
    <div className={styles.formCard}>
      <div className={styles.cardHeader}>
        <div>
          <h3 className={styles.formTitle}>{form.title}</h3>
          {form.description && (
            <p className={styles.formDescription}>{form.description}</p>
          )}
        </div>

        <button
          className={styles.deleteBtn}
          onClick={() => onDelete(form.id)}
          disabled={isDeleting}
          title="Видалити форму"
        >
          ✕
        </button>
      </div>

      <div className={styles.footer}>
        <Link to={`/forms/${form.id}/fill`} className={styles.viewLink}>
          Заповнити форму →
        </Link>
        <Link
          to={`/forms/${form.id}/responses`}
          className={styles.responsesLink}
        >
          Результати 📊
        </Link>
      </div>
    </div>
  );
}
