import GameScreen from './GameScreen';

export default function GameConsole() {
  return (
    <>
      <div className='flex justify-center min-h-screen bg-gray-50 py-6 sm:py-12'>
        <div className='relative h-[500px] content-center w-[300px] rounded-t-md rounded-b-lg bg-purple-500'>
          <div className='absolute inset-x-5 rounded top-4 h-[240px] w-[260px] bg-slate-500 z-10'>
            <div
              id='screen'
              className='absolute center-flex overflow-auto inset-x-10 top-6 h-[180px] w-[180px] z-20 bg-slate-300'
            >
              <GameScreen />
            </div>
            <div className='absolute left-3 top-12 h-[10px] w-[10px] z-20 bg-red-500 rounded-full'></div>
            <div className='text-white font-sans text-[0.5rem] absolute top-14 p-1'>
              POWER
            </div>
            <div className='text-slate-100 font-sans right-20 absolute bottom-1'>
              POKERBOI <span className='text-red-500'>C</span>
              <span className='text-purple-300'>o</span>
              <span className='text-green-300'>l</span>
              <span className='text-yellow-100'>o</span>
              <span className='text-blue-300'>r</span>
            </div>
          </div>
          <div className='bg-slate-500 absolute left-12 bottom-40 h-[35px] w-[25px]'>
            <div className='border-solid top-2 left-[.15rem] border-slate-600 border-b-[15px] border-x-transparent border-x-[10px] border-t-0 absolute'></div>
          </div>
          <div className='bg-slate-500 absolute left-[4.5rem] bottom-[8.5rem] h-[25px] w-[35px]'>
            <div className='absolute border-solid border-l-slate-600 top-[0.15rem] left-3  border-l-[15px] border-y-transparent border-y-[10px] border-r-0'></div>
          </div>
          <div className='bg-slate-500 absolute left-12 bottom-[6.5rem] h-[35px] w-[25px]'>
            <div className='absolute top-2 left-[.15rem] border-solid border-t-slate-600 border-t-[15px] border-x-transparent border-x-[10px] border-b-0'></div>
          </div>
          <div className='bg-slate-500 absolute left-[0.80rem] bottom-[8.5rem] h-[25px] w-[35px]'>
            <div className='absolute border-solid border-r-slate-600 border-r-[15px] top-[0.15rem] left-2 border-y-transparent border-y-[10px] border-l-0'></div>
          </div>
          <div className='bg-slate-500 absolute left-11 bottom-[8.5rem] h-[25px] w-[28px]'></div>
          <div className='absolute right-24 bottom-24 rounded-full bg-slate-600 h-10 w-10 z-20'>
            <h1 className='text-slate-300 font-sans absolute left-[.80rem] top-[.15rem] text-2xl'>
              B
            </h1>
          </div>
          <div className='absolute right-10 bottom-32 rounded-full bg-slate-600 h-10 w-10 z-20'>
            <h1 className='text-slate-300 font-sans absolute left-[.80rem] top-[.15rem] text-2xl'>
              A
            </h1>
          </div>
          <div className='absolute h-2 w-6 bottom-16 left-28 bg-slate-600 rounded-full'></div>
          <div className='absolute h-2 w-6 bottom-16 right-28 bg-slate-600 rounded-full'></div>
        </div>
      </div>
    </>
  );
}
