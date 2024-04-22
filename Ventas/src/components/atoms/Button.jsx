import Button from "react-bootstrap/Button";

export default function BtnAction({ btnColor, btnClick, btnContent }) {
  return (
    <Button variant={btnColor} onClick={btnClick}>{btnContent}</Button>
  )
}
