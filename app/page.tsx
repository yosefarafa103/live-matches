"use client"
import MatchCard from "@/components/MatchCard";
import { Separator } from "@/components/ui/separator";
import axios from "axios";
import { Match } from "./api/matches/route";
import { useQuery } from "@tanstack/react-query"
import { Loader2 } from "lucide-react";
export default function Home() {
  function groupByLeague(matches: Match[]) {
    return matches.reduce((grouped, match) => {
      const league = match.leagueName;
      // @ts-ignore
      if (!grouped[league]) {
        // @ts-ignore
        grouped[league] = [];
      }
      const { leagueName, ...rest } = match;
      // @ts-ignore
      grouped[league].push(rest);
      return grouped;
    }, {});
  }
  const getData = async () => {
    try {
      const result = await axios.get("https://live-matches-lake.vercel.app/api/matches");
      return result.data
    } catch (err) {
      console.log(err);
    }
  }
  const { data, isLoading } = useQuery({
    queryKey: ["matches_today"],
    queryFn: getData
  })
  // const data: Match[][] = await getData()
  return (
    <section className="px-[3.5vw]">
      <h3 className="my-5 mr-[10%] ">
        مباريات اليوم</h3>
      {isLoading ? <Loader2 className="mx-auto size-10 mt-10 animate-spin" /> :
        data?.map((el: Match[]) => {
          const l: {
            [key: string]: Match[]
          }
            = groupByLeague(el);
          const k = Object.keys(l)[0]
          return <>
            <section className="bg-background text-shadow-background w-[80%] max-sm:w-full mx-auto px-5 rounded-md border-amber-700  border-solid border-b-amber-700 border-2 rounded-bl-none border-r-[6px] py-5 mt-5">
              {k}
            </section>
            {l[k]?.map((match) => (
              <>
                <MatchCard key={"a"} {...match} />
                <Separator className="!w-[80%] mx-auto" />
              </>
            ))}
          </>
        })
      }

    </section>
  );
}
