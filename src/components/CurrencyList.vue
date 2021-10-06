<template>
  <div>
    <div v-if="coinList.length" class="coins-list-table">
      <div class="coins-list-table-header">
        <div class="coins-list-header-name">Currency</div>
        <div class="coins-list-header-price">Price</div>
        <div class="coins-list-header-change">Change 24h</div>
        <div class="coins-list-market-cap">Market cap</div>
        <div class="coins-list-market-volume">Volume 24h</div>
        <div class="coins-list-price-graph">Price graph 7d</div>
      </div>
      <div class="coins-list-table-rows">
        <div
          v-for="coinItem in coinListPortion"
          :key="coinItem.id"
          class="coins-list-item"
          @click="
            $router.push({ name: 'CoinPage', params: { coinId: coinItem.id } })
          "
        >
          <div class="coins-list-item-name-group">
            <div class="coins-list-item-favorite">star</div>
            <img :src="coinItem.image" class="coins-list-item-image" />
            <div class="coins-list-item-name">{{ coinItem.name }}</div>
          </div>
          <div class="coins-list-item-price">{{ coinItem.current_price }}</div>
          <div class="coins-list-item-change">
            {{ coinItem.price_change_24h }}
          </div>
          <div class="coins-list-item-market-cup">
            {{ coinItem.market_cap }}
          </div>
          <div class="coins-list-item-volum">{{ coinItem.total_volume }}</div>
          <div class="coins-list-item-price-graph">grpah</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
export default {
  data() {
    return {
      coinList: [],
    };
  },

  computed: {
    coinListPortion: function() {
      return this.coinList.slice(0, 10);
    },
  },
  mounted() {
    const apiCurrencyListUrl =
      'api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=10&page=1&sparkline=falset';
    const config = {
      headers: { 'Access-Control-Allow-Origin': '*' },
    };
    axios
      .get(apiCurrencyListUrl, config)
      .then((response) => {
        if (response.status === 200) {
          this.coinList = response.data;
        }
      })
      .catch(() => {
        console.log('Error: get coins list api error occurred');
      });
  },
};
</script>
<style lang="scss" scoped>
.coins-list {
  &-table {
    display: flex;
    padding: 8px 18px;
    flex-direction: column;
  }

  &-table-header {
    display: flex;
    flex-direction: row;
    height: 24px;
    border-bottom: 1px solid #f5f5f5;
    box-sizing: border-box;
    margin-bottom: 8px;
    & > * {
      display: flex;
      align-items: center;
      justify-content: center;
      flex: 1 1 auto;
    }
  }
  &-header {
    &-name {
      flex: 1 1 auto;
    }
  }
  &-item {
    display: flex;
    height: 80px;
    align-items: center;
    justify-content: flex-start;
    border-bottom: 1px solid #f5f5f5;
    box-sizing: border-box;
    &:hover {
      cursor: pointer;
      background: #fff;
    }
    & > * {
      display: flex;
      height: 100%;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
      flex: 1 1 auto;
    }
    &-name-group {
      display: flex;
      flex-direction: row;
      flex: 1 1 auto;
    }
    &-image {
      height: 40px;
      width: auto;
    }
  }
}
</style>
