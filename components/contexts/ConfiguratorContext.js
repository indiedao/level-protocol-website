import { useMemo, useCallback, useEffect, createContext, useState } from 'react'
import useWeb3 from '../hooks/useWeb3'

const ConfiguratorContext = createContext()

const STEPS = ['NFT', 'COLOR', 'SAVE']

export const ConfiguratorProvider = ({ children }) => {
  const [flow, setFlow] = useState()
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
    setFlow(hasLvlToken ? 'CONFIG' : 'MINT')
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
    const message = `Saving NFT ${nftId} as profile image`
    const signature = await signer.signMessage(message, address)
    await fetch('/api/save-config', {
      method: 'POST',
      body: JSON.stringify({
        address,
        nftAddress,
        nftId,
        signature,
        message,
      }),
    })
    setIsSaved(true)
  }, [nftAddress, nftId, address, signer])

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
