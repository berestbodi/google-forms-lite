import { useParams } from "react-router-dom";
import { useGetFormQuery, useGetResponsesQuery } from "../api/generated";

export function useFormResponses() {
  const { id } = useParams<{ id: string }>();
  const formId = id || "";

  const { data: formData, isLoading: formLoading } = useGetFormQuery({
    id: formId,
  });
  const { data: resData, isLoading: resLoading } = useGetResponsesQuery({
    formId,
  });

  return {
    form: formData?.form,
    responses: resData?.responses || [],
    isLoading: formLoading || resLoading,
  };
}
