import { useStorageLocal } from '~/composables/useStorageLocal'

// export const storageDemo = useStorageLocal('webext-demo', 'Storage Demo')

const defaultConfig = {
  host: 'https://api.openai.com',
  key: 'sk-***',
}

export const config = useStorageLocal('flomo-review-config', defaultConfig)
