<template>
  <div>
    <coin-price-modal
      v-if="modalSettings.isModalOpen"
      :coinId="coinId"
      :currency-symbol="'EUR'"
      @add-alert="submit"
      @close-modal="closeModal"
      :coin-data="coinAlertData"
      :is-form-show="modalSettings.isFormShow"
    />
    <div class="coin-page" v-if="coinData !== null">
      <div class="coin-page-info">
        <div class="coin-page-info-image">
          <img :src="coinData.image.small" alt="" />
        </div>
        <div class="coin-page-info-full-name">
          {{ coinData.name }}
        </div>
        <div class="coin-page-info-sybmol">
          {{ coinData.symbol }}
        </div>
      </div>
      <div class="coin-page-current-price">
        {{ currentPrice }} EUR
      </div>
      <div class="coin-page-alert">
        <div class="row">
          <div class="coin-page-alert-header">
            Price Alerts
          </div>
          <div @click="openModal" class="coin-page-alert-add">
            + New Price alert
          </div>
        </div>

        <div class="coin-page-alert-table">
          <div class="coin-page-alert-table-header">
            <div>Currency</div>
            <div>Alert Price</div>
            <div>Set on</div>
            <div>Delete</div>
          </div>

          <div
            class="coin-page-alert-table-content"
            v-if="this.priceAlertList && priceAlertList[coinId]"
          >
            <div
              class="coin-page-alert-table-row"
              v-for="(priceAlertItem, priceAlertItemKey) in priceAlertList[
                coinId
              ]"
              :key="priceAlertItemKey"
            >
              <div class="coin-page-alert-data">
                <div class="coin-page-alert-data-image">
                  <img :src="coinData.image.small" alt="" />
                </div>
                <div class="coin-page-alert-data-full-name">
                  {{ coinData.name }}
                </div>
                <div class="coin-page-alert-data-sybmol">
                  {{ coinData.symbol }}
                </div>
              </div>
              <div class="coin-page-alert-price-value">
                1 {{ coinData.symbol }} > {{ priceAlertItem.price }}
              </div>
              <div class="coin-page-alert-price-created">
                {{ priceAlertItem.createdAt | formatDate }}
              </div>
              <div class="coin-page-alert-remove">
                <div
                  @click="removePriceAlert(priceAlertItemKey)"
                  class="coin-page-alert-remove-icon"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getCoinDetails } from '../services/http.js';
import CoinPriceModal from './CoinPriceModal.vue';
export default {
  name: 'CoinPage',
  components: { CoinPriceModal },
  data() {
    return {
      coinId: null,
      coinData: null,
      coinAlertData: { alertInfo: null, coinInfo: null },
      modalSettings: { isModalOpen: false, isFormShow: true },
      currentPrice: null,
      priceAlertList: {},
    };
  },
  watch: {
    currentPrice(watchedPrice) {
      if (
        this.coinId in this.priceAlertList &&
        this.priceAlertList[this.coinId].length
      ) {
        this.priceAlertList[this.coinId].every((val, index) => {
          if (val.id === this.coinId && watchedPrice > val.price) {
            if (!this.modalSettings.isModalOpen) {
              this.coinAlertData.alertInfo = this.priceAlertList[this.coinId][
                index
              ];
              this.modalSettings.isModalOpen = true;
              this.modalSettings.isFormShow = false;
            }
          }
        });
      }
    },
  },
  methods: {
    submit(value) {
      if (!(this.coinId in this.priceAlertList)) {
        this.priceAlertList[this.coinId] = [];
      }

      this.priceAlertList[this.coinId].push(value);

      localStorage.setItem(
        'priceAlertList',
        JSON.stringify(this.priceAlertList)
      );
      this.modalSettings.isModalOpen = false;
    },
    openModal() {
      this.modalSettings.isFormShow = true;
      this.modalSettings.isModalOpen = true;
    },
    closeModal() {
      this.modalSettings.isModalOpen = false;
    },
    removePriceAlert(itemIndex) {
      this.priceAlertList[this.coinId].splice(itemIndex, 1);
      localStorage.setItem(
        'priceAlertList',
        JSON.stringify(this.priceAlertList)
      );
    },
  },
  created() {
    this.coinId = this.$route.params.coinId;
    getCoinDetails(this.coinId).then((response) => {
      this.coinData = response.data;
      this.coinAlertData.coinInfo = {
        fullName: response.data.name,
        symbol: response.data.symbol,
        image: response.data.image.small,
        currentPrice: response.data.market_data.current_price.eur,
        currencyName: 'EUR',
      };
      this.currentPrice = response.data.market_data.current_price.eur;
    });
    setInterval(() => {
      getCoinDetails(this.coinId).then((response) => {
        this.currentPrice = response.data.market_data.current_price.eur;
      });
    }, 10000);
  },
  mounted() {
    let savedPriceAlertList = localStorage.getItem('priceAlertList');
    if (savedPriceAlertList) {
      this.priceAlertList = JSON.parse(savedPriceAlertList);
    }
  },
};
</script>

<style lang="scss" scoped>
.row {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.coin-page {
  max-width: 842px;
  margin: 0 auto;
  &-current-price {
    width: 213px;
    height: 32px;
    margin : 10px 0;
    font-style: normal;
    font-weight: bold;
    font-size: 32px;
    color: #333333;
  }
  &-info {
    display: flex;
    flex-direction: row;
    align-items: center;
    & > *:first-child {
      margin-right: 16px;
    }
    &-sybmol {
      margin-left: 6px;
      text-transform: uppercase;
    }
  }
  &-alert {
    &-add {
      font-weight: 500;
      font-size: 14px;
      line-height: 22px;
      text-align: right;
      color: #009efc;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      &:hover {
        cursor: pointer;
      }
    }
    &-header {
      font-family: Rubik;
      font-style: normal;
      font-weight: 500;
      font-size: 18px;
      line-height: 22px;
      color: #333333;
      display: flex;
      align-items: center;
      justify-content: flex-start;
    }
    &-data {
      display: flex;
      flex-direction: row;
      align-items: center;
      & > *:first-child {
        margin-right: 16px;
      }
      &-sybmol {
        margin-left: 6px;
        text-transform: uppercase;
      }
    }
    &-remove {
      &-icon {
        width: 24px;
        height: 24px;
        position: relative;
        &:hover {
          cursor: pointer;
        }
        &:after {
          content: '';
          width: 16px;
          height: 16px;
          background: url('../assets/bin.svg') center no-repeat;
          position: absolute;
          top: 0;
          left: 0;
        }
      }
    }
  }
  &-alert-table {
    width: 100%;
    display: flex;
    flex-direction: column;
    background: #fff;
    &-row {
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      & > * {
        display: flex;
        flex: 1 1 auto;
        justify-content: center;
        &:first-child {
          flex: 2 1 auto;
          justify-content: flex-start;
        }
      }
    }
    &-header {
      display: flex;
      width: 100%;
      & > * {
        display: flex;
        flex: 1 1 auto;
        align-items: center;
        justify-content: center;
        &:first-child {
          flex: 3 1 auto;
        }
      }
    }
    &-content {
      display: flex;
      width: 100%;
      flex-direction: column;
    }
  }
}
.modal-block {
  display: flex;
  width: 100%;
  height: 100%;
  position: absolute;
  align-content: center;
  justify-content: center;
}
</style>
