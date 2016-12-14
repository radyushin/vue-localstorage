export function install (Vue) {
    this.super()

    Vue.mixin({
        beforeCreate () {
            console.log(this.$localStorage.test())
        }
    })
}