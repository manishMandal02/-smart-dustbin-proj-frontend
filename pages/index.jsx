import Head from 'next/head'
import { useEffect, useState } from 'react'
import axios from 'axios'

const SERVER = 'https://smart-dustbin-bms.herokuapp.com/webhooks/get'
// const SERVER = 'http://localhost:8000/webhooks/get'

export default function Home() {
  const [isActive, setIsActive] = useState(false)
  const [dryDustbin, setDryDustbin] = useState(0)
  const [wetDustbin, setWetDustbin] = useState(0)
  useEffect(() => {
    const interval = setInterval(async () => {
      if (isActive) {
        const { data: result } = await axios(SERVER)
        console.log(result)
        if (result) {
          setWetDustbin(
            (result.wetDustbinPercentage < 0
              ? 0
              : result.wetDustbinPercentage > 100
              ? 100
              : result.wetDustbinPercentage) || 0
          )
          setDryDustbin(
            (result.dryDustbinPercentage < 0
              ? 0
              : result.dryDustbinPercentage > 100
              ? 100
              : result.dryDustbinPercentage) || 0
          )
        }
      }
    }, 1500)

    return () => {
      clearInterval(interval)
    }
  }, [isActive])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white">
      <Head>
        <title>Smart Dustbin </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="-mt-32 text-4xl font-bold tracking-wide text-slate-800">
        Smart Dustbin 🚮
      </h1>
      <div className="mt-24 flex w-3/5 items-center justify-around">
        {isActive ? (
          <>
            <div className=" flex flex-col items-center text-xl font-semibold text-slate-700">
              Dry Waste 📦
              <div className=" relative mt-4 h-52 w-40 rounded border-4 border-emerald-300">
                <p className="absolute left-14 text-slate-600">{dryDustbin}%</p>
                <div
                  style={{ height: `${dryDustbin}%` }}
                  className="absolute bottom-0 w-full bg-teal-300 transition-all duration-1000"
                ></div>
              </div>
            </div>
            <div className="ml-4 flex flex-col items-center text-xl font-semibold text-slate-700">
              Wet Waste 🥤
              <div className="relative mt-4 h-52 w-40 rounded border-4 border-emerald-300 ">
                <p className="text-slate-604 absolute left-14">{wetDustbin}%</p>
                <div
                  style={{ height: `${wetDustbin}%` }}
                  className="absolute bottom-0 w-full bg-slate-500 transition-all duration-1000"
                ></div>
              </div>
            </div>
          </>
        ) : (
          <button
            onClick={() => {
              setIsActive(true)
            }}
            className="rounded border-2 border-emerald-400 py-2 px-16  text-2xl font-semibold text-slate-600 transition-all duration-100 hover:bg-emerald-400 hover:text-white"
          >
            Start
          </button>
        )}
      </div>
    </div>
  )
}
