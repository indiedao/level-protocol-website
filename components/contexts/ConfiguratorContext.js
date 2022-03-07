import { useMemo, useCallback, useEffect, createContext, useState } from 'react'
import useWeb3 from '../hooks/useWeb3'

const ConfiguratorContext = createContext()

const STEPS = ['NFT', 'COLOR', 'SAVE']

export const ConfiguratorProvider = ({ children }) => {
  const [flow] = useState('CONFIG')
  const [currentStep, setCurrentStep] = useState(STEPS[0])
  const [nftId, setNftId] = useState()
  const [nftAddress, setNftAddress] = useState()
  const [isSaved, setIsSaved] = useState(true)
  const [colorHue, setColorHue] = useState(860)
  const [colorLightness, setColorLightness] = useState(60)
  const [statusMessage, setStatusMessage] = useState('')
  const { signer, address, hasLvlToken } = useWeb3()

  // Load existing configuration:
  useEffect(() => {
    // TODO load existing...
    // setFlow(hasLvlToken ? 'CONFIG' : 'MINT')
  }, [hasLvlToken])

  // Mark unsaved changes when any deps change:
  useEffect(() => {
    setIsSaved(false)
  }, [nftId, nftAddress])

  const setNft = useCallback(({ id, address: _address }) => {
    if (id === undefined || _address === undefined)
      throw new Error('Must include id and address when saving NFT!')
    setNftId(id)
    setNftAddress(_address)
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
    const message = 'Sign to join the early access list!'
    const signature = await signer.signMessage(message, address)

    if (Number.isNaN(colorHue)) {
      throw new Error('Provided colorHue is not a number')
    } else if (Number.isNaN(colorLightness)) {
      throw new Error('Provided colorLightness is not a number')
    }

    const resp = await fetch('/api/save-config', {
      method: 'POST',
      body: JSON.stringify({
        address,
        nftAddress,
        nftId: nftId.toString(),
        signature,
        message,
        colorHue: Number(colorHue),
        colorLightness: Number(colorLightness),
      }),
    })

    setIsSaved(true)

    if (resp.status !== 200) throw new Error('Failed to save config!')
  }, [nftAddress, nftId, address, signer, colorHue, colorLightness])

  const setStatusIndicator = useCallback(({ message }) => {
    setStatusMessage(message)
  }, [])

  const memoizedData = useMemo(() => {
    return {
      flow,
      currentStep,
      nftId,
      nftAddress,
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
