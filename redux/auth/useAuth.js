import { useSelector } from "react-redux";
import { getUser, getError } from "./authSelectors";

export const useAuth = () => {
//   const isLoggedIn = useSelector(getIsLoggedIn);
  const isError = useSelector(getError);
  const user = useSelector(getUser);

  return {
    // isLoggedIn,
    isError,
    user,
  };
};
