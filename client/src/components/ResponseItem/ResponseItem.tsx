import { Response, Question } from "../../api/generated";
import styles from "./ResponseItem.module.css";

interface Props {
  response: Response;
  questions: Question[];
  index: number;
}

export function ResponseItem({ response, questions, index }: Props) {
  return (
    <div className={styles.responseCard}>
      <div className={styles.responseNumber}>Відповідь №{index + 1}</div>
      {questions.map((q) => {
        const answer = response.answers.find((a) => a.questionId === q.id);
        return (
          <div key={q.id} className={styles.answerRow}>
            <div className={styles.questionTitle}>{q.title}</div>
            <div className={styles.answerValue}>
              {answer ? (
                answer.value.join(", ")
              ) : (
                <span className={styles.noAnswer}>Немає відповіді</span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
