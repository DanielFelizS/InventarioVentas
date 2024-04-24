import React from "react";
import FormSelect from "react-bootstrap/esm/FormSelect";
import Form from "react-bootstrap/Form";
export default function Select({ Options, SelectLabel, SelectValue, SelectChange, OptionLabel }) {
  return (
    <>
      <Form.Label>{SelectLabel ? SelectLabel : null}</Form.Label>
      <FormSelect value={SelectValue} onChange={SelectChange}>
        <option disabled>{OptionLabel}</option>
        {Options}
      </FormSelect>

      {/* <select value={departamentoId} onChange={handleDepartamentoChange} className="SelectData">
            <option disabled>Nombre del departamento</option>
            {departamentos.map((departamento) => (
              <option key={departamento.id} value={departamento.id}>
                {departamento.nombre}
              </option>
            ))}
          </select> */}
    </>
  );
}
