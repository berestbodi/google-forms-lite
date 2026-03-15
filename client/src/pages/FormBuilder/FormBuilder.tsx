import Loader from "../../components/Loader/Loader";
import { QuestionCard } from "../../components/QuestionCard/QuestionCard";
import { useFormEditor } from "../../hooks/useFormEditor";
import { SEO } from "../../components/SEO/SEO";
import css from "./FormBuilder.module.css";

export function FormBuilder() {
  const { state, actions } = useFormEditor();

  return (
    <div className={css.container}>
      <SEO title={state.title || "Нова форма"} />

      <div className={css.headerCard}>
        <input
          className={css.titleInput}
          placeholder="Назва форми"
          value={state.title}
          onChange={(e) => actions.setTitle(e.target.value)}
        />
        <input
          className={css.descriptionInput}
          placeholder="Опис форми"
          value={state.description}
          onChange={(e) => actions.setDescription(e.target.value)}
        />
      </div>

      {state.questions.map((q, index) => (
        <QuestionCard
          key={index}
          index={index}
          question={q}
          onUpdate={actions.updateQuestion}
          onAddOption={actions.addOption}
          onUpdateOption={actions.updateOption}
          onRemoveOption={actions.removeOption}
        />
      ))}

      <div className={css.controls}>
        <button onClick={actions.addQuestion} className={css.secondaryBtn}>
          Додати запитання
        </button>
        <button
          onClick={actions.handleSave}
          disabled={state.isLoading}
          className={css.primaryBtn}
        >
          {state.isLoading ? (
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Loader /> <span>Збереження...</span>
            </div>
          ) : (
            "Опублікувати"
          )}
        </button>
      </div>
    </div>
  );
}
