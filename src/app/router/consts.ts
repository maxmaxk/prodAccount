const PlantReport = () => import('@/pages/plantReport.vue')
const Log = () => import('@/pages/log.vue')
const Reports = () => import('@/pages/reports.vue')
const RegistrarsReport = () => import('@/pages/registrarsReport.vue')
const Users = () => import('@/pages/users.vue')
const Workshops = () => import('@/pages/workshops.vue')
const MachineTypes = () => import('@/pages/machineTypes.vue')
const MachineTypeComments = () => import('@/pages/machineTypeComments.vue')
const Registrars = () => import('@/pages/registrars.vue')
const Shifts = () => import('@/pages/shifts.vue')
const Items = () => import('@/pages/items.vue')
const Reasons = () => import('@/pages/reasons.vue')
const Settings = () => import('@/pages/settings.vue')
import UserStatus from '@/pages/userStatus.vue'
import NotFound from '@/pages/notFound.vue'
import RegistrarStatus from '@/pages/registrarStatus.vue'

// prettier-ignore
export const routes = [
  { path: '/:pathMatch(.*)*', name: 'notFound', component: NotFound },
  { path: '/', name: 'home', component: RegistrarsReport },
  { path: '/plant-report', name: 'plantReport', component: PlantReport },
  { path: '/registrars-report', name: 'registrarsReport', component: RegistrarsReport },
  { path: '/log', name: 'log', component: Log },
  { path: '/reports', name: 'reports', component: Reports },
  { path: '/users', name: 'users', component: Users },
  { path: '/user/:id', name: 'userStatus', component: UserStatus },
  { path: '/workshops', name: 'workshops', component: Workshops },
  { path: '/machine-types', name: 'machineTypes', component: MachineTypes },
  { path: '/machine-type-comments/:machineTypeId', name: 'machineTypeComments', component: MachineTypeComments },
  { path: '/registrars', name: 'registrars', component: Registrars },
  { path: '/registrar/:id', name: 'registrarStatus', component: RegistrarStatus },
  { path: '/shifts', name: 'shifts', component: Shifts },
  { path: '/reasons', name: 'reasons', component: Reasons },
  { path: '/settings', name: 'settings', component: Settings },
  { path: '/items', name: 'items', component:Items }
]
