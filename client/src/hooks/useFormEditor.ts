import { useState } from "react";
import { useNavigate } from "react-router-dom";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import {
  useCreateFormMutation,
  QuestionType,
  QuestionInput,
} from "../api/generated";

export function useFormEditor() {
  const navigate = useNavigate();
  const [createForm, { isLoading }] = useCreateFormMutation();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState<QuestionInput[]>([]);

  const addQuestion = () => {
    setQuestions((prev) => [
      ...prev,
      { title: "", type: QuestionType.Text, required: false, options: [] },
    ]);
  };

  const removeQuestion = (index: number) => {
    const questionToRestore = questions[index];

    setQuestions((prev) => prev.filter((_, i) => i !== index));

    iziToast.show({
      title: "Видалено",
      message: "Запитання було видалено",
      position: "bottomRight",
      color: "dark",
      timeout: 5000,
      buttons: [
        [
          "<button><b>ВІДМІНИТИ</b></button>",
          function (instance, toast) {
            setQuestions((prev) => {
              const restored = [...prev];
              restored.splice(index, 0, questionToRestore);
              return restored;
            });
            instance.hide({ transitionOut: "fadeOut" }, toast, "undo");
          },
          true,
        ],
      ],
    });
  };

  const updateQuestion = (index: number, fields: Partial<QuestionInput>) => {
    setQuestions((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], ...fields };
      return updated;
    });
  };

  const addOption = (qIndex: number) => {
    setQuestions((prev) => {
      const updated = [...prev];
      const currentOptions = updated[qIndex].options || [];
      updated[qIndex] = {
        ...updated[qIndex],
        options: [...currentOptions, `Варіант ${currentOptions.length + 1}`],
      };
      return updated;
    });
  };

  const updateOption = (qIndex: number, optIndex: number, value: string) => {
    setQuestions((prev) => {
      const updated = [...prev];
      const options = [...(updated[qIndex].options || [])];
      options[optIndex] = value;
      updated[qIndex] = { ...updated[qIndex], options };
      return updated;
    });
  };

  const removeOption = (qIndex: number, optIndex: number) => {
    setQuestions((prev) => {
      const updated = [...prev];
      const options = (updated[qIndex].options || []).filter(
        (_, i) => i !== optIndex,
      );
      updated[qIndex] = { ...updated[qIndex], options };
      return updated;
    });
  };

  const handleSave = async () => {
    if (!title.trim()) {
      iziToast.warning({ title: "Увага", message: "Введіть назву форми" });
      return;
    }

    if (questions.length === 0) {
      iziToast.warning({ title: "Увага", message: "Додайте запитання" });
      return;
    }

    try {
      const formattedQuestions = questions.map((q) => ({
        ...q,
        title: q.title.trim() || "Без назви",
        options: q.options || [],
      }));

      await createForm({
        title: title.trim(),
        description: description.trim(),
        questions: formattedQuestions,
      }).unwrap();

      iziToast.success({ title: "Успіх", message: "Форму опубліковано!" });
      navigate("/");
    } catch {
      iziToast.error({
        title: "Помилка",
        message: "Не вдалося зберегти. Перевірте з'єднання.",
      });
    }
  };

  return {
    state: { title, description, questions, isLoading },
    actions: {
      setTitle,
      setDescription,
      addQuestion,
      removeQuestion,
      updateQuestion,
      addOption,
      updateOption,
      removeOption,
      handleSave,
    },
  };
}
