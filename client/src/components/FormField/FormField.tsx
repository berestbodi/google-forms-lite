import { Question, QuestionType } from "../../api/generated";
import css from "./FormField.module.css";

interface Props {
  question: Question;
  currentValues: string[];
  onChange: (id: string, val: string, type: QuestionType) => void;
  hasError?: boolean;
}

export function FormField({
  question,
  currentValues,
  onChange,
  hasError,
}: Props) {
  return (
    <div className={`${css.questionCard} ${hasError ? css.errorCard : ""}`}>
      <label className={css.questionTitle}>
        {question.title}
        {question.required && <span className={css.required}> *</span>}
      </label>

      <div className={css.answerArea}>
        {question.type === QuestionType.Text && (
          <input
            type="text"
            className={css.textInput}
            placeholder="Ваша відповідь"
            value={currentValues[0] || ""}
            onChange={(e) =>
              onChange(question.id, e.target.value, question.type)
            }
          />
        )}

        {(question.type === QuestionType.MultipleChoice ||
          question.type === QuestionType.Checkbox) && (
          <div className={css.optionsList}>
            {question.options?.map((opt, i) => (
              <label key={i} className={css.optionLabel}>
                <input
                  type={
                    question.type === QuestionType.MultipleChoice
                      ? "radio"
                      : "checkbox"
                  }
                  name={question.id}
                  checked={currentValues.includes(opt)}
                  onChange={() => onChange(question.id, opt, question.type)}
                />
                <span className={css.optionText}>{opt}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {hasError && (
        <div className={css.errorText}>
          <span className={css.errorIcon}>!</span> Це обов'язкове запитання
        </div>
      )}
    </div>
  );
}
