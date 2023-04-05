<template>
    <div class="">
        <HeaderApp />
        <slot />
        <FooterApp />
    </div>
</template>

<script>
import HeaderApp from '@/components/main/HeaderApp.vue'
import FooterApp from '@/components/main/FooterApp.vue'
export default{
    name: 'MainLayout',
    components: {
        HeaderApp,
        FooterApp
    }
}
</script>

<style>

</style>