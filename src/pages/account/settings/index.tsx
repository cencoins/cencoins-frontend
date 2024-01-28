import { getInitialServerSideProps } from "@/utils/getInitialServerSide";
import { GetServerSideProps } from "next";

interface Props {}

const AccountSettings = () => {
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
      destination: `/${context.locale}/account/settings/coins`,
      permanent: false,
    },
  };
};

export default AccountSettings;
