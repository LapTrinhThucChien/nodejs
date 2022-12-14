function customOrderSort (order) {
    const orderCustom = (order ? Object.keys(order) : []).map(key => {
        return [ `${key}`, `${order[`${key}`]}`]
    })
    return orderCustom;
}

module.exports = customOrderSort