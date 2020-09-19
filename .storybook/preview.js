export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
}
import { library } from '@fortawesome/fontawesome-svg-core'
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

library.add(faEdit, faTrashAlt)
