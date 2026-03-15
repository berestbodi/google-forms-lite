import { useState, useRef, useEffect } from "react";
import { QuestionType } from "../../api/generated";
import css from "./CustomSelect.module.css";

interface Option {
  value: QuestionType;
  label: string;
}

interface Props {
  value: QuestionType;
  onChange: (value: QuestionType) => void;
}

const options: Option[] = [
  { value: QuestionType.Text, label: "Текст" },
  { value: QuestionType.MultipleChoice, label: "Один з багатьох" },
  { value: QuestionType.Checkbox, label: "Кілька варіантів" },
];

export function CustomSelect({ value, onChange }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Закриваємо селект при кліку поза ним
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div className={css.selectContainer} ref={containerRef}>
      <div
        className={`${css.selectedBox} ${isOpen ? css.active : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{selectedOption?.label}</span>
        <span className={css.arrow}>▼</span>
      </div>

      {isOpen && (
        <ul className={css.optionsList}>
          {options.map((opt) => (
            <li
              key={opt.value}
              className={`${css.optionItem} ${opt.value === value ? css.selected : ""}`}
              onClick={() => {
                onChange(opt.value);
                setIsOpen(false);
              }}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
