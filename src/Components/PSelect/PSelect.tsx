import "./PSelect.css";
import Select from 'react-select';

function PSelect(props:any) {
  
  return (
    <Select
      ref={props.ref}
      name={props.name}
      id={props.id}
      isClearable={true}
      placeholder=""
      className={props.className}
      classNamePrefix={props.classNamePrefix}
      classNames={props.classNames}
      value={props.value}
      defaultValue={props.defaultValue}
      inputValue={props.inputValue}       //get input value
      onInputChange={props.onInputChange} //trigger when input change
      onChange={props.onChange}           //when menu option is picked
      onKeyDown={props.onKeyDown}
      onBlur={props.onBlur}               //hide menu
      menuIsOpen={props.menuIsOpen}       //open menu
      options={props.options}             //menu option list
      escapeClearsValue
      />
  )
}

export default PSelect;