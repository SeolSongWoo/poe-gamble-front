<script>

    import {CARD_META_DATA} from "$lib/item/card/CardMetaData.js";
    import InventoryItem from "$lib/inventory/InventoryItem.svelte";
    import Card from "$lib/item/card/Card.svelte";
    import {Button, ButtonGroup, Input, InputAddon, Label, NumberInput} from "flowbite-svelte";

    /**
     * @type {Array[any]}
     */
    export let items = [];


    let isCardOpen = false;
    let isSplitPopupOpen = false;
    let selectItemData = {};
    let splitValue = 0;
    $: if (isCardOpen) {
        const index = items.findIndex(item => item.index === selectItemData.props.index);
        items[index] = {index: selectItemData.props.index, type: "EMPTY", name: "", stock: "0"};
    }

    let itemNode = null;

    $: if (items instanceof Array) {
        let index = items.length;
        const targetLength = 60;
        if (items.length > targetLength) {
            items = items.slice(0, targetLength);
        } else {
            while (items.length < targetLength) {
                items.push({index: index++, type: "EMPTY", name: "", stock: "0"});
            }
        }
    }

    function onSplitCard(splitValue) {
        const getEmptyIndex = () => items.findIndex(item => item.type === "EMPTY");

        const index = items.findIndex(item => item === selectItemData.props);
        if (index !== -1 && splitValue > 0 && splitValue < items[index].stock) {
            items[index].stock -= splitValue;
            const emptyIndex = getEmptyIndex();
            items[getEmptyIndex()] = {index: emptyIndex, type: "CARD", name: items[index].name, stock: splitValue};
        }
        isSplitPopupOpen = false;
    }

    function handleItemClick(event) {
        selectItemData = event.detail.item;
        if (event.detail.shiftKey) {
            isCardOpen = true;
            isSplitPopupOpen = false;
        } else if (event.detail.ctrlKey) {
            isSplitPopupOpen = true;
        }
    }

    async function tryGambling(event) {
        if (selectItemData.stock === 0 || selectItemData.stock > (CARD_META_DATA[selectItemData.name].maxQuantity / 2)) {
            console.log('card not enough stock')
            return;
        }
        if (selectItemData) {
            const response = await fetch('/api/v1/gambling', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    cardName: selectItemData.name,
                    tryQuantity: selectItemData.stock
                })
            });
            const responseJson = await response.json();
            const data = responseJson.data;
            if (responseJson.status === 400) {
                alert('비정상적인 접근입니다.');
                return;
            }
            selectItemData.stock = data.stockQuantity;
            selectItemData.props.stock = data.stockQuantity;
            if (data.stockQuantity === 0) {
                isCardOpen = false;
            }
        }
    }


    function handleHortCardClick() {
        isCardOpen = false;
        const index = items.findIndex(item => item.type === "EMPTY");
        items[index] = {...selectItemData.props}
    }

</script>

<div style="display: flex">
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
        <Card on:click={handleHortCardClick} bind:card="{selectItemData}"/>
        <Button on:click={tryGambling} color="alternative">실행</Button>
    {/if}
    {#if isSplitPopupOpen}
        <div>
        <ButtonGroup class="w-full" size="sm">
            <InputAddon>Split</InputAddon>
            <NumberInput bind:value={splitValue} max={CARD_META_DATA[selectItemData.name].maxQuantity / 2}/>
            <Button color="primary" on:click={() => onSplitCard(splitValue)}>Split</Button>
        </ButtonGroup>
        </div>
    {/if}
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

    .viewing {
        position: absolute;
        bottom: 0;
        left: 0;
    }
</style>