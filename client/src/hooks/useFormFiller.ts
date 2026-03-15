import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import {
  useGetFormQuery,
  useSubmitResponseMutation,
  QuestionType,
} from "../api/generated";

export function useFormFiller() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const formId = id || "";

  const { data, isLoading, error } = useGetFormQuery({ id: formId });
  const [submitResponse, { isLoading: isSubmitting }] =
    useSubmitResponseMutation();

  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const [errors, setErrors] = useState<string[]>([]);

  const handleInputChange = (
    questionId: string,
    value: string,
    type: QuestionType,
  ) => {
    if (errors.includes(questionId)) {
      setErrors((prev) => prev.filter((id) => id !== questionId));
    }

    setAnswers((prev) => {
      const currentAnswers = prev[questionId] || [];
      if (type === QuestionType.Checkbox) {
        const newAnswers = currentAnswers.includes(value)
          ? currentAnswers.filter((a) => a !== value)
          : [...currentAnswers, value];
        return { ...prev, [questionId]: newAnswers };
      }
      return { ...prev, [questionId]: [value] };
    });
  };

  const handleSubmit = async () => {
    const form = data?.form;
    if (!form) return;

    const missingRequiredIds = form.questions
      .filter((q) => {
        if (!q.required) return false;
        const answer = answers[q.id];
        return (
          !answer ||
          answer.length === 0 ||
          (answer.length === 1 && answer[0].trim() === "")
        );
      })
      .map((q) => q.id);

    if (missingRequiredIds.length > 0) {
      setErrors(missingRequiredIds);

      iziToast.warning({
        title: "Увага",
        message: "Будь ласка, заповніть усі обов'язкові поля",
        position: "topRight",
      });

      const firstErrorElement = document.getElementById(missingRequiredIds[0]);
      firstErrorElement?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      return;
    }

    try {
      const formattedAnswers = Object.entries(answers).map(
        ([questionId, value]) => ({
          questionId,
          value,
        }),
      );

      await submitResponse({ formId, answers: formattedAnswers }).unwrap();

      iziToast.success({
        title: "Успіх",
        message: "Ваша відповідь успішно надіслана!",
        position: "topRight",
        timeout: 3000,
      });

      navigate("/");
    } catch {
      iziToast.error({
        title: "Помилка",
        message: "Не вдалося надіслати відповідь. Спробуйте пізніше.",
        position: "topRight",
      });
    }
  };

  return {
    form: data?.form,
    isLoading,
    error,
    isSubmitting,
    answers,
    errors,
    actions: { handleInputChange, handleSubmit },
  };
}
