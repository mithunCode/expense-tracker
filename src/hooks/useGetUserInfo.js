const useGetUserInfo = () => {
  const { name, profilePhoto, userId, isLoggedIn } = JSON.parse(
    localStorage.getItem("auth") || {}
  );
  return { name, profilePhoto, userId, isLoggedIn };
};

export default useGetUserInfo;
