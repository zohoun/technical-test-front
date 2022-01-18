<template>
  <div>
    <label :for="name" class="block text-sm font-medium text-gray-700 mb-1">
      {{ label }}
    </label>
    <textarea :id="name" v-model="newValue" :name="name" rows="3" class="shadow-sm block focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md w-full" />
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    value: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      newValue: this.value
    }
  },
  watch: {
    value: 'onValueUpdated',
    newValue: 'onNewValueUpdated'
  },
  methods: {
    onValueUpdated () {
      this.newValue = this.value
    },
    onNewValueUpdated () {
      this.$emit('input', this.newValue)
    }
  }
}
</script>
