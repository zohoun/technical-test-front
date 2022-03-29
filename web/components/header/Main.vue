<template>
  <header class="bg-indigo-600">
    <div class="container mx-auto h-20 flex justify-between items-center text-white">
      <NuxtLink :to="{ name: 'index' }" class="inline-flex items-center gap-x-5">
        <SvgIcon name="icons/logo" class="w-10 h-10" />
        Task editor
      </NuxtLink>
      <div v-if="$route.name!='form'" class="text-right md:ml-8 flex items-center bg-white hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
        <button>
          <nuxt-link to="/form">
            Add
          </nuxt-link>
        </button>
      </div>
    </div>
  </header>
</template>
