import { FormField } from "../../components/FormField/FormField";
import { useFormFiller } from "../../hooks/useFormFiller";
import Loader from "../../components/Loader/Loader";
import css from "./FormView.module.css";
import { SEO } from "../../components/SEO/SEO";

export function FormView() {
  const { form, isLoading, error, isSubmitting, answers, errors, actions } =
    useFormFiller();

  if (isLoading) {
    return (
      <div className={css.loadingWrapper}>
        <Loader />
      </div>
    );
  }

  if (error || !form) return <div className={css.error}>Форму не знайдено</div>;

  return (
    <div className={css.container}>
      <SEO title={form.title} description={form.description} />

      <div className={css.headerCard}>
        <h1 className={css.title}>{form.title}</h1>
        {form.description && (
          <p className={css.description}>{form.description}</p>
        )}
        {errors.length > 0 && (
          <p className={css.validationSummary}>
            * Будь ласка, заповніть обов'язкові поля
          </p>
        )}
      </div>

      {form.questions.map((q) => (
        <div key={q.id} id={q.id} className={css.fieldWrapper}>
          <FormField
            question={q}
            currentValues={answers[q.id] || []}
            onChange={actions.handleInputChange}
            hasError={errors.includes(q.id)}
          />
        </div>
      ))}

      <div className={css.footer}>
        <button
          className={css.submitBtn}
          onClick={actions.handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <div className={css.btnLoader}>
              <span>Надсилання...</span>
            </div>
          ) : (
            "Надіслати"
          )}
        </button>

        <button
          className={css.clearBtn}
          onClick={() => window.location.reload()}
        >
          Очистити форму
        </button>
      </div>
    </div>
  );
}
