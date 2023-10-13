import Container from "@mui/material/Container";
import NormalSummon from "./NormalSummon";

function SummonPage() {
  return (
    <Container
      style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
    >
      <NormalSummon />
    </Container>
  );
}

export default SummonPage;
