import { FC, useCallback, useEffect, useMemo, useState } from "react";
import Grid from "@mui/material/Grid";
import FormField, { IFormField } from "components/atoms/form_value";
import { Button } from "@mui/material";
import OpenAI from "openai";

const formFields: IFormField[] = [
  {
    id: "api_key",
    label: "API Key",
    type: "text",
    isRequire: true,
  },
  {
    id: "message",
    label: "Message",
    type: "text",
  },
];

const FormContainer: FC = () => {
  const [formData, setFormData] = useState<any>({
    api_key: "",
  });
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<
    { role: string; content: string | null }[]
  >([]);

  const sendMessage = useCallback(async () => {
    const openai = new OpenAI({
      apiKey: formData.api_key,
      dangerouslyAllowBrowser: true,
    });

    const params: OpenAI.Chat.ChatCompletionCreateParams = {
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }],
    };
    const chatCompletion = await openai.chat.completions.create(params); // Remove type annotation
    setChatHistory([
      ...chatHistory,
      { role: "ai", content: chatCompletion.choices[0].message.content },
    ]);
    setMessage("");
  }, [chatHistory, formData.api_key, message]);

  useEffect(() => {
    setFormData({});
  }, []);

  const handleOnChangeField = useCallback((data: any) => {
    const { name, value } = data.target;
    setFormData((prevData: any) => {
      const newFormData = { ...prevData };
      newFormData[name] = value;
      return newFormData;
    });
  }, []);

  const renderField = useMemo(() => {
    return (
      <>
        <FormField
          fields={formFields}
          handleOnChangeField={handleOnChangeField}
          formData={formData}
        />
      </>
    );
  }, [formData, handleOnChangeField]);

  return (
    <>
      <Grid container spacing={2}>
        {renderField}
      </Grid>
      <Button variant="contained" color="primary" onClick={sendMessage}>
        Send
      </Button>
    </>
  );
};

export default FormContainer;
