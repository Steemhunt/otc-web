import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

const TranslatedErrorMessage = ({ error }) => {
  const { t, i18n } = useTranslation();

  //error could be a code or a message
  let errorMessage = error;
  if (i18n.exists(`errors.${error}`)) {
    errorMessage = t(`errors.${error}`);
  }

  return <div>{errorMessage}</div>;
};

TranslatedErrorMessage.propTypes = {
  errorCode: PropTypes.string
};

export default TranslatedErrorMessage;
