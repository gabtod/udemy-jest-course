import Alert from "react-bootstrap/Alert";

export default function AlertBanner({ message = null, variant = null }) {
  const alertMessage =
    message ?? "An unexpected error occured. Please try again.";

  const alertVariant = variant ?? "danger";

  return <Alert style={{ backgroundColor: "red" }}>{alertMessage}</Alert>;
}
