import express from "express";
import axios from "axios";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// console.log("hi")
// app.use(express.static(__dirname + "/public"));
let data = {};
let enteredValue="hello";
app.get("/",async(req,res)=>{
    // document.getElementById("word-heading").innerHTML = "not a sample";
  try{
    const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${enteredValue}`);
    // const [rawData] = responce.data || " ";
    // const{word,phonetic,phonetics,meanings} = rawData || " " ;
    // const [textAndAudio] = phonetics || " ";
    // const {text,audio} = textAndAudio || " ";
    // const [mean] = meanings || " ";
    // const {partOfSpeech,definitions} = mean || "  ";
    // const define = definitions[0].definition || " ";
    if (!response.data || response.data.length === 0) {
        throw new Error("No data found for the entered word.");
      }
      const rawData = response.data[0];
      const word = rawData.word || "N/A";
      const phonetic =rawData.phonetic || "N/A";
      const phonetics = rawData.phonetics && rawData.phonetics.length > 0 ? rawData.phonetics[0] : {};
      const pronunciation = phonetics.text || "N/A";
    const audio = phonetics.audio || "N/A";
    const meanings = rawData.meanings && rawData.meanings.length > 0 ? rawData.meanings[0] : {};
    const partOfSpeech = meanings.partOfSpeech || "N/A";

    const definitions = meanings.definitions && meanings.definitions.length > 0 ? meanings.definitions[0] : {};
    const definition = definitions.definition || "Definition not available.";
   
    data = { word, phonetic, partOfSpeech, definition, audio };
    console.log(data)
res.render("index.ejs",{info:data});
}catch(err){
    console.log("unable to get data from the api",err);
    res.render("index.ejs");
}
});
app.post("/submit",(req,res)=>{
  enteredValue= req.body["value"];
  console.log(enteredValue);
  res.redirect("/");
})



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})
 // const {word,phonetics,meanings} = word1;
    
    // const [mainThing] = meanings;
    // const {partOfSpeech,definitions} = mainThing;
    // const [,textAndAudio] = phonetics;
    // const {text,audio} = textAndAudio;
    // data["word"]=word;
    // data["pronounciation"]=text || " ";
    // data["partofspeech"]=partOfSpeech;
    // data["definition"]=definitions[0].definition;
    // data["audio"]=audio;
    // console.log(phonetics);
    // console.log(rawData)