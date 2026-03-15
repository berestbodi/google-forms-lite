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
    setQuestions([
      ...questions,
      { title: "", type: QuestionType.Text, required: false, options: [] },
    ]);
  };

  const updateQuestion = (index: number, fields: Partial<QuestionInput>) => {
    setQuestions((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], ...fields };
      return updated;
    });
  };

  const addOption = (qIndex: number) => {
    const updated = [...questions];
    const currentOptions = updated[qIndex].options || [];
    updated[qIndex] = {
      ...updated[qIndex],
      options: [...currentOptions, `Варіант ${currentOptions.length + 1}`],
    };
    setQuestions(updated);
  };

  const updateOption = (qIndex: number, optIndex: number, value: string) => {
    const updated = [...questions];
    const options = [...(updated[qIndex].options || [])];
    options[optIndex] = value;
    updated[qIndex] = { ...updated[qIndex], options };
    setQuestions(updated);
  };

  const removeOption = (qIndex: number, optIndex: number) => {
    const updated = [...questions];
    const options = (updated[qIndex].options || []).filter(
      (_, i) => i !== optIndex,
    );
    updated[qIndex] = { ...updated[qIndex], options };
    setQuestions(updated);
  };

  const handleSave = async () => {
    if (!title.trim()) {
      iziToast.warning({
        title: "Увага",
        message: "Будь ласка, введіть назву форми",
      });
      return;
    }

    try {
      await createForm({
        title,
        description,
        questions: questions.map((q) => ({
          ...q,
          title: q.title || "Без назви",
        })),
      }).unwrap();

      iziToast.success({
        title: "Успіх",
        message: "Форму опубліковано успішно!",
      });

      navigate("/");
    } catch {
      iziToast.error({
        title: "Помилка",
        message: "Не вдалося зберегти форму. Спробуйте ще раз.",
      });
    }
  };

  return {
    state: { title, description, questions, isLoading },
    actions: {
      setTitle,
      setDescription,
      addQuestion,
      updateQuestion,
      addOption,
      updateOption,
      removeOption,
      handleSave,
    },
  };
}
