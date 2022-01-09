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
  deGlitchFactor,
  flashMinimumThreshold,
  flashProbability,
  glitchSettledThreshold,
  glitchBounceMaximum,
  glitchBounceProbability,
  glitchSpeed,
  initialGlitchyNess,
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
  glitchSpeed: GLITCH_SPEED,
  initialGlitchyNess: INITIAL_GLITCHY_NESS,
  deGlitchFactor: DE_GLITCH_FACTOR,
  glitchSettledThreshold: GLITCH_SETTLED_THRESHOLD,
  glitchBounceMaximum: GLITCH_BOUNCE_MAXIMUM,
  glitchBounceProbability: GLITCH_BOUNCE_PROBABILITY,
  flashMinimumThreshold: FLASH_MINIMUM_THRESHOLD,
  flashProbability: FLASH_PROBABILITY,
}

const Story = {
  title: 'Marketing / Hero',
  component: Hero,
  argTypes: {
    glitchSpeed: {
      description: 'The glitch speed is the milliseconds between iterations.',
      table: {
        type: {
          summary: '(1ms - 250ms)',
        },
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
    initialGlitchyNess: {
      description:
        'The initial glitchy-ness is what decimal percent of the available field should be glitched upon first render.',
      table: {
        type: {
          summary: '(0.0 - 1.0)',
        },
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
    deGlitchFactor: {
      description:
        'The de-glitch factor is how fast the glitchy-ness cleans itself up, per iteration.',
      table: {
        type: {
          summary: '(0.0 - 1.0)',
        },
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
    glitchSettledThreshold: {
      description:
        'The glitch settled threshold is the decimal glitchy-ness that is allowed to persist always.',
      table: {
        type: {
          summary: '(0.0 - 1.0)',
        },
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
    glitchBounceMaximum: {
      description:
        'The glitch bounce maximum is the highest decimal percent of the available field that can be re-glitched.',
      table: {
        type: {
          summary: '(0.0 - 1.0)',
        },
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
    glitchBounceProbability: {
      description:
        'The glitch bounce probability is the decimal percent chance that re-glitching will occur when the glitch has settled.',
      table: {
        type: {
          summary: '(0.0 - 1.0)',
        },
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
    flashMinimumThreshold: {
      description:
        'The flash minimum threshold is the decimal percent of field that must be available to glitch such that all characters may be “flashed” in the same color.',
      table: {
        type: {
          summary: '(0.0 - 1.0)',
        },
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
    flashProbability: {
      description:
        'The flash probability is the decimal percentage chance that a flash can be shown when the minimum threshold has been met.',
      table: {
        type: {
          summary: '(0.0 - 1.0)',
        },
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
