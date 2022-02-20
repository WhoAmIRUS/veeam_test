interface TextField {
  type: "textfield";
  name: string;
}

interface MultilineField {
  type: "multiline";
  name: string
}

interface NumberField {
  type: "number";
  name: string;
}

interface DateField {
  type: "date";
  name: string;
}

interface RadioFieldValue {
  name: string;
  label: string;
}

interface RadioField {
  type: "radio";
  name: string;
  label: string;
  values: RadioFieldValue[];
}

interface CheckboxFieldValue {
  name: string;
  label: string;
}

interface CheckboxField {
  type: "checkbox";
  name: string;
  label: string;
  values: CheckboxFieldValue[];
}

export type ConfigFormSchemaFields = NumberField | TextField | MultilineField | DateField | RadioField | CheckboxField;

interface SubmitFormControl {
  label: string;
  type: "submit";
}

interface CancelFormControl {
  label: string;
  type: "cancel";
}

export type FormControls = SubmitFormControl | CancelFormControl

export interface ConfigFormSchema {
  title?: string;
  fields?: ConfigFormSchemaFields[];
  controls?: FormControls[];
}

export interface ResultFormProps {
  formSchema: ConfigFormSchema
}
