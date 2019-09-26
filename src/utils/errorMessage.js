import React from "react";
import { notification } from "antd";
import TranslatedErrorMessage from "components/TranslatedErrorMessage";

export const extractErrorMessage = function(e) {
  const message = e.error_description || e.message || "";
  const match = message.match(/.+[A-Z_]+:(.+)/);

  if (match && match.length > 1) {
    return match[1];
  }

  return message;
};

export const handleErrorMessage = e => {
  notification["error"]({
    message: <TranslatedErrorMessage error={extractErrorMessage(e)} />
  });
};
