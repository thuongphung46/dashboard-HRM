import { FC, useCallback, useState } from "react";
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
    message: "export ra thông tin user trong CV dạng JSON ",
  });
  const [chatHistory, setChatHistory] = useState<
    { role: string; content: string | null }[]
  >([]);
  const [error, setError] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleOCR = useCallback(async () => {
    // if (!file) {
    //   setError("Please upload a file.");
    //   return;
    // }

    try {
      // export file ra dạng base 64
      // const base64 = atob();
    } catch (e) {
      setError("Failed to process the image.");
      console.error(e);
    }
  }, [file]);

  const sendMessage = useCallback(async () => {
    if (!formData.api_key) {
      setError("API Key is required");
      return;
    }

    setError(null);

    // const extractedText = await handleOCR();
    // if (!extractedText) {
    //   setError("Failed to extract text from the image.");
    //   return;
    // }

    try {
      const openai = new OpenAI({
        apiKey: formData.api_key,
        dangerouslyAllowBrowser: true,
      });

      const params: OpenAI.Chat.ChatCompletionCreateParams = {
        model: "gpt-4",
        messages: [
          {
            role: "user",
            content: `
              ocr_text:
                'lv". ĐINH XUÂN THẢO.\nLII C22 ProductManoger\nđế 06/11/1991 9 NgưễnĐnhCHếu PhÕng6,Quốn3 TPHCM\ní  Á 090609995 -IEl thoo.b.ssompb- O thøo-gh.exomple\nGiới thiệu\nVVóihơn hoi nồm linhnghiệmô cácvịtríProduetlMenoger, Bu6ineee Angst. rong vậc hỗ trợ nhốm Agle, tạo, sốp xếp\nmức độ ưu ên và uôný bocllogicácc hừngel?TôEI?40, Qaodle 2duerrs về bồng Thc sỹ Ôuôntinhdoonh, ôi\nnong muốn lộnđụng các kỹ nông võ hến thứ cửa mìnhđể đồng góp lo cômg ty với oi ồ à Poduzt Managar\nĐợi học Kính TẾ “Thợp sỹ Quên trị kinh doanh 01/201 -10/2015\nLuôn "8gióe độnge0z thương hiệu điệnthoøivỏ thường Hệu nhờ bón lêđếnsự.quaylọieũø người têudng\n*-Sdụng kỹ thuệt phông vồnchiyê ng, phông vốn nhốm vờ phốt phếtuthôo sói để thụ thộp dö8u.\n%8 dụng EM, Fe về oeelỏể thốn bể về phônPhdllu.\nĐại học Ngân Hàng, “Quên tị kinh doanh 07/2009-09/2013\nĐồn. \'Xêy dựng trưng tôm lưyến vềhỗ tợ COMEOUT đànhoho giới13BT5\n+ Phốihgplàm vậc nhóm vềkÿthuột phông vốn 1~1vớiđểi Lượng tiếm rong,\n* Sdụng cóc Miền thúc vềquôn rịehiển lược, quônh liehnh, lế loồn quồn ị ti  vàtệp kế hopchđu tự với\ns0hỗ tợcis phốn mắm Đesl\nViếtcv ProdietMonogar 03/2017 -03/2018\ntung cốp hông tín định uồng về hỗ trợ nhóm Agil trong cuổ kình phát Liển phồn mề m\n+ Làm Vic vẻincuỗidùng/ thốchhèm9, các bênlãnquơn và nhóm daluaryđểthuthệp thông tin\n+ Tho lônvố1daveloper teelrvồ E4 dể lồm rô về đêm bo chức nông phù hợp vếi mengdgieio ngườidùng\n*- Chjntrech nhệmlọo, lên đonh sách và sắp xếp thứ tưưu lên co bøckleg cho sònghồm wnb,\n*- ầm v§c vốiErobet Nanaser để lên kế hoạch, chuørg Lình dự phòng đôm bôosòn phốm đứn vốitồm nhinvồ\ntình\nVietcv Business Anlyst 03/2016 -08/2017\nDị trêncóc thông từngtôi dùng, khốch hồng và Produet wrer, iến hồnhphôn Eh về làm việc cũng nhốm Agie\ndể phóttiểngôn phẩm web:\n*- làm vÉc Le iếp với ngườidùngc ối để ìm hiểu và phân hnhững khó thônkhietrdụng sôn phốm.\ns_ Phốihgpvốidavelopervề \\eelerđểcải thận UI/UX về bợ eo cóc chức nông eủøsônphẩm.\n5  CNiutrech nhm về phốt kiến ến lên te, tợ và sắp xếp cóc slowysuihithêo uện.\n* Sốpsếp nức độ niên lòm việc cho nhóm Agile về xem sết cóc blog cônlgi\n*. Bềocóo KPIDeliery với roeot Monogervồ CTõ.\n',
              predictions:
                '[{"xmin":13.059214592,"ymin":13.5608139038,"xmax":166.8423614502,"ymax":164.341217041,"confidence":0.8873530626,"class":1,"name":"picture"},{"xmin":29.7470855713,"ymin":369.0807495117,"xmax":440.4935913086,"ymax":448.1112365723,"confidence":0.7859385014,"class":2,"name":"text"},{"xmin":30.5249862671,"ymin":467.622833252,"xmax":502.6144104004,"ymax":590.7778930664,"confidence":0.780279994,"class":2,"name":"text"},{"xmin":24.940404892,"ymin":276.0370788574,"xmax":437.2594604492,"ymax":364.4918212891,"confidence":0.7633112073,"class":2,"name":"text"},{"xmin":32.8991775513,"ymin":603.4360351562,"xmax":499.3576965332,"ymax":729.1617431641,"confidence":0.7108843327,"class":2,"name":"text"},{"xmin":31.5141334534,"ymin":727.6444702148,"xmax":214.8880462646,"ymax":773.0447387695,"confidence":0.606044054,"class":2,"name":"text"},{"xmin":115.573928833,"ymin":170.2733917236,"xmax":573.5975952148,"ymax":260.8986206055,"confidence":0.5470067859,"class":2,"name":"text"},{"xmin":211.8448028564,"ymin":33.0547027588,"xmax":561.1591796875,"ymax":140.8937072754,"confidence":0.5345448256,"class":0,"name":"info"},{"xmin":37.1456451416,"ymin":775.8529052734,"xmax":162.6946258545,"ymax":812.873840332,"confidence":0.4886651039,"class":2,"name":"text"},{"xmin":28.7308273315,"ymin":175.0474853516,"xmax":357.3324279785,"ymax":256.1907348633,"confidence":0.3276451528,"class":2,"name":"text"}]',
            \n${formData.message}`,
          },
        ],
      };

      const chatCompletion = await openai.chat.completions.create(params);
      setChatHistory([
        ...chatHistory,
        { role: "ai", content: chatCompletion.choices[0].message.content },
      ]);
    } catch (e) {
      setError(
        "Failed to send message. Please check your API key and try again."
      );
      console.error(e);
    }
  }, [chatHistory, formData.api_key, formData.message]);

  const handleOnChangeField = useCallback((data: any) => {
    const { name, value } = data.target;
    setFormData((prevData: any) => {
      const newFormData = { ...prevData };
      newFormData[name] = value;
      return newFormData;
    });
  }, []);

  return (
    <>
      <Grid container spacing={2}>
        <FormField
          fields={formFields}
          handleOnChangeField={handleOnChangeField}
          formData={formData}
        />
        <input type="file" onChange={handleFileChange} />
      </Grid>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <Button variant="contained" color="primary" onClick={sendMessage}>
        Send
      </Button>
    </>
  );
};

export default FormContainer;
