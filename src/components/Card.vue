<template>
    <div class="card-item">
        <div class="card-item__side -front">
            <div
                    class="card-item__focus"
            ></div>
            <div class="card-item__cover">
                <img class="card-item__bg" src="..\assets\images\card_bg.jpeg" alt="">
            </div>
            <div class="card-item__inner">
                <div class="card-item__top">
                    <img src="../assets/images/card-chip.png" class="card-item__chip" alt="">
                    <div class="card-item__type">
                        <img src="../assets/images/visa.png" alt="Тип платежной системы" class="card-item__typeImg">
                    </div>
                </div>

                <div class="card-item__number">
                    <div v-for="(n, index) in defaultPlaceholder" :key="index">
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
                    </div>
                </div>
                <div class="card-item__content">
                    <div class="card-item__info">
                        <div class="card-item__holder">Card Holder</div>

                        <div class="card-item__name" v-if="labels.cardName.length">
                                <span
                                        class="card-item__nameItem"
                                        v-for="(n, index) in labels.cardName.replace(/\s\s+/g, ' ')"
                                        :key="index"
                                >{{n}}
                                </span>
                        </div>
                        <span class="card-item__name" v-else>Full Name</span>
                    </div>
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
            <div class="card-item__cover">
                <img class="card-item__bg" src="..\assets\images\card_bg.jpeg" alt="">
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
            isCardFlipped: Boolean
        },
        data() {
            return {
                isFocused: false,
                focusElementStyle: null,
                defaultPlaceholder: "#### #### #### ####"
            }
        },
        methods: {
            getIsNumberMasked(index, n) {
                return index > 4 && index < 14 && this.labels.cardNumber.length > index && n.trim() !== '' && this.isCardNumberMasked
            }
        }
    }

</script>

