import { myToken } from "../../../utllties/tokenAndDurationControl";

export const getAlbums = async function (id: string, offset: number) {
  const tokens = myToken();
  const userToken = tokens?.userToken;
  const nonUserToken = tokens?.nonUserToken;
  const response = await fetch(
    `https://api.spotify.com/v1/artists/${id}/albums?limit=5&offset=${offset}`,
    {
      headers: {
        Authorization: "Bearer " + (userToken ? userToken : nonUserToken),
      },
    }
  );
  if (response.status === 404) {
    throw { message: "Page Not Found", status: 404 };
  }

  if (!response.ok) {
    const error = await response.json();
    throw error.error;
  }

  const jsonRespnse = response.json();
  return jsonRespnse;
};
