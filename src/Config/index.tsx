import React, { ChangeEvent } from 'react';
import CodeEditor from '@uiw/react-textarea-code-editor';
import { Box, Button, Typography } from "@mui/material";
import defaultSchema from './defaultSchema.json';

type ConfigSaveStatus = "idle" | "error" | "saved"

interface ConfigProps {
  config: string;
  onChangeConfig: (value: string) => void;
}

const Config: React.FC<ConfigProps> = ({ config, onChangeConfig }) => {
  const [code, setCode] = React.useState<string>(config);
  const [status, setStatus] = React.useState<ConfigSaveStatus>("idle");

  const validateJSONScheme = () => {
    try {
      JSON.parse(code);
      return true
    } catch (e) {
      return false
    }
  }

  const saveConfig = () => {
    const isValid = validateJSONScheme();

    if (!isValid) {
      setStatus("error")

      return;
    }

    setStatus("saved");
    onChangeConfig(code);
  }

  const handleChangeCode = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setCode(event.target.value)
    if (status !== "idle") {
      setStatus("idle")
    }
  }

  const handleSetDefaultSchema = () => {
    setCode(JSON.stringify(defaultSchema));
  }

  return (
    <Box sx={{ display: "flex", gap: "20px", flexDirection: "column" }}>
      <CodeEditor
        value={code}
        language="json"
        placeholder="Please enter JSON code."
        onChange={handleChangeCode}
        padding={15}
        style={{
          fontSize: 12,
          backgroundColor: "#f5f5f5",
          fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
        }}
      />
      <div style={{ display: "flex", gap: "20px", flexDirection: "column" }}>
        <Button onClick={saveConfig} variant="contained" sx={{ width: "fit-content" }}>save</Button>
        <Button onClick={handleSetDefaultSchema} variant="contained" sx={{ width: "fit-content" }}>Set default schema</Button>
        {status === "error" ? <Typography variant="body1" sx={{color: "red" }}>Wrong JSON schema</Typography> : null}
        {status === "saved" ? <Typography variant="body1" sx={{ color: "green" }}>Save success</Typography> : null}
      </div>
    </Box>
  );
};

export default Config;
