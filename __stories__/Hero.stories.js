import styled from 'styled-components'

import HeroUI from '../components/ui/Hero/Hero'
import {
  DE_GLITCH_FACTOR,
  FLASH_MINIMUM_THRESHOLD,
  FLASH_PROBABILITY,
  GLITCH_BOUNCE_MAXIMUM,
  GLITCH_BOUNCE_PROBABILITY,
  GLITCH_SETTLED_THRESHOLD,
  GLITCH_SPEED,
  INITIAL_GLITCHY_NESS,
} from '../components/ui/Hero/glitchy-ness'

const Container = styled.div`
  min-height: 300vh;
`

const Template = ({
  'De-glitch Factor (.%)': deGlitchFactor,
  'Flash Minimum Threshold (.%)': flashMinimumThreshold,
  'Flash Probability (.%)': flashProbability,
  'Glitch Settled Threshold (.%)': glitchSettledThreshold,
  'Glitch Bounce Maximum (.%)': glitchBounceMaximum,
  'Glitch Bounce Probability (.%)': glitchBounceProbability,
  'Glitch Speed (ms)': glitchSpeed,
  'Initial Glitchy-ness (.%)': initialGlitchyNess,
}) => (
  <Container>
    <HeroUI
      deGlitchFactor={deGlitchFactor}
      flashMinimumThreshold={flashMinimumThreshold}
      flashProbability={flashProbability}
      glitchBounceMaximum={glitchBounceMaximum}
      glitchBounceProbability={glitchBounceProbability}
      glitchSettledThreshold={glitchSettledThreshold}
      glitchSpeed={glitchSpeed}
      initialGlitchyNess={initialGlitchyNess}
    />
  </Container>
)

export const Hero = Template.bind({})
Hero.args = {
  'Glitch Speed (ms)': GLITCH_SPEED,
  'Initial Glitchy-ness (.%)': INITIAL_GLITCHY_NESS,
  'De-glitch Factor (.%)': DE_GLITCH_FACTOR,
  'Glitch Settled Threshold (.%)': GLITCH_SETTLED_THRESHOLD,
  'Glitch Bounce Maximum (.%)': GLITCH_BOUNCE_MAXIMUM,
  'Glitch Bounce Probability (.%)': GLITCH_BOUNCE_PROBABILITY,
  'Flash Minimum Threshold (.%)': FLASH_MINIMUM_THRESHOLD,
  'Flash Probability (.%)': FLASH_PROBABILITY,
}

const Story = {
  title: 'Sections / Hero',
  component: Hero,
  argTypes: {
    'Glitch Speed (ms)': {
      description: 'The glitch speed is the milliseconds between iterations.',
      table: {
        defaultValue: {
          summary: GLITCH_SPEED,
        },
      },
      control: {
        type: 'range',
        min: 1,
        max: 250,
        step: 1,
      },
    },
    'Initial Glitchy-ness (.%)': {
      description:
        'The initial glitchy-ness is what decimal percent of the available field should be glitched upon first render.',
      table: {
        defaultValue: {
          summary: INITIAL_GLITCHY_NESS,
        },
      },
      control: {
        type: 'range',
        max: 1,
        min: 0,
        step: 0.01,
      },
    },
    'De-glitch Factor (.%)': {
      description:
        'The de-glitch factor is how fast the glitchy-ness cleans itself up, per iteration.',
      table: {
        defaultValue: {
          summary: DE_GLITCH_FACTOR,
        },
      },
      control: {
        type: 'range',
        max: 1,
        min: 0,
        step: 0.0001,
      },
    },
    'Glitch Settled Threshold (.%)': {
      description:
        'The glitch settled threshold is the decimal glitchy-ness that is allowed to persist always.',
      table: {
        defaultValue: {
          summary: GLITCH_SETTLED_THRESHOLD,
        },
      },
      control: {
        type: 'range',
        max: 1,
        min: 0,
        step: 0.01,
      },
    },
    'Glitch Bounce Maximum (.%)': {
      description:
        'The glitch bounce maximum is the highest decimal percent of the available field that can be re-glitched.',
      table: {
        defaultValue: {
          summary: GLITCH_BOUNCE_MAXIMUM,
        },
      },
      control: {
        type: 'range',
        max: 1,
        min: 0,
        step: 0.01,
      },
    },
    'Glitch Bounce Probability (.%)': {
      description:
        'The glitch bounce probability is the decimal percent chance that re-glitching will occur when the glitch has settled.',
      table: {
        defaultValue: {
          summary: GLITCH_BOUNCE_PROBABILITY,
        },
      },
      control: {
        type: 'range',
        max: 1,
        min: 0,
        step: 0.01,
      },
    },
    'Flash Minimum Threshold (.%)': {
      description:
        'The flash minimum threshold is the decimal percent of field that must be available to glitch such that all characters may be “flashed” in the same color.',
      table: {
        defaultValue: {
          summary: FLASH_MINIMUM_THRESHOLD,
        },
      },
      control: {
        type: 'range',
        max: 1,
        min: 0,
        step: 0.01,
      },
    },
    'Flash Probability (.%)': {
      description:
        'The flash probability is the decimal percentage chance that a flash can be shown when the minimum threshold has been met.',
      table: {
        defaultValue: {
          summary: FLASH_PROBABILITY,
        },
      },
      control: {
        type: 'range',
        max: 1,
        min: 0,
        step: 0.01,
      },
    },
  },
}

export default Story
