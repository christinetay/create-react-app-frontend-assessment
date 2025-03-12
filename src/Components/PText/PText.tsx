import './PText.css';
import parse from 'html-react-parser';

function PText(props: any) {

  var keyword: string = props.keyword;
  var replaceText: string = keyword? props.text.replace(keyword, "<b>"+ keyword +"</b>"):props.text;
  var processedText = parse(replaceText);

  return (
    <span className={props.className} id={props.id} onClick={props.onClick}>{processedText}</span>
  )
} 


export default PText;