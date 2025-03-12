import { useState, useEffect, useRef } from 'react';
import './App.css';
import PImage from './Components/PImage/PImage';
import PText from './Components/PText/PText';
import PButton from './Components/PButton/PButton';
import PSelect from './Components/PSelect/PSelect';
import singaporeLion from './Assets/Images/singapore-lion.png';
import searchIcon from './Assets/Images/search.png';
import clearIcon from './Assets/Images/clear.png';

function App() {

  const selectRef = useRef(null);
  const [selectedOptionData, setSelectedOptionData]: any = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [fullOptionDataList, setFullOptionDataList] = useState<any>([]);
  const [currentOptionDataList, setCurrentOptionDataList] = useState<any>([]);
  const [resultDataList, setResultDataList] = useState<any>([]);
  const [countLabel, setCountLabel] = useState("");
  const [keyword, setKeyword] = useState("");

  // NOTE: not working
  function onTextTyping(currentInputValue: string, event: any) {
    console.log("..............................");
    console.log("@@ onTextTyping - event:", event);
    console.log("@@ onTextTyping - inputValue:", inputValue);

    if(inputValue.length < 2) 
      setCurrentOptionDataList([]); 
    
    //check for input field
    if (event.action === "input-change") {
      //reflect input text in field
      setInputValue(currentInputValue); 

      if(currentInputValue) {
        console.log("@@ onTextTyping - currentInputValue:", currentInputValue);
        if(currentInputValue.length >= 2) {
          setKeyword(currentInputValue);
          getOptionData(currentInputValue);
        }
          
      }
    }
    // type of event.action
    // 1. input-change = when input is key in ...
    // 2. set-value    = when option is chosen
    // 3. menu-close   = when menu div is closed
    // 4. input-blur   = when no more focus on input
  }

  function onOptionSelected(currentInputOption:any, event: any) {
    console.log("..............................");
    console.log("@@ onOptionSelected - event:", event);
    console.log("@@ onOptionSelected - inputValue:", inputValue);
    console.log("@@ onOptionSelected - currentInputOption:", currentInputOption);

    let currentRef: any = selectRef.current;
    console.log("@@ onOptionSelected - currentRef:", currentRef);
    
    setInputValue("");
    setSelectedOptionData(currentInputOption);
  }

  function onKeyDown(event: any) {
    console.log("..............................");
    console.log("@@ onKeyDown - event:", event);

    if (event.key === 'Enter') {
      console.log("@@ onKeyDown - Enter key is pressed...");
      onSubmit(event);
    }
  }

  async function onSubmit(event: any) {
    console.log("..............................");
    console.log("@@ onSubmit - event:", event);
    console.log("@@ onSubmit - inputValue:", inputValue);
    console.log("@@ onSubmit - selectedOptionData:", selectedOptionData);

    await getSearchData(); 
  }

  function onClear() {
    console.log("@@onClear ...");
    setInputValue("");
    setSelectedOptionData(null);
    setKeyword("");
  }

  function getOptionData(keyword: string) {

    console.log("..............................");
    console.log("@@getOptionData - keyword:", keyword);
    console.log("@@getOptionData - fullOptionDataList:", fullOptionDataList);

    // select data from fullOptionDataList 
    // and insert it as list into currentOptionDataList
    var optionDataList: any = [];
    fullOptionDataList.forEach((optionData: any) => {
      if (optionData.value.includes(keyword))
        optionDataList.push(optionData);
    });
    
    setCurrentOptionDataList(optionDataList);
  }

  async function getSearchData() {
    console.log("..............................");
    const temKeyword = selectedOptionData? selectedOptionData?.value: inputValue? inputValue: "";
    var countLabelMsg = "No result shown... ";
    var chosenDataList:any = [];
    setKeyword(temKeyword);

    console.log("@@ getSearchData - selectedOptionData:", selectedOptionData);
    console.log("@@ getSearchData - inputValue:", inputValue);
    console.log("@@ getSearchData - keyword:", temKeyword);
    if(temKeyword) { 
      await fetch(process.env.REACT_APP_QUERY_RESULT_URL)
      .then((response)=>response.json())
      .then((data)=> {

        console.log("@@getSearchData - data:", data);
        
        data.ResultItems.forEach((result:any)=> {
          if(result.DocumentTitle.Text.includes(temKeyword) ||
             result.DocumentExcerpt.Text.includes(temKeyword))
          chosenDataList.push(result);
        });

        var initialPageLength = chosenDataList.length > 0 ?data.Page: 0;
        if(initialPageLength > 0)
          countLabelMsg = "Showing "+ initialPageLength +" - "+ chosenDataList.length
                +" of "+ data.TotalNumberOfResults +" results";

      })
      .catch((error)=>{
        console.error("xxx getSearchData - Error:", error);
      });
    }

    setResultDataList(chosenDataList);
    setCountLabel(countLabelMsg);
  }

  function goToWebPage(uri: string) {
    console.log("..............................");
    console.log("@@ goToWebPage - uri:", uri);
    window.open(uri, '_blank');
  }

  useEffect(()=> {
      console.log("..............................");

      // fetch("https://gist.githubusercontent.com/yuhong90/b5544baebde4bfe9fe2d12e8e5502cbf/raw/e026dab444155edf2f52122aefbb80347c68de86/suggestion.json")
      fetch(process.env.REACT_APP_SUGGESTION_URL)
      .then(response => response.json())
      .then(data=> {
        console.log("@@useEffect data:", data);
        let optionDataList: any = [];
        for(var i=0; i < data.suggestions.length; i++) {
          optionDataList.push({id: i.toString(), value: data.suggestions[i], label: data.suggestions[i]});
        }
        setFullOptionDataList(optionDataList);
      })
      .catch(error=> {
        console.error("xxx getCompleteOptionDataList - Error:", error);
      });
    },[]);


  return (
    <div className="App">
      <div className="banner adjust-padding-div">
        <PImage 
          className="icon-image" 
          src={singaporeLion} 
          alt="singapore-lion"
        /> 
        <PText 
          className="banner-text" 
          text="An Official Website of the Singapore Government" 
          keyword="Singapore Government"
        />
      </div>

      <div className="search-bar adjust-padding-div" data-testid="my-select-component">
          <PSelect 
            ref={selectRef}
            name="search-input"
            id="search-input"
            className="search-input"
            classNamePrefix="search-input"
            options={currentOptionDataList}
            onInputChange={onTextTyping}
            inputValue={inputValue}
            onKeyDown={onKeyDown}
            onChange={onOptionSelected}
            value={selectedOptionData}
            onClearClassName="clear-button"
            onClear={onClear}
          />
          <PButton className="submit-button" 
            onClick={onSubmit}
            imageClassName="submit-search-icon"
            textClassName="submit-search-text"
            src={searchIcon}
            alt="search-icon"
            text="Search"
          />
          {
            keyword.length >= 2? 
              <PButton 
                className="clear-button" 
                onClick={onClear}
                imageClassName="clear-icon"
                src={clearIcon}
                alt="clear-icon"
                text="" 
              />
            :<></>
          }
      </div>


      <hr className='hr-line' />

      <div className='search-result-div adjust-padding-div'>
        <PText 
          className="show-count-result" 
          text={countLabel}
        />

        {resultDataList.map((result: any, index: number) => (
          <div className='result-div' key={index}>
            <PText 
              className="result-title-text" 
              text={result.DocumentTitle.Text} 
              id={index} 
              />
            <PText 
              className="result-description-text" 
              text={result.DocumentExcerpt.Text} 
              keyword={keyword} 
              id={index} 
            />
            <PText 
              className="result-link-text" 
              text={result.DocumentURI} 
              id={index} 
              onClick={()=>goToWebPage(result.DocumentURI)} 
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
