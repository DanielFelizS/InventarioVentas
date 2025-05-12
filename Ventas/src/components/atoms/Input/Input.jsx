/* eslint-disable react/prop-types */
import Form from "react-bootstrap/Form";

export default function FormInput ({
  InputTitle,
  InputType,
  InputPlaceholder,
  InputName,
  Inputvalue,
  InputChange,
}) {
  return (
    <>
      <Form.Label>{InputTitle ? InputTitle : null}</Form.Label>
      <Form.Control
        type={InputType}
        placeholder={InputPlaceholder ? InputPlaceholder: null}
        name={InputName ? InputName : null}
        value={Inputvalue}
        onChange={InputChange}
      />
    </>
  );
};
