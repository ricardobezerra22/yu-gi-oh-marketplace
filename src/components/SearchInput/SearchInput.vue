<template>
  <div class="search-input">
    <v-text-field
      :label="$t('search.placeholder')"
      v-model="search"
      variant="outlined"
      class="search"
      height="20"
      clearable
      @update:modelValue="handleSearch"
      @keyup.enter="handleSearch"
    >
      <template v-slot:append-inner>
        <v-icon @click="handleSearch" color="#a94040">mdi-magnify</v-icon>
      </template>
    </v-text-field>
  </div>
</template>

<script>
export default {
  name: 'SearchInput',
  data() {
    return {
      search: ''
    }
  },
  methods: {
    handleSearch() {
      this.$emit('search', this.search)
    }
  }
}
</script>

<style scoped src="./style.scss"></style>
