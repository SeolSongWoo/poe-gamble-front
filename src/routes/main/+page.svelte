<script context="module">
    /**
     * @typedef {Object} Card
     * @property {number} id
     * @property {string} name
     * @property {number} stockQuantity
     */
</script>

<script>
    import Inventory from "$lib/inventory/Inventory.svelte";
    import {CARD_META_DATA} from "$lib/item/card/CardMetaData.js";

    /** @type {import('./$types').PageServerData} */
    export let data;

    /** @type {Card[]} */
    let cards = data.data;

    let index = 0;
    let inventoryItems = [];
    function bundleCard(cardName, stockQuantity, maxBundleQuantity) {
        let bundles = [];
        while (stockQuantity > 0) {
            let bundleSize = Math.min(stockQuantity, maxBundleQuantity);
            bundles.push({index: index++, type: "CARD", name: cardName, stock: bundleSize});
            stockQuantity -= bundleSize;
        }
        return bundles;
    }

    cards.forEach(card => {
        switch (card.cardName) {
            case CARD_META_DATA.UNREQUITED_LOVE.name :
            case CARD_META_DATA.THE_APOTHECARY.name :
            case CARD_META_DATA.HOUSE_OF_MIRRORS.name :
                const bundle = bundleCard(card.cardName, card.stockQuantity, CARD_META_DATA[card.cardName].maxQuantity);
                inventoryItems = inventoryItems.concat(bundle);
                break;
            default :
                return;
        }
    });


</script>

<Inventory items={inventoryItems}/>