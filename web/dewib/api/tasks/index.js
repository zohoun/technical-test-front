import ApiModel from '../model'

export const TASK_STATUS = [{
  label: 'All',
  value: 'ALL'
}, {
  label: 'ToDo',
  value: 'TODO'
}, {
  label: 'Done',
  value: 'DONE'
}]

export const TASKS_FIELDS = ['id', 'title', 'description', 'createdAt', 'updatedAt', {
  key: 'status',
  mapping ({ model }) {
    return TASK_STATUS.find(s => s.value === model.status)
  }
}, {
  key: 'to',
  mapping ({ model }) {
    return { name: 'id', params: { id: model.id } }
  }
}, {
  key: 'date',
  mapping ({ model }) {
    // Convert for input type `datetime-local`
    if (model.date) { return new Date(model.date).toISOString().replace('Z', '') }
  }
}, {
  key: 'dateLabel',
  mapping ({ model }) {
    // Date label to be formated according to mock up
    if (model.date) {
      return new Date(model.date)
    }
  }
}, {
  key: 'createdAtLabel',
  mapping ({ model }) {
    // createdAt label to be formated according to mock up
    return new Date(model.createdAt)
  }
}, {
  key: 'updatedAtLabel',
  mapping ({ model }) {
    // updatedAt label to be formated according to mock up
    return new Date(model.updatedAt)
  }
}]

const TASK_FIELDS = TASKS_FIELDS

export default class TasksService extends ApiModel {
  /**
   * Get all tasks
   *
   * @param {*} [{ status }={}]
   * @returns Task[]
   */
  findAll ({ status } = {}) {
    return this.get('', {
      fields: TASKS_FIELDS,
      queryParams: {
        status
      },
      multi: true
    })
  }

  /**
   * Find one task
   *
   * @param {*} id
   * @returns Task
   */
  findOne (id) {
    return this.get(`${id}`, {
      fields: TASK_FIELDS
    })
  }

  /**
   * Create a task ?
   *
   * @param {*} form
   * @returns Task
   */
  // this.post(url, body, { fields: TASK_FIELDS })

  /**
   * Update a task ?
   *
   * @param {*} id
   * @param {*} form
   * @returns
   */
  // this.patch(url, body, { fields: TASK_FIELDS })

  /**
   * Remove a task ?
   *
   * @param {*} id
   * @returns
   */
  // this.delete(url)
}
