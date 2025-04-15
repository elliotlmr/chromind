<template>
    <div class="flex items-center justify-center w-full max-w-sm p-px rounded-sm overflow-hidden relative">
        <div class="flex items-center justify-center w-full h-full bg-stone-800 rounded-sm z-2">
            <slot />
        </div>
        <div class="bg-conic-gradient w-screen h-screen absolute animate-spin" :style="{animationDuration: '5s'}" />
    </div>
</template>

<style scoped>
.bg-conic-gradient {
    background: conic-gradient(from 90deg, red, blue, blue, green, green, yellow, yellow, red);
}
</style>