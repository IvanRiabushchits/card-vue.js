<template>
    <div class="card-item" :class="{'-active': isFocused }">
        <div class="card-item__side -front">
            <div
                    class="card-item__focus"
            ></div>
            <div class="card-item__cover card-item__cover--gradient">
            </div>
            <div class="card-item__inner">
                <div class="card-item__top">
                    <img src="../assets/images/card-chip.png" class="card-item__chip" alt="">
                    <div class="card-item__type">
                        <img src="../assets/images/visa.png" alt="Тип платежной системы" class="card-item__typeImg">
                    </div>
                </div>

                <label class="card-item__number">
                    <span v-for="(n, index) in defaultPlaceholder" :key="index">
                        <div class="card-item__numberItem" v-if="getIsNumberMasked(index, n)">*</div>
                        <div
                                class="card-item__numberItem"
                                :class="{ '-active' : n.trim() === '' }"
                                :key="defaultPlaceholder"
                                v-else-if="labels.cardNumber.length > index"
                        >{{labels.cardNumber[index]}}</div>
                        <div
                                class="card-item__numberItem"
                                :class="{ '-active' : n.trim() === '' }"
                                v-else
                                :key="defaultPlaceholder"
                        >{{n}}</div>
                    </span>
                </label>
                <div class="card-item__content">
                    <label class="card-item__info">
                        <div class="card-item__holder">Card Holder</div>

                        <div class="card-item__name" v-if="labels.cardName.length">
                                <span
                                        class="card-item__nameItem"
                                        v-for="(n, index) in labels.cardName.replace(/\s\s+/g, '')"
                                        :key="index"
                                >{{n}}
                                </span>
                        </div>
                        <span class="card-item__name" v-else>Full Name</span>
                    </label>
                    <div class="card-item__date">
                        <label :for="labels.cardMonth" class="card-item__dateTitle">Expires</label>
                        <label class="card-item__dateItem">
                            <span v-if="labels.cardMonth" :key="labels.cardMonth"
                            >{{ labels.cardMonth }}</span>
                            <span v-else>MM</span>
                        </label>
                        <div class="card-item__dateSlash"> /</div>
                        <label for="labels.cardYear" class="card-item__dateItem">
                            <span v-if="labels.cardYear"
                                  :key="labels.cardYear">{{ String(labels.cardYear).slice(2,4) }}</span>
                            <span v-else>YY</span>
                        </label>
                    </div>
                </div>
            </div>
        </div>
        <div class="card-item__side -back">
            <div class="card-item__cover card-item__cover--gradient">
            </div>
            <div class="card-item__band"></div>
            <div class="card-item__cvv">
                <div class="card-item__cvvTitle">CVV</div>
                <div class="card-item__cvvBand"><span v-for="(n, index) in labels.cardCvv" :key="index">*</span></div>
                <div class="card-item__type">
                    <img class="card-item__typeImg" src="../assets/images/visa.png" alt="Тип платежной системы">
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        name: "Card",
        props: {
            labels: Object,
            isCardNumberMasked: Boolean,
        },
        data() {
            return {
                defaultPlaceholder: "#### #### #### ####",
                isFocused: false,
            }
        },
        methods: {
            getIsNumberMasked(index, n) {
                return index > 4 && index < 14 && this.labels.cardNumber.length > index && n.trim() !== '' && this.isCardNumberMasked
            }
        },
        mounted() {
            let fieldCVV = document.querySelector('[data-card-cvv]');
            fieldCVV.addEventListener('focus', () => {
                this.isFocused = true;
            })
            fieldCVV.addEventListener('blur', () => {
                this.isFocused = false;
            })
        }

    }

</script>