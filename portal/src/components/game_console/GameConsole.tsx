import GameScreen from './GameScreen';

export default function GameConsole() {
  return (
    <>
      <div className='flex h-screen justify-center items-center px-10 lg:px-12 w-screen bg-purple-500'>
        <div className='flex container rounded justify-center items-center h-[90%] w-screen  bg-slate-500 z-10'>
          <div
            id='screen'
            className='hide-scrollbar justify-center items-center overflow-auto h-[90%] w-[90%] bg-slate-300'
          >
            <GameScreen />
            <div className='absolute right-0 z-30 text-slate-100 font-sans'>
              POKERBOI <span className='text-red-500'>C</span>
              <span className='text-purple-300'>o</span>
              <span className='text-green-300'>l</span>
              <span className='text-yellow-100'>o</span>
              <span className='text-blue-300'>r</span>
            </div>
          </div>
          <div className='absolute left-3 top-12 h-[15px] w-[15px] md:h-[20px] md:w-[20px] lg:h-[30px] lg:w-[30px] z-20 bg-red-500 rounded-full'></div>
          <div className='text-white font-sans text-[0.75rem] lg:text-lg absolute top-14 p-1'>
            POWER
          </div>
        </div>
      </div>
    </>
  );
}
