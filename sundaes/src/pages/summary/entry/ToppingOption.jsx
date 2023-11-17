import { useState } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { useOrderDetails } from "../../../contexts/OrderDetails";

export default function ToppingOption({ name, pathImage }) {
  const { updateItemCount } = useOrderDetails();

  const [checked, setChecked] = useState(false);

  const handleChange = (e) => {
    const newValue = e.target.checked;
    const updateCount = newValue ? 1 : 0;
    updateItemCount(name, updateCount, "toppings");
    setChecked(newValue);
  };

  return (
    <Col style={{ textAlign: "center" }}>
      <img
        style={{ width: "75%" }}
        src={`http://localhost:3030${pathImage}`}
        alt={`${name} topping`}
      />
      <Form.Group controlId={name}>
        <Form.Check
          type="checkbox"
          checked={checked}
          label={name}
          onChange={handleChange}
        ></Form.Check>
      </Form.Group>
    </Col>
  );
}
