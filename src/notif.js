
const notif = {
    error(msg) {
        return {
            position: 'top-right',
            message: msg,
            color: 'red-5',
            icon: 'error',
            timeout: 1000,
            actions: [{ icon: 'close', color: 'white' }]
        }
    },
    success(msg) {
        return {
            position: 'top-right',
            message: msg,
            color: 'green-5',
            icon: 'check',
            timeout: 1000,
            actions: [{ icon: 'close', color: 'white' }]
        }
    }
}
export default notif