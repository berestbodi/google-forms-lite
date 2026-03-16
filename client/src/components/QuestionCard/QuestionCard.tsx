import { QuestionInput, QuestionType } from "../../api/generated";
import { CustomSelect } from "../CustomSelect/CustomSelect";
import { Button } from "../Button/Button";
import css from "./QuestionCard.module.css";

interface Props {
  question: QuestionInput;
  index: number;
  onUpdate: (index: number, fields: Partial<QuestionInput>) => void;
  onRemove: (index: number) => void;
  onAddOption: (index: number) => void;
  onUpdateOption: (qIndex: number, optIndex: number, val: string) => void;
  onRemoveOption: (qIndex: number, optIndex: number) => void;
}

export function QuestionCard({
  question,
  index,
  onUpdate,
  onRemove,
  onAddOption,
  onUpdateOption,
  onRemoveOption,
}: Props) {
  const TrashIcon = (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2M10 11v6M14 11v6" />
    </svg>
  );

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
              <Button
                variant="ghost"
                className={css.optionBtnDelete}
                onClick={() => onRemoveOption(index, optIndex)}
                title="Видалити варіант"
              >
                ✕
              </Button>
            </div>
          ))}

          <Button
            variant="secondary"
            className={css.addOptionBtn}
            onClick={() => onAddOption(index)}
          >
            + Додати варіант
          </Button>
        </div>
      )}

      <div className={css.cardFooter}>
        <div className={css.divider} />
        <div className={css.footerActions}>
          <Button
            variant="ghost"
            onClick={() => onRemove(index)}
            title="Видалити запитання"
            type="button"
          >
            {TrashIcon}
          </Button>

          <div className={css.verticalDivider} />

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
