/* eslint-disable react/prop-types */
import BtnAction from '@components/atoms/Button/Button'
import Modal from "react-bootstrap/Modal";
import useDelete from "@hooks/useDelete";

export default function EliminarDatos({ urlDato, ruta, Entidad }) {
  const { eliminarDatos, NavigateHome } = useDelete({ url: urlDato, urlRuta: ruta });
  return (
    <div
      className="modal show"
      style={{ display: "block", position: "initial" }}
    >
      <Modal.Dialog>
        <Modal.Header closeButton>
          <Modal.Title>Eliminar {Entidad}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>¿Estás seguro de querer eliminar los datos de {Entidad}?</p>
        </Modal.Body>

        <Modal.Footer>
          <BtnAction btnColor="secondary" btnClick={NavigateHome} btnContent="Cerrar"/>
          <BtnAction btnColor="danger" btnClick={eliminarDatos} btnContent="Eliminar"/>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );
}
