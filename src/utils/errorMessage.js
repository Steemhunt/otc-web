import { notification } from "antd";

//temporary
const errorMap =  {
  "URL_NOT_SUPPORTED": "지원되지 않는 URL 입니다",
  "URL_ALREADY_LISTED": "이미 등록되어있는 거래입니다"
}

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
    message: errorMap[extractErrorMessage(e)] || extractErrorMessage(e)
  });
};
