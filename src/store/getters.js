import clinic from './modules/clinic'

const getters = {
    token: state => state.user.token,
    user: state => state.user.user,
    routeParameter: state => state.clinic.routeParameter,
    clinicId: state => state.clinic.clinicId,
    clinicInfo: state => state.clinic.clinicInfo
}
export default getters
