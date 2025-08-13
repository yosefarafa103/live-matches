import Image from 'next/image'
import React from 'react'
import a from "@/public/imgs/nigeria12022_8_3_17_30.jpg"
import { Match } from '@/app/api/matches/route'
const MatchCard = ({ teams: [teamOne, teamTwo], matchTime, matchResults: [res1, res2], teamsImages: [t1, t2] }: Match) => {
    return (
        <div className='flex items-center justify-between p-5 bg-background'>
            <div className='flex-1 flex flex-col gap-2 items-center'>
                <Image src={t1} alt='team' width={30} height={40} />
                <p> {teamOne} </p>
            </div>
            <div className='flex-[2] text-center flex flex-col gap-3 items-center'>
                <section className='flex gap-3 sm:gap-10'>
                    <span className='border-solid border-2 border-shadow-background p-1'> {res1} </span> -
                    <span className='border-solid border-2 border-shadow-background p-1'> {res2} </span>
                </section>
                <h3> {matchTime} </h3>
            </div>
            <div className='flex-1 flex flex-col gap-2 items-center'>
                <Image src={t2} alt='team' width={30} height={40} />
                <p> {teamTwo} </p>
            </div>
        </div>
    )
}

export default MatchCard