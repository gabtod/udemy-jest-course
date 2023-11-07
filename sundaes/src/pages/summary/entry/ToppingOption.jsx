import Col from "react-bootstrap/Col";
export default function ToppingOption({ name, pathImage }) {
  return (
    <Col style={{ textAlign: "center" }}>
      <img
        style={{ width: "75%" }}
        src={`http://localhost:3030${pathImage}`}
        alt={`${name} topping`}
      />
    </Col>
  );
}
