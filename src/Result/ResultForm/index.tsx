import React, { FormEvent, useState } from 'react';
import {
  Button,
  Checkbox, FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography
} from "@mui/material";
import { ConfigFormSchemaFields, FormControls, ResultFormProps } from './ResultForm.types';
import CodeEditor from "@uiw/react-textarea-code-editor";

// TODO BUG - при сбрасывании состояния формы, radio и checkbox не сбрасывается, хотя значение формы - сбрасывается

const ResultForm: React.FC<ResultFormProps> = ({ formSchema }) => {
  const { title, fields, controls } = formSchema;

  const [formData, setFormData] = useState<unknown | null>(null);

  const getFieldWidget = (field: ConfigFormSchemaFields): JSX.Element | null => {
    switch (field.type) {
      case "number":
        return <TextField type="number" name={field.name} placeholder="Enter number" />
      case "textfield":
        return <TextField type="text" name={field.name} placeholder="Enter text" />
      case "multiline":
        return <TextField type="text" name={field.name} multiline minRows={3} placeholder="Enter multiline text" />
      case "date":
        return <input type="date" name={field.name} />
      case "radio":
        return (
          <>
            <FormLabel>{field.label}</FormLabel>
            <RadioGroup name={field.name} defaultValue={field.values[0].name}>
              {field.values.map(value => (
                <FormControlLabel key={value.name} value={value.name} control={<Radio />} label={value.label} />
              ))}
            </RadioGroup>
          </>
        )
      case "checkbox":
        return (
          <>
            <FormLabel>{field.label}</FormLabel>
            <FormGroup>
              {field.values.map(value => (
                <FormControlLabel key={value.name} control={<Checkbox name={value.name} />} label={value.label}/>
              ))}
            </FormGroup>
          </>
        )
      default:
        return null;
    }
  }

  const getControl = (control: FormControls, index: number): JSX.Element | null => {
    switch (control.type) {
      case "submit":
        return <Button type="submit" key={index} variant="contained">{control.label}</Button>
      case "cancel":
        return <Button key={index} type="reset">{control.label}</Button>
      default:
        return null;
    }
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    setFormData(Object.fromEntries(formData));
  }

  return (
    <div>
      <form style={{ display: "flex", flexDirection: "column", gap: "20px"}} onSubmit={handleSubmit}>
        {title && <Typography variant="h5">{title}</Typography>}
        {fields && fields.map((field) => (
          <FormControl key={field.name}>
            {getFieldWidget(field)}
          </FormControl>
        ))}
        {controls && controls.map((control, index) => getControl(control, index))}
      </form>
      <div style={{ borderTop: "1px solid #ccc" }}>
        <CodeEditor
          value={JSON.stringify(formData)}
          language="json"
          disabled
          padding={15}
          style={{
            fontSize: 12,
            backgroundColor: "#f5f5f5",
            fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
          }}
        />
      </div>
    </div>
  );
};

export default ResultForm;
