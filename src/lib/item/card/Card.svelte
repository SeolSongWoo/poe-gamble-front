<script>
    import {CARD_META_DATA} from "$lib/item/card/CardMetaData.js";
    import {createEventDispatcher} from "svelte";

    /**
     * @type {Object}
     */
    export let card;
    let clazz;
    export {clazz as class};

    let cardClassBundle = {
        default : {
            container : 'card-wrapper',
            image : 'card-image',
            frame : 'card-frame',
            title : 'card-name',
            stock : 'card-stock',
            reward : 'card-reward',
            explication : 'card-explication'
        },
        small : {
            container : 'card-wrapper-small',
            image : 'card-image-small',
            frame : 'card-frame-small',
            title : 'card-name-small',
            stock : 'card-stock-small',
            reward : 'card-reward-small',
            explication : 'card-explication-small'
        }
    }

    let nowClass = cardClassBundle.default;

    if(clazz) {
        if(cardClassBundle[clazz]) {
            nowClass = cardClassBundle[clazz];
        }
    }


    const dispatch = createEventDispatcher();

    $: maxQuantity = getMaxQuantity(card.name);
    $: itemImage = getItemImage(card.name);

    function getMaxQuantity(cardName) {
        switch (cardName) {
            case CARD_META_DATA.UNREQUITED_LOVE.name:
                return CARD_META_DATA.UNREQUITED_LOVE.maxQuantity;
            case CARD_META_DATA.THE_APOTHECARY.name:
                return CARD_META_DATA.THE_APOTHECARY.maxQuantity;
            case CARD_META_DATA.HOUSE_OF_MIRRORS.name:
                return CARD_META_DATA.HOUSE_OF_MIRRORS.maxQuantity;
            default:
                return 0;
        }
    }

    function getItemImage(cardName) {
        switch (cardName) {
            case CARD_META_DATA.UNREQUITED_LOVE.name:
                return CARD_META_DATA.UNREQUITED_LOVE.image;
            case CARD_META_DATA.THE_APOTHECARY.name:
                return CARD_META_DATA.THE_APOTHECARY.image;
            case CARD_META_DATA.HOUSE_OF_MIRRORS.name:
                return CARD_META_DATA.HOUSE_OF_MIRRORS.image;
            default:
                return "";
        }
    }


</script>

<span class="{nowClass.container}" on:click={(event) => dispatch('click', {card,ctrlKey:event.ctrlKey})} >
    <span class="{nowClass.image}">
        <img style="width: 100%; height: 100%;" src={itemImage} alt={card.name}/>
    </span>
    <span class="{nowClass.frame}"/>
    <span class="{nowClass.title}">
        {card.name}
    </span>
    <span class="{nowClass.stock}">
        {card.stock}/{maxQuantity}
    </span>
    <span class="{nowClass.reward}">
        House Of Mirrors
    </span>
    <span class="{nowClass.explication}">
        Card Gamble
    </span>
</span>


<style>
    .card-wrapper {
        display: block;
        position: relative;
        width: 440px;
        height: 668px;
        text-align: center;
    }

    .card-image {
        display: block;
        position: absolute;
        top: 56px;
        left: 26px;
        background-color: black;
    }

    .card-frame {
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: url("/image/card_frame.webp") no-repeat;
    }

    .card-name {
        display: block;
        position: absolute;
        top: 14px;
        left: 0;
        width: 100%;
        font-size: 20px;
        line-height: 44px;
        color: #030301;
    }

    .card-stock {
        display: block;
        position: absolute;
        top: 309px;
        left: 42px;
        width: 70px;
        font-size: 16px;
        line-height: 38px;
        color: white;
    }

    .card-reward {
        display: block;
        position: absolute;
        top: 381px;
        left: 151px;
        font-size: 16px;
        color: white;
    }

    .card-explication {
        display: table;
        position: absolute;
        top: 529px;
        left: 160px;
        font-size: 16px;
        font-style: italic;
        color: rgba(175, 96, 37)
    }


    .card-wrapper-small {
        display: block;
        position: relative;
        width: calc(440px * 0.3);
        height: calc(668px * 0.3);
        text-align: center;
    }

    .card-image-small {
        display: block;
        position: absolute;
        top: calc(56px * 0.3);
        left: calc(26px * 0.3);
        background-color: black;
    }

    .card-name-small {
        display: block;
        position: absolute;
        top: -12px;
        left: 0;
        width: 100%;
        font-size: calc(20px * 0.3);
        line-height: 44px;
        color: #030301;
    }

    .card-stock-small {
        display: block;
        position: absolute;
        top: calc(309px * 0.26);
        left: calc(42px * 0.3);
        width: calc(70px * 0.3);
        font-size: calc(16px * 0.3);
        line-height: 38px;
        color: white;
    }

    .card-frame-small {
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: url("/image/card_frame_small.png") no-repeat;
    }

    .card-reward-small {
        display: block;
        position: absolute;
        top: calc(381px * 0.3);
        left: calc(151px * 0.3);
        font-size: calc(16px * 0.3);
        color: white;
    }

    .card-explication-small {
        display: table;
        position: absolute;
        top: calc(529px * 0.3);
        left: calc(160px * 0.3);
        font-size: calc(16px * 0.3);
        font-style: italic;
        color: rgba(175, 96, 37)
    }


</style>