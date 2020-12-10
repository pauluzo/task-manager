export const refreshTokenSetup = (res) => {
  //Time to renew access token.
  let refreshTiming = (res.tokenObj.expires_in || 3600 - 5 * 60) * 1000;

  const refreshToken = async () => {
    const newAuthRes = await res.reloadAuthResponse();
    refreshTiming = (newAuthRes.tokenObj.expires_in || 3600 - 5 * 60) * 1000
    console.log('newAuthRes:', newAuthRes);
    // console.log the user token
    console.log('new auth token', newAuthRes.id_token);
    // recursive function to get new token after timeout.
    setTimeout(refreshToken, refreshTiming);
  };

  // setup first token refresh timer
  setTimeout(refreshToken, refreshTiming);
};