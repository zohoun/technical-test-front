<template>
  <div>
    <BaseInput v-model="searchText" @keydown.enter="search" />
    <div
      class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
    >
      <div class="max-w-md w-full space-y-8">
        <div>
          <SvgIcon name="icons/plus-circle" class="mx-auto h-12 w-auto bg-white-600 text-black rounded" />

          <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {{ $route.query.id ? "Edit a task" : "Add a task" }}
          </h2>
        </div>
        <div class="rounded bg-white max-w-md rounded overflow-hidden shadow-xl p-5">
          <div class="rounded-md shadow-sm -space-y-px">
            <div class="grid gap-6">
              <div class="col-span-12">
                <InputSimple
                  label="Titre"
                  name="title"
                  :value="title"
                  type="text"
                  @input="title = $event"
                />
              </div>

              <div class="col-span-12">
                <InputTextArea
                  label="Description"
                  name="description"
                  :value="description"
                  type="text"
                  @input="description = $event"
                />
              </div>

              <div class="col-span-6">
                <label
                  for="date"
                  class="block text-sm font-medium text-gray-700"
                >Date</label>
                <input
                  id="date"
                  v-model="date"
                  type="text"
                  name="date"
                  autocomplete="given-name"
                  class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                >
              </div>

              <div class="col-span-6">
                <SelectComponent
                  label="Status"
                  name="status"
                  :value="status"
                  :options="options"
                  @input="status = $event"
                />
              </div>
              <div class="col-span-12">
                <button
                  class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  @click="submitTask"
                >
                  Submit
                </button>
              </div>

              <div class="col-span-12">
                <button
                  class="group relative w-full flex justify-center py-2 px-4 border border-white text-sm font-medium rounded-md text-indigo bg-white-600 hover:bg-white-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white-500"
                  @click="$router.push('/')"
                >
                  <nuxt-link to="/form">
                    Cancel
                  </nuxt-link>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import InputSimple from '~/components/form/input.vue'
import InputTextArea from '~/components/form/InputTextArea.vue'
import SelectComponent from '~/components/form/Select.vue'
export default {
  components: {
    InputSimple,
    InputTextArea,
    SelectComponent
  },
  data () {
    return {
      title: this.$route.query.id ? this.$route.query.title : '',
      description: this.$route.query.id ? this.$route.query.description : '',
      date: this.$route.query.id ? this.$route.query.date : '',
      options: [{
        label: 'ToDo',
        value: 'TODO'
      }, {
        label: 'Done',
        value: 'DONE'
      }],
      optionSelected: {
        label: 'Choose a status',
        value: 'Choose a status'
      },
      status: this.$route.query.id ? this.$route.query.status : 'Choose a status'
    }
  },
  methods: {
    submitTask () {
      try {
        const data = {
          title: this.title,
          description: this.description,
          date: this.date,
          status: this.status
        }
        if (this.$route.query.id) {
          this.$api.tasks.updateTask(this.$route.query.id, data)
        } else {
          this.$api.tasks.createTask(data)
        }
        alert('Enregistrement réussi!')
        this.title = ''
        this.description = ''
        this.date = ''
        this.statuse = ''
      } catch (error) {
        alert('Enregistrement Echoué!')
      }
    }
  }
}
</script>
