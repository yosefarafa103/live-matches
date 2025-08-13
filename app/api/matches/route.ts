import axios from "axios";
import parse from "node-html-parser";
export interface Match {
    channels: string;
    teams: string[];
    matchTime: string;
    matchResults: string[];
    leagueName: string;
    teamsImages: string[]
}
export async function GET(req: Request, res: Response) {
    try {
        const url = `https://www.yallakora.com/match-center`;
        const { data } = await axios.get(url);
        const htmlContent = parse(data);
        const matchesList = htmlContent.querySelectorAll(
            ".mtchCntrContainer .matchesList"
        );

        let results;
        const matches = Array.from(matchesList).map((match) => {
            let leagueMatches: [] = [];
            let matchData = match.querySelectorAll(".ul .liItem");
            matchData?.map((league) => {
                // @ts-ignore
                let m: Match = {};
                m["leagueName"] = match.querySelector(".title>a h2")?.textContent.trim()!
                m["channels"] =
                    league?.querySelector(".channel")?.textContent || "غير معرف";
                m["teams"] = [
                    league?.querySelector(".teamCntnr .teamsData .teams.teamA p")
                        ?.textContent!,
                    league?.querySelector(".teamCntnr .teamsData .teams.teamB p")
                        ?.textContent!,
                ];
                m["matchTime"] = league?.querySelector(
                    ".teamCntnr .teamsData .MResult .time"
                )?.textContent!;
                m["matchResults"] = [
                    league?.querySelector(".teamCntnr .teamsData .MResult")?.children[0]
                        ?.textContent!,
                    league?.querySelector(".teamCntnr .teamsData .MResult")?.children[2]
                        ?.textContent!,
                ];
                m["teamsImages"] = [
                    league?.querySelector(".teamCntnr .teamsData .teams.teamA>img")
                        ?.getAttribute("src")!,
                    league?.querySelector(".teamCntnr .teamsData .teams.teamB>img")
                        ?.getAttribute("src")!
                ]
                results = new Map();
                results.set(match.classNames?.split(" ")[0], leagueMatches);
                // @ts-ignore
                leagueMatches.push(m);
                return m;
            });
            return leagueMatches;
        });

        return Response.json(matches);
    } catch (error: any) {
        console.error("Scraping error:", error.message);
        return Response.json({ error: "Failed to scrape site" }, { status: 500 })
    }
}