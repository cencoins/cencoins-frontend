import { getInitialServerSideProps } from "@/utils/getInitialServerSide";
import { GetServerSideProps } from "next";

interface Props {}

const AccountPayment = () => {
  return null;
};

export const getServerSideProps: GetServerSideProps<Props> = async (
  context,
) => {
  const ssrProps = await getInitialServerSideProps(context);

  if (!ssrProps.session) {
    return {
      redirect: {
        destination: `/${context.locale}`,
        permanent: false,
      },
    };
  }

  return {
    redirect: {
      destination: `/${context.locale}/account/payment/history`,
      permanent: false,
    },
  };
};

export default AccountPayment;
