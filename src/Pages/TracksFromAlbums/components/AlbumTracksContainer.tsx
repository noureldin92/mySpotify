import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { getAlbumTracks } from "../Functions/getAlbumTracks";
import { useSearchParams } from "react-router-dom";
import { errorContent } from "../../../utllties/interfaces";
import TrackItem from "../../PlaylistsPage/components/playlistDetailsAndTracksComponents/TrackItem";
import { albumTracks } from "../Types/types";
import ArtisitsImage from "./ArtisitsImage";

const AlbumTracksContainer = () => {
  const [params] = useSearchParams();
  const albumId = params.get("albumId");
  const { data, isFetched }: UseQueryResult<albumTracks, errorContent> =
    useQuery({
      queryKey: ["AlbumTraks", albumId],
      queryFn: () => getAlbumTracks(albumId!),
    });
  isFetched && console.log(data);

  return (
    <main className="bg-lightGreen p-6 m-2 rounded-xl">
      <section className="bg-light/50 rounded-xl py-6 flex flex-col-reverse justify-between items-center gap-y-4 lg:flex-row lg:justify-evenly lg:items-center ">
        <div className="w-3/4 lg:w-1/2">
          {isFetched &&
            data?.items.map((item) => {
              return (
                <>
                  <TrackItem track={item} />
                </>
              );
            })}
        </div>
        <ArtisitsImage />
      </section>
    </main>
  );
};

export default AlbumTracksContainer;
