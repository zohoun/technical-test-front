<template>
  <div>
    <BaseInput v-model="searchText" @keydown.enter="search" />
    <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-md w-full space-y-8">
        <div>
          <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {{ $route.query.id ? "Edit a task" : "Add a task" }}
          </h2>
        </div>
        <div class="rounded bg-white max-w-md rounded overflow-hidden shadow-xl p-5">
          <form class="space-y-4" action="#" method="POST">
            <input type="hidden" name="remember" value="True">
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
                  <label for="date" class="block text-sm font-medium text-gray-700">Date</label>
                  <input id="date" type="date" name="date" autocomplete="given-name" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
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
                  <button type="submit" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" @click="submitTask">
                    <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                      <!-- Heroicon name: solid/lock-closed -->
                      <svg class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="True">
                        <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
                      </svg>
                    </span>
                    Submit
                  </button>
                </div>

                <div class="col-span-12">
                  <button class="group relative w-full flex justify-center py-2 px-4 border border-white text-sm font-medium rounded-md text-indigo bg-white-600 hover:bg-white-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white-500" @click="$router.push('/')">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import InputSimple from '~/components/form/input.vue'
import InputTextArea from '~/components/form/InputTextArea.vue'
import SelectComponent from '~/components/form/Select.vue'
import { TASK_STATUS } from '~/dewib/api/tasks/index.js'
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
      options: TASK_STATUS,
      optionSelected: {
        label: 'Choose a status',
        value: 'Choose a status'
      },
      status: this.$route.query.id ? this.$route.query.status : 'Choose a status'
    }
  },
  methods: {
    submitTask () {
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
    }
  }
}
</script>
