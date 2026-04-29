export function createFormDataPayload(data, fileKey = "media") {
  const fileValue = data?.[fileKey];
  const isFormData =
    fileValue instanceof File ||
    (Array.isArray(fileValue) && fileValue[0] instanceof File);
  let payload = { ...data };

  if (
    !fileValue ||
    (Array.isArray(fileValue) && fileValue.length === 0) ||
    (typeof fileValue === "object" &&
      Object.keys(fileValue).length === 0 &&
      !(fileValue instanceof File))
  ) {
    delete payload[fileKey];
  }

  if (isFormData) {
    const formData = new FormData();

    Object.keys(payload).forEach((key) => {
      const value = payload[key];

      if (value !== undefined && value !== null) {
        if (Array.isArray(value)) {
          if (value.length === 0) return;

          value.forEach((item) => {
            formData.append(key, item);
          });
        } else {
          formData.append(key, value);
        }
      }
    });

    return formData;
  }

  return payload;
}
