import { defineStore } from 'pinia'

export const useCryptoStore = defineStore('cryptoStore', {
  state: () => ({
    cryptoData: []
  }),
  actions: {
    setCryptoData(data) {
      this.cryptoData = data
    }
  }
})
