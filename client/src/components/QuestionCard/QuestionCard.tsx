import { QuestionInput, QuestionType } from "../../api/generated";
import { CustomSelect } from "../CustomSelect/CustomSelect";
import css from "./QuestionCard.module.css";

interface Props {
  question: QuestionInput;
  index: number;
  onUpdate: (index: number, fields: Partial<QuestionInput>) => void;
  onAddOption: (index: number) => void;
  onUpdateOption: (qIndex: number, optIndex: number, val: string) => void;
  onRemoveOption: (qIndex: number, optIndex: number) => void;
}

export function QuestionCard({
  question,
  index,
  onUpdate,
  onAddOption,
  onUpdateOption,
  onRemoveOption,
}: Props) {
  return (
    <div className={css.card}>
      <div className={css.row}>
        <input
          className={css.questionInput}
          placeholder="Запитання"
          value={question.title}
          onChange={(e) => onUpdate(index, { title: e.target.value })}
        />

        <CustomSelect
          value={question.type as QuestionType}
          onChange={(newType) => onUpdate(index, { type: newType })}
        />
      </div>

      {(question.type === QuestionType.MultipleChoice ||
        question.type === QuestionType.Checkbox) && (
        <div className={css.optionsContainer}>
          {question.options?.map((opt, optIndex) => (
            <div key={optIndex} className={css.optionRow}>
              <span className={css.marker}>
                {question.type === QuestionType.MultipleChoice ? "○" : "□"}
              </span>
              <input
                className={css.optionInput}
                value={opt}
                onChange={(e) =>
                  onUpdateOption(index, optIndex, e.target.value)
                }
              />
              <button
                className={css.optionBtnDelete}
                onClick={() => onRemoveOption(index, optIndex)}
                title="Видалити варіант"
              >
                ✕
              </button>
            </div>
          ))}
          <button
            className={css.addOptionBtn}
            onClick={() => onAddOption(index)}
          >
            + Додати варіант
          </button>
        </div>
      )}

      <div className={css.cardFooter}>
        <div className={css.divider} />
        <div className={css.footerActions}>
          <label className={css.requiredToggle}>
            <span className={css.requiredText}>Обов'язково</span>
            <input
              type="checkbox"
              checked={question.required || false}
              onChange={(e) => onUpdate(index, { required: e.target.checked })}
            />
            <span className={css.slider} />
          </label>
        </div>
      </div>
    </div>
  );
}
