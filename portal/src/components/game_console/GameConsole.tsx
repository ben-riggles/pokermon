import GameScreen from './GameScreen';
// import oaksLab from '../../assests/oaks_lab.png';
import Canvas from '../ui/Canvas';
import { useEffect } from 'react';

export default function GameConsole() {
  return (
    <>
      <div className='flex h-screen justify-center items-center w-full bg-purple-800'>
        {/* 
        <div
          id='power-display'
          className='min-[280px]:invisible   md:visible min-[900px]: top-1/4 left-1'
        >
         <div className='mx-auto h-[30px] w-[30px] relative shadow-[0_0_40px_10px_#FF0000]  z-30  bg-red-700 rounded-full' />
          <div className='text-white font-sans :text-lg'>POWER</div>
        </div>
        */}
        <div
          id='outer-screen'
          className='flex flex-col rounded justify-center items-center w-full h-[90%] bg-slate-500'
        >
          {/*higher res image needed*/}
          <div
            id='screen'
            className='hide-scrollbar justify-center overflow overflow-scroll items-center h-[90%] w-[90%]'
          >
            <Canvas />
            {/*
            <div className='overflow-scroll w-[1280px] h-[720px]'>
              <div className='w-[60px] h-[50px] bg-white left-[196px]'></div>
              <img className='object-none' src={pokermonMap} />
            </div>
            */}
          </div>
          <div className='text-lg mt-2 text-slate-100 font-sans'>
            POKERBOI <span className='text-red-500'>C</span>
            <span className='text-purple-300'>o</span>
            <span className='text-green-300'>l</span>
            <span className='text-yellow-100'>o</span>
            <span className='text-blue-300'>r</span>
          </div>
        </div>
      </div>
    </>
  );
}
