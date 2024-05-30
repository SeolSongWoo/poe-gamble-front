<script>
    import {CARD_META_DATA} from "$lib/CardMetaData.js";
    import {createEventDispatcher} from "svelte";

    /**
     * @type {Object}
     */
    export let card;
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

<span class="card-wrapper" on:click={() => dispatch('click', card)} >
    <span class="card-image">
        <img src={itemImage} alt={card.name}/>
    </span>
    <span class="card-frame"/>
    <span class="card-name">
        {card.name}
    </span>
    <span class="card-stock">
        {card.stock}/{maxQuantity}
    </span>
    <span class="card-reward">
        House Of Mirrors
    </span>
    <span class="card-explication">
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


</style>