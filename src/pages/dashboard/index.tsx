import { canSSAuth } from "../../utils/canSSAuth";

export default function Dashboard() {
  return <div>teste</div>
}

export const getServerSideProps = canSSAuth(async (ctx) => {
  return {
    props: {
    },
  };
});