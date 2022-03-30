<template>
  <div class="m-10">
    <div class="container">
      <div class="container mx-auto h-20 flex justify-between items-center">
        <h2>My tasks</h2>
        <select id="" v-model="optionSelectionee" name="" class="text-right" @change="selectChange">
          <option v-for="option in optionsOfFiltering" :key="option.value" class="text-left" :value="option.value">
            {{ option.label }}
          </option>
        </select>
      </div>
      <hr>
    </div>

    <div class="container mx-auto px-20">
      <div style="background-color:rgb(255, 255, 255)">
        <div v-for="task in tasks" :key="task.id" class="bg-white rounded p-4 shadow md:flex justify-between" data-v-648b5d7b="" style="cursor: auto;">
          <div data-v-648b5d7b="">
            <div class="space-y-4 lg:grid lg:grid-cols-3 lg:items-start lg:gap-6 lg:space-y-0" style="cursor: auto;">
              <div class="sm:col-span-2" style="cursor: auto;">
                <div class="flex items-center space-x-3" style="cursor: auto;">
                  <div class="flex items-center space-x-2" style="cursor: auto;">
                    <span :class="[{ 'bg-green-400': task.status.label==='Done', 'bg-red-400': task.status.label != 'Done' },'bg-sky-400', 'inline-flex', 'items-center', 'leading-none', 'px-2.5', 'py-1.5', 'text-sm', 'font-medium', 'text-skin-inverted', 'rounded-full', 'border', 'border-skin-input']" style="cursor: auto;">
                      {{ task.status.label }}
                    </span>
                    <h4 class="text-indigo-600 text-lg leading-6 font-semibold font-sans text-skin-inverted group-hover:text-skin-primary" style="cursor: auto;">
                      {{ task.title }}
                    </h4>
                  </div>
                </div>

                <div class="mt-2" style="cursor: auto;">
                  <p class="mt-1 text-sm font-normal text-skin-base leading-5" style="cursor: auto;">
                    {{ task.description }}
                  </p>

                  <div class="mt-3 flex items-center font-sans" style="cursor: auto;">
                    <div class="ml-3">
                      <div class="flex space-x-1 text-sm text-skin-muted" style="cursor: auto;">
                        <time datetime="2022-02-01" style="cursor: auto;">Create at {{ convertToLongDateFormat(task.createdAt) }}</time>

                        <span style="cursor: auto;" class="text-sm font-medium text-skin-inverted"> Updated at{{ convertToLongDateFormat(task.updatedAt) }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="text-right md:ml-8 flex items-center" data-v-648b5d7b="">
            <div class="flex md:block -mx-2 md:mx-0 mt-3 md:mt-0" data-v-648b5d7b="">
              <div class="flex justify-end items-bottom mb-1 px-2 md:px-0" data-v-648b5d7b="">
                <button class="btn btn-sm purple-bg">
                  <i class="fas fa-edit" />
                  <nuxt-link :to="{path :'form',query:{id:task.id,title:task.title,description:task.description, status:task.status.value,date:task.date}}">
                    <SvgIcon name="icons/pencil" class="p-1 w-5 h-5 bg-indigo-600 text-white rounded" />
                  </nuxt-link>
                </button>
                <button class="btn btn-sm bg-danger" @click="deleteTask(task.id)">
                  <SvgIcon name="icons/trash" class="p-1 w-5 h-5 bg-red-600 text-white rounded" />
                </button>
              </div>
              <div class="flex justify-end px-2 md:px-0" data-v-648b5d7b="">
                <SvgIcon v-if="task.date" name="icons/calendar" class="p-1 w-7 h-7 bg-white-600 text-grey-400 rounded" />
                <p class="text-secondary">
                  <span> {{ task.date? convertToshortDateFormat(task.date) : "" }}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <pre>{{ tasks }}</pre> -->
  </div>
</template>

<script>
import { TASK_STATUS } from '~/dewib/api/tasks/index.js'
export default {
  async asyncData ({ $api, error }) {
    const [err, tasks] = await $api.tasks.findAll()

    if (err) {
      return error({
        statusCode: 404,
        message: err
      })
    }

    return {
      tasks
    }
  },
  data () {
    return {
      monthNames: ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ],
      optionsOfFiltering: TASK_STATUS,
      optionSelectionee: {},
      allTask: []
    }
  },
  methods: {
    convertToLongDateFormat (date) {
      return this.convertToshortDateFormat(date) + ' - ' + new Date(date).toLocaleTimeString()
    },
    convertToshortDateFormat (date) {
      return this.monthNames[(new Date(date)).getMonth()] + ' ' + new Date(date).getDate() + ', ' + new Date(date).getFullYear()
    },
    async deleteTask (id) {
      const isExecuted = confirm('Voulez-vous supprimer la tache ?')
      if (isExecuted) {
        this.$api.tasks.deleteTask(id)
        const [err, tasks] = await this.$api.tasks.findAll()

        if (err) {
          return this.error({
            statusCode: 404,
            message: err
          })
        }

        this.tasks = tasks
      }
    },
    selectChange () {
      if (this.allTask.length === 0) {
        this.allTask = this.tasks
      }
      if (this.optionSelectionee === 'ALL') {
        console.log(this.optionSelectionee)
        this.tasks = this.allTask
      } else if (this.optionSelectionee) {
        this.tasks = this.allTask.filter(word => word.status.value === this.optionSelectionee)
      }
    }
  }
}
</script>
