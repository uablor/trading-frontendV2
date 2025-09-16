import { notification } from "ant-design-vue";

export  const openNotificationWithIcon = (
    type: string,
    message?: string,
    description?: string
  ) => {
    (notification as any)[type]({
      message: message,
      description: description,
    });
  };
