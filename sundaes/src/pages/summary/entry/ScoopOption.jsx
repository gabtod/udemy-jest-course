import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useOrderDetails } from "../../../contexts/OrderDetails";
import { useState } from "react";

export default function ScoopOtion({ name, imagePath }) {
  const { updateItemCount } = useOrderDetails();
  const [isValid, setIsValid] = useState(true);

  const handleChange = (e) => {
    const currentValue = e.target.value;
    const currentValueFloat = parseFloat(currentValue);
    const isValidValue =
      0 <= currentValueFloat &&
      currentValue <= 10 &&
      //is this an integer?
      Math.floor(currentValueFloat) === currentValueFloat;

    setIsValid(isValidValue);
    const value = isValidValue ? parseInt(currentValue) : 0;
    updateItemCount(name, parseInt(value), "scoops");
  };

  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: "center" }}>
      <img
        style={{ width: "75%" }}
        src={`http://localhost:3030/${imagePath}`}
        alt={`${name} scoop`}
      />
      <Form.Group
        controlId={`${name}-count`}
        as={Row}
        style={{ marginTop: "10px" }}
      >
        <Form.Label column xs="6" style={{ textAlign: "center" }}>
          {name}
        </Form.Label>
        <Col xs="5" style={{ textAlign: "left" }}>
          <Form.Control
            type="number"
            defaultValue={0}
            onChange={handleChange}
            isInvalid={!isValid}
          ></Form.Control>
        </Col>
      </Form.Group>
    </Col>
  );
}
