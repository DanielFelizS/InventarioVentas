/* eslint-disable react/prop-types */
import Button from "react-bootstrap/Button";

export default function BtnAction({ btnColor, btnClick, btnContent }) {
  return (
    <Button variant={btnColor} onClick={btnClick} style={{margin: "4px"}}>
      {btnContent}
    </Button>
  )
}
