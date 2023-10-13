import Container from "@mui/material/Container";
import NormalSummon from "./NormalSummon";
import SummonModal from "./SummonModal";

function SummonPage() {
  return (
    <Container
      style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
    >
      <NormalSummon />
      <SummonModal />
    </Container>
  );
}

export default SummonPage;
