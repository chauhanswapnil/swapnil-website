import Documentation from "../../components/Documentation";
import Editor from "../../components/Editor";
import LoxIntro from "../../components/LoxIntro";

export default function Playground() {
  return (
    <div>
      <LoxIntro />
      <Editor />
      <Documentation />
    </div>
  );
}
