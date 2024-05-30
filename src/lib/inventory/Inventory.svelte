<script>

    import {CARD_META_DATA} from "$lib/CardMetaData.js";
    import InventoryItem from "$lib/inventory/InventoryItem.svelte";
    import {createEventDispatcher, onMount} from "svelte";
    import Card from "$lib/Card.svelte";
    import InventoryPopup from "$lib/inventory/popup/InventoryPopup.svelte";
    import {Button} from "flowbite-svelte";

    /**
     * @type {Array[any]}
     */
    export let cards = [];


    const dispatch = createEventDispatcher();

    let isCardOpen = false;
    let isPopupOpen = false;
    let openCardData = {};
    let inventoryItems = [];
    let hortItems = {};

    $: if(isCardOpen) {
        hortItems = openCardData.props;
        const index = inventoryItems.findIndex(item => item.index === openCardData.props.index);
        inventoryItems[index] = {index:openCardData.props.index,type: "EMPTY", name: "", stock: "0"};
    }

    $: console.log(isCardOpen);

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
                    inventoryItems = inventoryItems.concat(bundle);
                    break;
                default :
                    return;
            }
        });

        const targetLength = 60;
        if (inventoryItems.length > targetLength) {
            inventoryItems = inventoryItems.slice(0, targetLength);
        } else {
            while (inventoryItems.length < targetLength) {
                inventoryItems.push({index:index++,type: "EMPTY", name: "", stock: "0"});
            }
        }
    }

    function onSplitCard(card, splitValue) {
        const getEmptyIndex = () => inventoryItems.findIndex(item => item.type === "EMPTY");

        const index = inventoryItems.findIndex(item => item === card.props);
        if (index !== -1 && splitValue > 0 && splitValue < inventoryItems[index].stock) {
            inventoryItems[index].stock -= splitValue;
            const emptyIndex = getEmptyIndex();
            inventoryItems[getEmptyIndex()] = {index:emptyIndex,type: "CARD", name: card.name, stock: splitValue};
        }
    }

    function handleItemClick(event) {
        isPopupOpen = true;
        isCardOpen = false;
        openCardData = event.detail;
    }

    async function tryGambling(event) {
        if(openCardData.stock === 0 || openCardData.stock >(CARD_META_DATA[openCardData.name].maxQuantity / 2)) {
            console.log('card not enough stock')
            return;
        }
        if(openCardData) {
            const response = (await fetch('/api/v1/gambling', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    cardName: openCardData.name,
                    tryQuantity: openCardData.stock
                })
            })).json();
            const data = (await response).data;
            openCardData.stock = data.stockQuantity;
            openCardData.props.stock = data.stockQuantity;
            if(data.stockQuantity === 0) {
                isCardOpen = false;
            }
        }
    }

    // 이벤트 리스너 추가하여 바깥 영역 클릭 시 팝업 닫기
    function handleClickOutside(event) {
        if (!itemNode.contains(event.target)) {
            isPopupOpen = false;
        }
    }

    function handleHortCardClick() {
        isCardOpen = false;
        hortItems = {};
        const index = inventoryItems.findIndex(item => item.type === "EMPTY");
        inventoryItems[index] = {...openCardData.props}
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

<div style="display: flex">
<div class="inventory" bind:this={itemNode}>
    {#each inventoryItems as item}
        <div class="inventory-item">
            {#if item.type !== "EMPTY"}
                <InventoryItem on:click={handleItemClick} itemProps={item}/>
            {/if}
        </div>
    {/each}
</div>
{#if isCardOpen}
    <Card on:click={handleHortCardClick} bind:card="{openCardData}"/>
    <Button on:click={tryGambling} color="alternative">실행</Button>
{/if}

<InventoryPopup bind:openCardData bind:isPopupOpen bind:isCardOpen onSplitCard={onSplitCard} />
</div>

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