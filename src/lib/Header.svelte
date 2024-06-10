<script>

</script>

<header>
    <div class="container-center-horizontal">
        <div class="navigation screen ">
            <div class="items" data-id="3:208">
                <div class="page valign-text-middle body-text">Page</div>
                <div class="page valign-text-middle body-text">Page</div>
                <div class="page valign-text-middle body-text">Page</div>
                <div class="page valign-text-middle body-text">Page</div>
            </div>
            <h1 class="title valign-text-middle">POE GAMBLE</h1></div>
    </div>
</header>

<style>
    .container-center-horizontal {
        display: flex;
        flex-direction: row;
        justify-content: center;
        pointer-events: none;
        width: 100%;
    }

    .container-center-horizontal > * {
        flex-shrink: 0;
        pointer-events: auto;
    }

    .navigation {
        background-color: #191f25;
        height: 80px;
        overflow: hidden;
        overflow-x: hidden;
        position: relative;
        width: 100%;
    }

    .items {
        align-items: center;
        background-color: transparent;
        display: inline-flex;
        gap: 48px;
        justify-content: flex-end;
        right: 15%;
        position: absolute;
        top: 25%;
    }

    .title {
        background-color: transparent;
        color: var(--white);
        font-family: var(--font-family-inter);
        font-size: var(--font-size-l);
        font-style: normal;
        font-weight: 500;
        height: 100%;
        left: 80px;
        letter-spacing: 0.00px;
        line-height: 72px;
        position: absolute;
        text-align: left;
        top: 10%;
        white-space: nowrap;
        width: auto;
    }

    .valign-text-middle {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .screen * {
        -webkit-font-smoothing: antialiased;
        box-sizing: border-box;
    }

    .page {
        background-color: transparent;
        color: var(--white);
        font-style: normal;
        font-weight: 500;
        line-height: 30px;
        position: relative;
        text-align: left;
        white-space: nowrap;
        width: fit-content;
    }

    .body-text {
        font-family: var(--font-family-inter);
        font-size: var(--font-size-m);
        font-style: normal;
        font-weight: 500;
        letter-spacing: 0px;
    }

    .screen * {
        -webkit-font-smoothing: antialiased;
        box-sizing: border-box;
    }

    .screen div {
        -webkit-text-size-adjust: none;
    }


    :root {
        --black: #000000;
        --white: #ffffff;
        --font-size-l: 48px;
        --font-size-m: 20px;
        --font-size-s: 16px;
        --font-family-inter: fontin, serif;
    }
</style>