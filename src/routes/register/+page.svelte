<!--
<script>

    import {Button} from "flowbite-svelte";

    /** @type {import('./$types').ActionData} */
    export let form;
</script>

<form method="post">
    {#if form?.invalidEmail} <p>이메일 형식을 제대로 입력해주세요.</p> {/if}
    {#if form?.passwordLength} <p>비밀번호 길이는 8자 이내로 작성해주세요.</p> {/if}
    {#if form?.badRequest} <p> 정상적인 경로로 접근해주세요. </p> {/if}
    <input name="email" type="email" placeholder="email" value={form?.email ?? ''}>
    <input name="poeName" type="text" placeholder="poeName" value={form?.poeName ?? ''}>
    <input name="password" type="password" placeholder="Password">
    <Button type="submit">Register</Button>
</form>

<a href="/login">login</a>-->

<script>
    import { Label, Input } from 'flowbite-svelte';
    import SignUp from '$lib/auth/SignUp.svelte';

    /** @type {import('./$types').ActionData} */
    export let form;

    const title = 'Sign up';
    const site = {
        name: 'Flowbite',
        img: '/images/flowbite-svelte-icon-logo.svg',
        link: '/',
        imgAlt: 'FlowBite Logo'
    };
    const acceptTerms = true;
    const haveAccount = true;
    const btnTitle = 'Create account';
    const termsLink = '/';
    const loginLink = 'sign-in';
    const labelClass = 'space-y-2 dark:text-white';
    const onSubmit = (e) => {
        const formData = new FormData(e.target);

        const data = {};
        for (const field of formData.entries()) {
            const [key, value] = field;
            data[key] = value;
        }
        console.log(data);
    };

</script>



<SignUp
        {title}
        {site}
        {acceptTerms}
        {haveAccount}
        {btnTitle}
        {termsLink}
        {loginLink}
        {form}
        on:submit={onSubmit}
>
    <div>
        <Label class={labelClass}>
            <span>Email</span>
            <Input
                    type="email"
                    name="email"
                    placeholder="name@company.com"
                    required
                    class="border outline-none dark:border-gray-600 dark:bg-gray-700"
            />
        </Label>
    </div>
    <div>
        <Label class={labelClass}>
            <span>accountName</span>
            <Input
                    type="text"
                    name="poeName"
                    placeholder="SuperCrack"
                    required
                    class="border outline-none dark:border-gray-600 dark:bg-gray-700"
            />
        </Label>
    </div>
    <div>
        <Label class={labelClass}>
            <span>Password</span>
            <Input
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    required
                    class="border outline-none dark:border-gray-600 dark:bg-gray-700"
            />
        </Label>
    </div>
    <div>
        <Label class={labelClass}>
            <span>Confirm password</span>
            <Input
                    type="password"
                    name="confirm-password"
                    placeholder="••••••••"
                    required
                    class="border outline-none dark:border-gray-600 dark:bg-gray-700"
            />
        </Label>
    </div>
</SignUp>