import { useEffect, useState } from "react";
import axios from "axios";

interface Cod4Map {
  mapID: number;
  mapname: string;
  releaseDate: Date | null;
  inRotation: boolean;
}

export default function App() {
  const [maps, setMap] = useState<Cod4Map[]>([]);

  useEffect(() => {
    const get = async () => {
      try {
        const maps = await axios.get<Cod4Map[]>(
          "http://localhost:3002/api/cod4/v1/maps"
        );
        setMap(maps.data);
      } catch {
        console.log("Something went wrong");
      }
    };
    get();
  }, []);

  return (
    <>
      <div className="underline">Hello world</div>
      <div className="flex flex-col items-center gap-4 w-full">
        {maps.map((map) => (
          <div>{`${map.mapname}, ${map.mapID}`}</div>
        ))}
      </div>
    </>
  );
}
