import React from "react";
import FormSelect from "react-bootstrap/esm/FormSelect";
import Form from "react-bootstrap/Form";
export default function Select({ Options, SelectLabel }) {
  return (
    <>
      <Form.Label>{SelectLabel}</Form.Label>
      <FormSelect>{Options}</FormSelect>
    </>
  );
}
