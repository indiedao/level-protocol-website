import { useMemo, useCallback, useEffect, createContext, useState } from 'react'
import { NotUniqueError } from '../../util/errors/notUniqueError'
import useWeb3 from '../hooks/useWeb3'

const ConfiguratorContext = createContext()

export const STEPS = ['NFT', 'COLOR', 'SAVE']

const MAX_HUE = 360
const MAX_LIGHTNESS = 80
const MIN_LIGHTNESS = 30

export const ConfiguratorProvider = ({ children }) => {
  const [flow] = useState('CONFIG')
  const [currentStep, setCurrentStep] = useState(STEPS[0])
  const [nftId, setNftId] = useState()
  const [nftAddress, setNftAddress] = useState()
  const [nftSrc, setNftSrc] = useState()
  const [isSaved, setIsSaved] = useState(true)
  const [colorHue, setColorHue] = useState(Math.floor(Math.random() * MAX_HUE))
  const [colorLightness, setColorLightness] = useState(
    Math.floor(Math.random() * (MAX_LIGHTNESS - MIN_LIGHTNESS) + MIN_LIGHTNESS),
  )
  const [statusMessage, setStatusMessage] = useState('')
  const { bearerToken, hasLvlToken } = useWeb3()

  // Load existing configuration:
  useEffect(() => {
    // TODO load existing...
    // setFlow(hasLvlToken ? 'CONFIG' : 'MINT')
  }, [hasLvlToken])

  // Mark unsaved changes when any deps change:
  useEffect(() => {
    setIsSaved(false)
  }, [nftId, nftAddress, nftSrc])

  const setNft = useCallback(({ id, address: _address, src }) => {
    if (id === undefined || _address === undefined)
      throw new Error('Must include id and address when saving NFT!')
    setNftId(id)
    setNftAddress(_address)
    setNftSrc(src)
  }, [])

  const nextStep = useCallback(() => {
    const currentIndex = STEPS.indexOf(currentStep)
    if (currentIndex === STEPS.length - 1) return false
    setCurrentStep(STEPS[currentIndex + 1])
    return true
  }, [currentStep])

  const previousStep = useCallback(() => {
    const currentIndex = STEPS.indexOf(currentStep)
    if (currentIndex === 0) return false
    setCurrentStep(STEPS[currentIndex - 1])
    return true
  }, [currentStep])

  const setStep = useCallback(stepName => {
    const index = STEPS.indexOf(stepName)
    if (index < 0) return false
    setCurrentStep(STEPS[index])
    return true
  }, [])

  const save = useCallback(async () => {
    if (Number.isNaN(colorHue)) {
      throw new Error('Provided colorHue is not a number')
    } else if (Number.isNaN(colorLightness)) {
      throw new Error('Provided colorLightness is not a number')
    }

    const resp = await fetch('/api/create-member', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${bearerToken}`,
      },
      body: JSON.stringify({
        nftAddress,
        nftId: nftId.toString(),
        colorHue: Number(colorHue),
        colorLightness: Number(colorLightness),
      }),
    })

    setIsSaved(true)

    if (!resp.success) {
      const responseBody = await resp.json()
      if (responseBody?.data?.address) {
        throw new NotUniqueError('Already minted!')
      }
      throw new Error('Failed to save config!')
    }
  }, [nftAddress, nftId, bearerToken, colorHue, colorLightness])

  const setStatusIndicator = useCallback(({ message }) => {
    setStatusMessage(message)
  }, [])

  const memoizedData = useMemo(() => {
    return {
      flow,
      currentStep,
      nftId,
      nftAddress,
      nftSrc,
      save,
      isSaved,
      nextStep,
      previousStep,
      setStep,
      setNft,
      colorHue,
      setColorHue,
      colorLightness,
      setColorLightness,
      setStatusIndicator,
      statusMessage,
      previousStepAvailable: STEPS.indexOf(currentStep) !== 0,
      nextStepAvailable: STEPS.indexOf(currentStep) !== STEPS.length - 1,
    }
  }, [
    flow,
    currentStep,
    nftId,
    nftAddress,
    nftSrc,
    save,
    isSaved,
    nextStep,
    previousStep,
    setStep,
    setNft,
    colorHue,
    setColorHue,
    colorLightness,
    setColorLightness,
    setStatusIndicator,
    statusMessage,
  ])

  return (
    <ConfiguratorContext.Provider value={memoizedData}>
      {children}
    </ConfiguratorContext.Provider>
  )
}

export default ConfiguratorContext
