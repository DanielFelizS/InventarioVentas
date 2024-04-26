import BtnAction from "../../atoms/Button/Button";
import { MdDelete, MdEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export const TableButtons = ({ DataNavigate, EditarProp, EliminarProp }) => {

    const navigate = useNavigate();

    const NavigateEdit = (data) => {
      navigate(`/${EditarProp}/${data.id}`);
    };
    const NavigateDelete = (data) => {
      navigate(`/${EliminarProp}/${data.id}`);
    };

  return (
    <div id='TableActions'>
      <BtnAction
        btnContent={<MdEdit />}
        btnColor="outline-warning"
        btnClick={() => NavigateEdit(DataNavigate)}
      />
      <BtnAction
        btnContent={<MdDelete />}
        btnColor="outline-danger"
        btnClick={() => NavigateDelete(DataNavigate)}
      />
    </div>
  );
};

export default TableButtons;
