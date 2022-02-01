import Head from 'next/head'
import { useEffect } from 'react'

// const SERVER = 'https://smart-dustbin-iot.heroku.app/';
const SERVER = 'http://localhost:8000/webhooks/get'

export default function Home() {
  useEffect(() => {
    const interval = setInterval(async () => {
      const result = await fetch(SERVER).then((res) => res.json())
      console.log(result)
    }, 2500)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white">
      <Head>
        <title>Smart Dustbin </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="-mt-32 text-5xl font-bold tracking-wide text-slate-800">
        Smart Dustbin 🚮
      </h1>
      <div className="mt-24   flex w-3/5 items-center justify-around">
        <div className=" flex flex-col items-center text-2xl font-semibold text-slate-700">
          Dry Waste 📦
          <div className=" relative mt-4 h-52 w-40 rounded border-4 border-emerald-300">
            <p className="absolute left-14 text-slate-600">70%</p>
            <div
              style={{ height: '70%' }}
              className="absolute bottom-0 w-full bg-slate-500"
            ></div>
          </div>
        </div>
        <div className="flex flex-col items-center text-2xl font-semibold text-slate-700">
          Wet Waste 🥤
          <div className="relative mt-4 h-52 w-40 rounded border-4 border-emerald-300 ">
            <p className="text-slate-604 absolute left-14">70%</p>
            <div
              style={{ height: '70%' }}
              className="absolute bottom-0 w-full bg-slate-500"
            ></div>
          </div>
        </div>
      </div>
    </div>
  )
}
