import Cookies from 'js-cookie'

const Types = {
    clinicId: 'clinicId',
    routeParameter: 'routeParameter'
}

export function getClinicId() {
    return Cookies.get(Types.clinicId)
}

export function setClinicId(clinicId) {
    return Cookies.set(Types.clinicId, clinicId)
}

export function removeClinicId() {
    return Cookies.remove(Types.clinicId)
}

export function getRouteParameter() {
    return Cookies.get(Types.routeParameter)
}
export function setRouteParameter(routeParameter) {
    return Cookies.set(Types.routeParameter, routeParameter)
}
export function removeRouteParameter() {
    return Cookies.remove(Types.routeParameter)
}
