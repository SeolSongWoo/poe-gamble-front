<!--
<script>

    import {Button, Checkbox} from "flowbite-svelte";

    /** @type {import('./$types').ActionData} */
    export let form;
</script>
<div class="login-container">

    <form method="post">
        <div class="login-form">
            <div>
                {#if form?.invalidEmail} <p>이메일 형식을 제대로 입력해주세요.</p> {/if}
                {#if form?.passwordLength} <p>비밀번호 길이는 8자 이내로 작성해주세요.</p> {/if}
                {#if form?.badRequest} <p> 정상적인 경로로 접근해주세요. </p> {/if}
                <div class="item">
                    <input class="input email" name="email" type="email" placeholder="Email" value={form?.email ?? ''}>
                </div>
                <div class="item">
                    <input class="input password" name="password" type="password" placeholder="Password">
                </div>
                <div>
                    <Checkbox>Remember me</Checkbox>
                </div>
                <div class="item">
                    <Button color="light" type="submit">Login</Button>
                </div>
                <div class="item justify-end">
                    <a href="/register">Register</a>
                </div>
            </div>
        </div>
    </form>
</div>

<style>
    .login-container {
        height: 1000px;
    }

    .login-form {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        padding: 20px 20px;
        border-radius: 10px;
    }

    .input {
        width: 320px;
        height: 60px;
        background-color: #082335;
        border: 2px solid #4DB3FF;
        border-radius: 5px;
        font-size: 20px;
        color: white;
        background-repeat: no-repeat;
        background-position: 5px center;
        padding-left: 40px;
        box-sizing: border-box;
    }
    .email {
        background-image: url("/image/envelope.svg");
    }

    .password {
        background-image : url("/image/lock.svg");
    }

    .input::placeholder {
        color: #4DB3FF;
    }

    .item {
        margin-bottom: 10px;

    }

    .justify-end {
        display: flex;
        justify-content: space-between;
    }
</style>-->


<script>
    import { Label, Input } from 'flowbite-svelte';
    import SignIn from '$lib/auth/SignIn.svelte';

    /** @type {import('./$types').ActionData} */
    export let form;

    let title = 'Login';
    let site = {
        name: 'Poe Gamble',
        img: '/favicon.png',
        link: '/',
        imgAlt: 'FlowBite Logo'
    };
    let rememberMe = true;
    let lostPassword = true;
    let createAccount = true;
    let lostPasswordLink = 'forgot-password';
    let loginTitle = 'Login to your account';
    let registerLink = 'sign-up';
    let createAccountTitle = 'Create account';

</script>


<SignIn
        {title}
        {site}
        {rememberMe}
        {lostPassword}
        {createAccount}
        {lostPasswordLink}
        {loginTitle}
        {registerLink}
        {createAccountTitle}
        {form}
>
    <div>
        <Label for="email" class="mb-2 dark:text-white">Email</Label>
        <Input
                type="email"
                name="email"
                placeholder="name@company.com"
                required
                class="border outline-none dark:border-gray-600 dark:bg-gray-700"
        />
    </div>
    <div>
        <Label for="password" class="mb-2 dark:text-white">Password</Label>
        <Input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                required
                class="border outline-none dark:border-gray-600 dark:bg-gray-700"
        />
    </div>
</SignIn>