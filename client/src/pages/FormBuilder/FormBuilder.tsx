import { QuestionCard } from "../../components/QuestionCard/QuestionCard";
import { useFormEditor } from "../../hooks/useFormEditor";
import { SEO } from "../../components/SEO/SEO";
import css from "./FormBuilder.module.css";
import { Button } from "../../components/Button/Button";

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

      <div className={css.questionsList}>
        {state.questions.map((q, index) => (
          <QuestionCard
            key={index}
            index={index}
            question={q}
            onUpdate={actions.updateQuestion}
            onRemove={() => actions.removeQuestion(index)}
            onAddOption={actions.addOption}
            onUpdateOption={actions.updateOption}
            onRemoveOption={actions.removeOption}
          />
        ))}
      </div>

      <div className={css.controls}>
        <Button variant="secondary" onClick={actions.addQuestion}>
          + Додати запитання
        </Button>

        <Button onClick={actions.handleSave} isLoading={state.isLoading}>
          Опублікувати
        </Button>
      </div>
    </div>
  );
}
