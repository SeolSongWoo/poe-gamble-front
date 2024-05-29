<script>

    import {CARD_META_DATA} from "$lib/CardMetaData.js";
    import InventoryItem from "$lib/inventory/InventoryItem.svelte";
    import {createEventDispatcher, onMount} from "svelte";
    import Card from "$lib/Card.svelte";
    import InventoryPopup from "$lib/inventory/popup/InventoryPopup.svelte";

    /**
     * @type {Array[any]}
     */
    export let cards = [];


    const dispatch = createEventDispatcher();

    let isCardOpen = false;
    let isPopupOpen = false;
    let openCardData = {};
    let items = [];
    let itemNode = null;

    $: if (cards instanceof Array) {
        let index = 0;
        const bundleCard = (cardName, stockQuantity, maxBundleQuantity) => {
            let bundles = [];
            while (stockQuantity > 0) {
                let bundleSize = Math.min(stockQuantity, maxBundleQuantity);
                bundles.push({index:index++,type: "CARD", name: cardName, stock: bundleSize});
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
                    items = items.concat(bundle);
                    break;
                default :
                    return;
            }
        });

        const targetLength = 60;
        if (items.length > targetLength) {
            items = items.slice(0, targetLength);
        } else {
            while (items.length < targetLength) {
                items.push({index:index++,type: "EMPTY", name: "", stock: "0"});
            }
        }
    }

    $: if(items) {
        console.log(items);
    }

    function onSplitCard(card, splitValue) {
        const getEmptyIndex = () => items.findIndex(item => item.type === "EMPTY");

        const index = items.findIndex(item => item === card.props);
        if (index !== -1 && splitValue > 0 && splitValue < items[index].stock) {
            items[index].stock -= splitValue;
            const emptyIndex = getEmptyIndex();
            items[getEmptyIndex()] = {index:emptyIndex,type: "CARD", name: card.name, stock: splitValue};
        }
    }

    function handleItemClick(event) {
        isPopupOpen = true;
        openCardData = event.detail;
    }

    function tryGambling(event) {

    }

    // 이벤트 리스너 추가하여 바깥 영역 클릭 시 팝업 닫기
    function handleClickOutside(event) {
        if (!itemNode.contains(event.target)) {
            isPopupOpen = false;
        }
    }

    // 컴포넌트 마운트 시에 이벤트 리스너 등록
    onMount(() => {
        window.addEventListener('click', handleClickOutside);

        // 컴포넌트가 파괴될 때 이벤트 리스너 제거
        return () => {
            window.removeEventListener('click', handleClickOutside);
        };
    });

</script>


<div class="inventory" bind:this={itemNode}>
    {#each items as item}
        <div class="inventory-item">
            {#if item.type !== "EMPTY"}
                <InventoryItem on:click={handleItemClick} itemProps={item}/>
            {/if}
        </div>
    {/each}
</div>
{#if isCardOpen}
    <Card bind:card="{openCardData}"/>
{/if}

<InventoryPopup bind:openCardData bind:isPopupOpen onSplitCard={onSplitCard} />


<style>
    .inventory {
        display: grid;
        grid-template-rows: repeat(5, 40px);
        grid-auto-flow: column;
        grid-gap: 5px;
        width: max-content;
        margin: 20px;
    }

    .inventory-item {
        width: 40px;
        height: 40px;
        border: 1px solid #000;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #f0f0f0;
    }
</style>