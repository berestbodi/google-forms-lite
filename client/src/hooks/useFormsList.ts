import iziToast, { IziToast, IziToastSettings } from "izitoast";
import { useGetFormsQuery, useDeleteFormMutation } from "../api/generated";

export function useFormsList() {
  const { data, isLoading } = useGetFormsQuery();
  const [deleteForm, { isLoading: isDeleting }] = useDeleteFormMutation();

  const handleDelete = (id: string) => {
    iziToast.question({
      id: "delete-confirm",
      zindex: 9999,
      timeout: 20000,
      close: false,
      overlay: true,
      displayMode: 0,
      title: "Видалення",
      message: "Ви впевнені, що хочете видалити цю форму?",
      position: "center",
      theme: "light",
      color: "white",
      icon: "",
      buttons: [
        [
          "<button><b>ВИДАЛИТИ</b></button>",
          async (instance: IziToast, toast: HTMLDivElement) => {
            instance.hide({ transitionOut: "fadeOut" }, toast, "button");
            try {
              await deleteForm({ id }).unwrap();
              iziToast.success({
                title: "Успіх",
                message: "Форму видалено назавжди",
              });
            } catch {
              iziToast.error({
                title: "Помилка",
                message: "Не вдалося видалити форму. Спробуйте пізніше.",
              });
            }
          },
          true,
        ],
        [
          "<button>СКАСУВАТИ</button>",
          (instance: IziToast, toast: HTMLDivElement) => {
            instance.hide({ transitionOut: "fadeOut" }, toast, "button");
          },
          false,
        ],
      ],
    } as IziToastSettings);
  };

  return {
    forms: data?.forms || [],
    isLoading,
    isDeleting,
    handleDelete,
  };
}
