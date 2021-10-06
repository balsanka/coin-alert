<template>
  <div class="home">
    <currency-list/>
  </div>
</template>

<script>
// @ is an alias to /src
import CurrencyList from '../components/CurrencyList.vue'

export default {
  name: 'Home',
  components: {
    CurrencyList
  }
}
</script>
