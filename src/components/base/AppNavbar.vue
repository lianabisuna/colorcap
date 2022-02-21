<template>
  <ul class="flex space-x-1 md:space-x-3 lg:space-x-3 items-center justify-center">
    <li
      v-if="title"
      class="leading-3 text-sm md:text-tiny lowercase font-bold text-gray-400"
    >
      {{ title }}
    </li>

    <li
      v-for="(item, index) in items"
      :key="index"
    >
      <AppButton
        :active="multiple || active instanceof Array ? active.includes(item) : item === active"
        @click="$emit('toggle', item)"
      >
        {{ item }}
      </AppButton>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    title: { type: String, default: '' },
    items: { type: Array, defualt: [] },
    active: { type: [String, Array], default: '' },
    multiple: { type: Boolean, default: false }
  }
}
</script>