

const isLocalHost = location.hostname === 'localhost' || location.hostname === '127.0.0.1'
window.APP_CONFIG = {
    weatherProxyEndPoint: isLocalHost
    ? 'http://192.168.4.237:8077/'
    : {}
}