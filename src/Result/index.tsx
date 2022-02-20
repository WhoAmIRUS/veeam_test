import React, { useEffect, useState } from 'react';
import { isObject } from "../utils/common";
import { Box, Typography } from "@mui/material";
import ResultForm from './ResultForm';
import { ConfigFormSchema } from "./ResultForm/ResultForm.types";

interface ResultProps {
  config: string;
}

const Result: React.FC<ResultProps> = ({ config }) => {
  const [formSchema, setFormSchema] = useState<ConfigFormSchema | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    const parsedConfig = JSON.parse(config);

    if (isObject(parsedConfig)) {
      setFormSchema(parsedConfig);
    } else {
      setErrorMessage('Wrong config format')
    }
  }, [])

  return (
    <Box>
      {formSchema ? <ResultForm formSchema={formSchema} /> : null}
      {errorMessage ? <Typography variant="body1" sx={{color: "red" }}>{errorMessage}</Typography> : null}
    </Box>
  );
};

export default Result;
