import AnimatedSection from '@/components/animated-section'
import { CheckCircle, Feather, Wind } from 'lucide-react'
import React from 'react'

const files = () => {
  return (
     <div className="mx-auto grid max-w-6xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 py-12">
              {/* Feature 1 */}
              <AnimatedSection delay={100}>
                <div className="flex flex-col items-center space-y-4 rounded-2xl bg-white/30 dark:bg-white/5 p-8 backdrop-blur-md shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl">
                  <CheckCircle className="h-10 w-10 text-pink-500 dark:text-pink-400" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Ultra Absorbent
                  </h3>
                  <p className="text-center text-gray-600 dark:text-gray-400">
                    Advanced absorption tech to keep you dry and comfy all day.
                  </p>
                </div>
              </AnimatedSection>

              {/* Feature 2 */}
              <AnimatedSection delay={200}>
                <div className="flex flex-col items-center space-y-4 rounded-2xl bg-white/30 dark:bg-white/5 p-8 backdrop-blur-md shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl">
                  <Wind className="h-10 w-10 text-pink-500 dark:text-pink-400" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Breathable Comfort
                  </h3>
                  <p className="text-center text-gray-600 dark:text-gray-400">
                    Soft and airy materials prevent irritation for lasting
                    freshness.
                  </p>
                </div>
              </AnimatedSection>

              {/* Feature 3 */}
              <AnimatedSection delay={300}>
                <div className="flex flex-col items-center space-y-4 rounded-2xl bg-white/30 dark:bg-white/5 p-8 backdrop-blur-md shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl">
                  <Feather className="h-10 w-10 text-pink-500 dark:text-pink-400" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Odor Neutralizing
                  </h3>
                  <p className="text-center text-gray-600 dark:text-gray-400">
                    Discreet odor control so you feel fresh and confident
                    always.
                  </p>
                </div>
              </AnimatedSection>
            </div>
  )
}

export default files