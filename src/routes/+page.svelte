<script>
    import {P,Button} from 'flowbite-svelte'
</script>

<div class="main-container">
    <div class="title">
        <P align="center" size="6xl">POE Gamble Simulator</P>
    </div>
    <div class="link-group">
        <Button class="m-2" size="xl" color="primary" href="/login">FreeMode</Button>
        <Button class="m-2" size="xl" color="light" href="/login">RankMode</Button>
    </div>
</div>




<style>
    .main-container {
        height: 700px;
    }
    .title {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    .link-group {
        position: absolute;
        top: 70%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: -webkit-center;
        margin: 10px 10px;
    }

    a {
        background-color: black;
        font-size: 30px;
        color: white;
        padding: 15px 25px;
        text-align: center;
        display: inline-block;
        text-decoration-line: none;
        border-radius: 10px;
    }
</style>