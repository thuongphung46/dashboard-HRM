import { FC, useCallback, useState } from "react";
import Grid from "@mui/material/Grid";
import FormField, { IFormField } from "components/atoms/form_value";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
// import OpenAI from "openai";
import Box from "@mui/material/Box";

const formFields: IFormField[] = [
  {
    id: "api_key",
    label: "API Key",
    type: "text",
    isRequire: true,
  },
];

export const UploadCv: FC = () => {
  const [formData, setFormData] = useState<any>({
    api_key: "",
    message: "export ra thông tin user trong CV dạng JSON ",
  });
  // const [chatHistory, setChatHistory] = useState<
  //   { role: string; content: string | null }[]
  // >([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
    }
  };

  const sendMessage = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      try {
        // const openai = new OpenAI({
        //   apiKey: formData.api_key,
        //   dangerouslyAllowBrowser: true,
        // });
        // const params: OpenAI.Chat.ChatCompletionCreateParams = {
        //   model: "gpt-4",
        //   messages: [
        //     {
        //       role: "user",
        //       content: `${formData.message} \n await api res`,
        //     },
        //   ],
        // };
        // const chatCompletion = await openai.chat.completions.create(params);
        // setChatHistory([
        //   ...chatHistory,
        //   { role: "ai", content: chatCompletion.choices[0].message.content },
        // ]);
      } catch (e) {
        console.error(e);
      }
    },
    []
  );

  const handleOnChangeField = useCallback((data: any) => {
    const { name, value } = data.target;
    setFormData((prevData: any) => {
      const newFormData = { ...prevData };
      newFormData[name] = value;
      return newFormData;
    });
  }, []);

  return (
    <form onSubmit={sendMessage}>
      <Grid container spacing={2}>
        <FormField
          fields={formFields}
          handleOnChangeField={handleOnChangeField}
          formData={formData}
        />
        <Grid item>
          <Input type="file" onChange={handleFileChange}></Input>
        </Grid>
      </Grid>
      <Box>
        <Button variant="contained" color="primary" type="submit">
          Send
        </Button>
      </Box>
    </form>
  );
};
