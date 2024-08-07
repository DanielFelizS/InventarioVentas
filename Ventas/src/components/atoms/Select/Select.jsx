/* eslint-disable react/prop-types */
import FormSelect from "react-bootstrap/esm/FormSelect";
import Form from "react-bootstrap/Form";
export default function Select({ Options, SelectLabel, SelectValue, SelectChange, OptionLabel }) {
  return (
    <>
      <Form.Label>{SelectLabel ? SelectLabel : null}</Form.Label>
      <FormSelect value={SelectValue} onChange={SelectChange}>
        <option disabled>{OptionLabel? OptionLabel: null}</option>
        {Options}
      </FormSelect>
    </>
  );
}
