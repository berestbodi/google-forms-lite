import { ResponseItem } from "../../components/ResponseItem/ResponseItem";
import { useFormResponses } from "../../hooks/useFormResponses";
import Loader from "../../components/Loader/Loader";
import styles from "./FormResponses.module.css";

export function FormResponses() {
  const { form, responses, isLoading } = useFormResponses();

  if (isLoading) {
    return (
      <div className={styles.loadingWrapper}>
        <Loader />
      </div>
    );
  }

  if (!form) return <div className={styles.container}>Форму не знайдено</div>;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Відповіді: {form.title}</h1>
        <div className={styles.stats}>
          Усього відповідей: <strong>{responses.length}</strong>
        </div>
      </header>

      {responses.length === 0 ? (
        <div className={styles.empty}>На цю форму ще ніхто не відповів.</div>
      ) : (
        <div className={styles.list}>
          {responses.map((resp, index) => (
            <ResponseItem
              key={resp.id}
              response={resp}
              questions={form.questions}
              index={index}
            />
          ))}
        </div>
      )}
    </div>
  );
}