<style lang="scss">
    .card-item {
        position: relative;
        z-index: 2;

        max-width: 430px;
        width: 100%;
        height: 270px;
        margin: 0 auto;
        @media screen and (max-width: 520px) {
            max-width: 330px;
            height: 200px;
            width: 90%;
        }

        &.to-flip {
            .card-item__side {
                &.-front {
                    transform: perspective(1000px) rotateY(180deg) rotateX(0deg) rotateZ(0deg);
                }

                &.-back {
                    transform: perspective(1000px) rotateY(0) rotateX(0deg) rotateZ(0deg);
                    // box-shadow: 0 20px 50px 0 rgba(81, 88, 206, 0.65);
                }
            }
        }


        &__side {
            height: 100%;

            border-radius: 15px;
            overflow: hidden;
            box-shadow: 0 20px 60px 0 rgba(14, 42, 90, 0.55);
            backface-visibility: hidden;

            transform: perspective(2000px) rotateY(0deg) rotateX(0deg) rotate(0deg);
            transform-style: preserve-3d;
            transition: all 0.8s cubic-bezier(0.71, 0.03, 0.56, 0.85);

            &.-back {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                transform: perspective(2000px) rotateY(-180deg) rotateX(0deg) rotate(0deg);
                z-index: 2;
                padding: 0;
                backface-visibility: hidden;
                height: 100%;

                .card-item__cover {
                    transform: rotateY(-180deg);
                }
            }
        }

        &__cover {
            position: absolute;
            left: 0;
            top: 0;

            width: 100%;
            height: 100%;

            border-radius: 15px;
            overflow: hidden;

        }

        &__bg {
            display: block;

            max-width: 100%;
            max-height: 100%;
            width: 100%;
            height: 100%;

            object-fit: cover
        }

        &__inner {
            height: 100%;
            padding: 25px 15px;
            position: relative;
            z-index: 4;

            text-shadow: 7px 6px 10px rgba(14, 42, 90, 0.8);
            user-select: none;
            @media screen and (max-width: 520px) {
                padding: 20px 10px;
            }
        }

        &__top {
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            margin-bottom: 40px;
            padding: 0 10px;

            @media screen and (max-width: 520px) {
                margin-bottom: 25px;
            }
            @media screen and (max-width: 360px) {
                margin-bottom: 15px;
            }
        }

        &__chip {
            width: 60px;
            @media screen and (max-width: 520px) {
                width: 50px;
            }
            @media screen and (max-width: 360px) {
                width: 40px;
            }
        }

        &__type {
            position: relative;

            display: flex;
            justify-content: flex-end;

            max-width: 100px;
            width: 100%;
            height: 45px;
            margin-left: auto;
            @media screen and (max-width: 520px) {
                height: 40px;
                max-width: 90px;
            }
            @media screen and (max-width: 360px) {
                height: 30px;
            }
        }

        &__typeImg {
            max-width: 100%;
            max-height: 100%;

            object-fit: contain;
            object-position: top right;
        }

        &__number {
            display: inline-block;

            margin-bottom: 25px;
            padding: 10px 15px;

            font-size: 27px;
            font-family: "Source Sans Pro", sans-serif;;
            font-weight: 500;
            color: #fff;
            line-height: 1;

            cursor: pointer;
            @media screen and (max-width: 520px) {
                margin-bottom: 15px;
                padding: 10px 10px;
                font-size: 21px;
            }

            @media screen and (max-width: 360px) {
                margin-bottom: 10px;
                padding: 10px 10px;
                font-size: 19px;
            }
        }

        &__numberItem {
            width: 16px;
            display: inline-block;

            font-family: "Source Sans Pro", sans-serif;;

            &.-active {
                width: 30px;
            }

            @media screen and (max-width: 520px) {
                width: 13px;

                &.-active {
                    width: 16px;
                }
            }

            @media screen and (max-width: 360px) {
                width: 12px;

                &.-active {
                    width: 16px;
                }
            }
        }

        &__content {
            display: flex;
            align-items: flex-start;

            color: #fff;
        }

        &__info {
            display: block;

            max-width: calc(100% - 85px);
            width: 100%;
            padding: 10px 15px;

            font-weight: 500;
            color: #fff;

            cursor: pointer;
            @media screen and (max-width: 520px) {
                padding: 10px;
            }
        }

        &__holder {
            margin-bottom: 6px;
            font-size: 13px;
            opacity: 0.7;
            @media screen and (max-width: 520px) {
                margin-bottom: 5px;
                font-size: 12px;
            }
        }

        &__name {
            max-width: 100%;

            font-size: 18px;
            line-height: 1;
            white-space: nowrap;

            text-overflow: ellipsis;
            text-transform: uppercase;
            overflow: hidden;
            @media screen and (max-width: 520px) {
                font-size: 16px;
            }
        }

        &__nameItem {
            display: inline-flex;
            min-width: 8px;

            font-family: "Source Sans Pro", sans-serif;
            text-transform: capitalize;
            position: relative;
        }

        &__date {
            display: flex;
            flex-wrap: wrap;
            flex-shrink: 0;

            width: 80px;
            margin-left: auto;
            padding: 10px;

            font-size: 18px;
            white-space: nowrap;

            cursor: pointer;

            @media screen and (max-width: 520px) {
                font-size: 16px;
            }
        }

        &__dateTitle {
            width: 100%;
            padding-bottom: 6px;

            font-size: 13px;
            opacity: 0.7;
            @media screen and (max-width: 520px) {
                font-size: 12px;
                padding-bottom: 5px;
            }
        }

        &__band {
            background: rgba(0, 0, 19, 0.8);
            width: 100%;
            height: 50px;
            margin-top: 30px;
            position: relative;
            z-index: 2;
            @media screen and (max-width: 480px) {
                margin-top: 20px;
            }
            @media screen and (max-width: 360px) {
                height: 40px;
                margin-top: 10px;
            }
        }

        &__cvv {
            text-align: right;
            position: relative;
            z-index: 2;
            padding: 15px;

            .card-item__type {
                opacity: 0.7;
            }

            @media screen and (max-width: 360px) {
                padding: 10px 15px;
            }
        }

        &__cvvTitle {
            padding-right: 10px;
            font-size: 15px;
            font-weight: 500;
            color: #fff;
            margin-bottom: 5px;
        }

        &__cvvBand {

            display: flex;
            height: 45px;
            background: #fff;
            margin-bottom: 30px;
            text-align: right;

            align-items: center;
            justify-content: flex-end;
            padding-right: 10px;
            color: #1a3b5d;
            font-size: 18px;
            border-radius: 4px;
            box-shadow: 0 10px 20px -7px rgba(32, 56, 117, 0.35);

            @media screen and (max-width: 520px) {
                height: 40px;
                margin-bottom: 20px;
            }

            @media screen and (max-width: 360px) {
                margin-bottom: 15px;
            }
        }
    }


</style>