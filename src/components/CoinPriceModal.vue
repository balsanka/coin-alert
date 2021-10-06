<template>
  <div class="modal-block">
    <div class="modal-background"></div>
    <div class="coin-price-alert">
      <div class="close-modal" @click="closeModal"></div>
      <div v-if="isFormShow" class="coin-price-alert-form">
        <div class="row">
          <div class="coin-price-alert-form-title">
            New price alert
          </div>
        </div>
        <div class="coin-price-alert-form-content">
          <div class="row row-vertical-center row-align-center">
            <div class="coin-price-alert-form-input-wrap">
              <input
                class="coin-price-alert-form-input"
                type="number"
                name="coinPriceAlert"
                v-model="coinPriceAlertForm.price"
              />
              <div class="coin-price-alert-form-input-label">
                {{ currencySymbol }}
              </div>
            </div>
          </div>
          <div class="row">
            <div
              class="coin-price-alert-form-save"
              @click.prevent="submit"
              name="Submit"
            >
              Save alert
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="row">
          <div class="bell-sign"></div>
        </div>
        <div class="row row-column">
          <div class="coin-price-alert-title">Pric Alert</div>
          <div class="coin-price-alert-text">
            {{ coinData.coinInfo.fullName }} just shot past
            {{ coinData.coinInfo.currentPrice }}
            {{ coinData.coinInfo.currencyName }}
          </div>
        </div>
        <div class="row">
          <div class="sepration-horizontal-line"></div>
        </div>
        <div class="row">
          <div class="coin-price-info">
            <div class="coin-price-name">
              <img :src="coinData.coinInfo.image" alt="" />
              <div class="coin-full-name">{{ coinData.coinInfo.fullName }}</div>
              <div class="coin-short-name">
                {{ coinData.coinInfo.symbol }}
              </div>
            </div>
            <div class="coin-alert-price">
              <div class="coin-alert-price-value">
                {{ coinData.alertInfo.price }}
              </div>
              <div class="coin-alert-price-created">
                {{ coinData.alertInfo.createdAt }}
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="btn btn-dismiss" @click="closeModal">Dismiss</div>
          <div class="btn btn-buy-sell">Buy & Sell</div>
        </div>
        <div class="row">
          <div class="update-alert">
            Update Alert
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CoinPriceModal',
  props: {
    coinId: null,
    coinName: null,
    coinPrice: null,
    currencyName: null,
    isFormShow: Boolean,
    coinData: null,
     currencySymbol:String
  },
  data() {
    return {
      coinPriceAlertForm: {
        id: this.coinId,
        price: null,
        percent: null,
        createdAt: null,
      },
    };
  },

  methods: {
    closeModal() {
      this.$emit('close-modal', true);
    },
    submit() {
      if (this.coinPriceAlertForm.price) {
        this.coinPriceAlertForm.createdAt = new Date();
        this.$emit('add-alert', this.coinPriceAlertForm);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.row {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  width: 100%;
  &-column {
    flex-direction: column;
  }
  &-vertical-center {
    margin: auto 0;
  }
  &-align-center {
    justify-content: center;
  }
}
.coin-price-alert {
  width: 600px;
  height: 471px;
  display: flex;
  position: relative;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  background: #ffffff;
  box-shadow: 0px 24px 32px rgba(0, 41, 89, 0.1);
  border-radius: 8px;
  padding: 24px;
  z-index: 999;
  top: 100px;
  &-form {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  &-title {
    font-family: Rubik;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 14px;
    display: flex;
    text-align: center;
    align-items: center;
    width: 100%;
    justify-content: center;
    color: #009efc;
    margin: 24px 0 8px 0;
  }

  &-text {
    font-family: Rubik;
    font-style: normal;
    font-weight: 600;
    font-size: 32px;
    line-height: 32px;
    text-align: center;
    color: #333333;
    display: flex;
    justify-content: center;
    width: 100%;
  }
  &-form {
    &-title {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: Rubik;
      font-style: normal;
      font-weight: 500;
      font-size: 18px;
      height: 22px;
      text-align: center;
      color: #333333;
    }
    &-content {
      display: flex;
      height: 100%;
      width: 100%;
      align-items: center;
      justify-content: flex-end;
      flex-direction: column;
    }
    &-input {
      font-family: Rubik;
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      color: #333333;
      background: #ffffff;
      border: 0;
      height: 100%;
      width: 100%;
      padding: 0 64px 0 24px;
      box-sizing: border-box;
      text-align: right;
      width: 320px;
      &:focus {
        outline: none;
      }
      &-percent {
        width: 190px;
      }
      &-wrap {
        border: 1px solid #eaeaea;
        position: relative;
        box-sizing: content-box;
        height: 56px;
        border-radius: 4px;
        &:last-child {
          margin-left: 24px;
        }
      }
      &-label {
        position: absolute;
        width: 44px;
        height: 100%;
        background: #f5f5f5;
        border-radius: 0px 4px 4px 0px;
        top: 0;
        right: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: Rubik;
      }
    }
    &-save {
      background: #009efc;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 48px;
      box-sizing: border-box;
      font-family: Rubik;
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 16px;
      text-align: center;
      color: #ffffff;
      &:hover {
        cursor: pointer;
      }
    }
  }
}
.separation-horizontal-line {
  height: 1px;
  background: #eaeaea;
  margin: 24px 0;
}
.modal-block {
  display: flex;
  width: 100%;
  height: 100%;
  position: absolute;
  align-content: center;
  justify-content: center;
  top: 0;
}
.modal-background {
  background: #000000;
  opacity: 0.5;
  top: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 999;
}
.bell-sign {
  display: flex;
  width: 80px;
  height: 80px;
  background: url('../assets/bell_sign.svg') no-repeat;
  margin-bottom: 46px;
  margin: 0 auto;
}
.close-modal {
  position: absolute;
  top: 24px;
  right: 24px;
  &:hover {
    cursor: pointer;
  }
  &:after {
    content: '';
    display: flex;
    width: 24px;
    height: 24px;
    background: url('../assets/close_modal.svg') center no-repeat;
  }
}
.btn {
  width: 192px;
  height: 40px;
  border-radius: 4px;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  &-dismiss {
    margin-right: 16px;
    color: #009efc;
    background: #e5f5fe;
  }
  &-buy-sell {
    background: #009efc;
  }
}
.update-alert {
  position: relative;
  font-family: Rubik;
  margin-top: 16px;
  width: 140px;
  height: 40px;
  font-weight: 600;
  font-size: 14px;
  text-align: center;
  align-items: center;
  justify-content: center;
  display: flex;
  color: #999999;
  padding-left: 26px;
  margin: 28px auto 0 auto;
  box-sizing: content-box;
  padding: 0 16px 0 36px;

  &:after {
    content: '';
    top: 0;
    left: 0;
    position: absolute;
    width: 36px;
    height: 40px;
    background: url('../assets/tools_sign.svg') center no-repeat;
  }
}
</style>
