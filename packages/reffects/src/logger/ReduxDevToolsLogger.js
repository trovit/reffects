export default () => {
    const devTools = window.__REDUX_DEVTOOLS_EXTENSION__.connect({});
    devTools.init({});
    
    return {
        logEvent({ id, payload }) {
            devTools.send({
                type: `EVENT - ${id}`,
                id,
                payload
            }, window['__REFFECTS_DEV_TOOLS__'].getState());
        },
        logCoeffect({ id, data }, value) {
            devTools.send({
                type: `COEFFECT - ${id}`,
                id,
                data,
                value
            }, window['__REFFECTS_DEV_TOOLS__'].getState());
        },
        logEffect(id, data) {
            devTools.send({
                type: `EFFECT - ${id}`,
                id,
                data,
            }, window['__REFFECTS_DEV_TOOLS__'].getState());
        }
    }
}
