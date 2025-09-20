import { reactive, ref } from "vue";
import type { ChangePasswordEntity } from "../../entities/channge-password.entities";
import { clientApi } from "@/common/configurations/axios.config";
import { message } from "ant-design-vue";
import type { AxiosError } from "axios";

export function useChangePassword() {
  const showModal = ref(false);
  const loading = ref(false);
  const form = reactive<ChangePasswordEntity>({
    password: "",
    new_password: "",
    new_password2: "",
  });

  const errors = reactive<ChangePasswordEntity>({
    password: "",
    new_password: "",
    new_password2: "",
  });

  const openModal = () => {
    showModal.value = true;
    resetForm();
  };

  const resetForm = () => {
    Object.assign(form, {
      password: "",
      new_password: "",
      new_password2: "",
    });
    Object.assign(errors, {
      password: "",
      new_password: "",
      new_password2: "",
    });
  };

  const validateForm = () => {
    let valid = true;
    Object.assign(errors, {
      password: "",
      new_password: "",
      new_password2: "",
    });

    if (!form.password) {
      errors.password = "Current password is required";
      valid = false;
    }

    const newPasswordValid = form.new_password && form.new_password.length >= 6;
    if (!newPasswordValid) {
      errors.new_password = !form.new_password
        ? "New password is required"
        : "Password must be at least 6 characters";
      valid = false;
    }

    const confirmValid =
      form.new_password2 && form.new_password === form.new_password2;
    if (!confirmValid) {
      errors.new_password2 = !form.new_password2
        ? "Please confirm your password"
        : "Passwords do not match";
      valid = false;
    }

    return valid;
  };

  const handleSubmit = async () => {
    try {
      loading.value = true;
      if (!validateForm()) return;
      const res = await clientApi.patch("change-password/", form);
      if (res.status == 200) {
        message.success("Change password successfully");
      }
      showModal.value = false;
    } catch (e: AxiosError | any) {
      if (e.response?.data) {
        const errors = e.response.data;
        for (const field in errors) {
          if (Array.isArray(errors[field])) {
            errors[field].forEach((msg: string) => {
              message.error(msg);
            });
          } else if (typeof errors[field] === "string") {
            message.error(errors[field]);
          }
        }
      }
    } finally {
      loading.value = false;
    }
  };

  return {
    showModal,
    loading,
    form,
    errors,
    openModal,
    handleSubmit,
  };
}
