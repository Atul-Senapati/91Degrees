import React from 'react'
import { SpinningText } from './spinning-text'
import { VideoText } from './video-text'

const PadLabels = () => {
  return (
    <div className="w-full py-8 md:py-16 lg:py-24 bg-pink-50 dark:bg-pink-950/30 transition-colors duration-300 " >pad-la
    
    
    <SpinningText reverse className="text-5xl" duration={20} radius={6}>
      learn more • earn more • grow more •
    </SpinningText>
    <div className="relative h-[200px] w-full overflow-hidden">
  <VideoText fontSize={"190"} src="https://cdn.magicui.design/ocean-small.webm">OCEAN</VideoText>
</div>
    </div>
  )
}

export default PadLabels
