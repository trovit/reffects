export default () => ({
    logEvent({ id, payload }) {
        console.groupCollapsed(`Dispatching event: ${id}`);
        console.info('EventId:', id);
        if (!payload) {
            console.info('Payload:', `The ${id} event has no payload.`);
        } else {
            console.info('Payload:', payload);
        }
        console.groupEnd();
    },
    logCoeffect({ id, data }, value) {
        console.groupCollapsed(`Extracting values of coeffect: ${id}`);
        console.info('Coeffect id:', id);
        if (!data) {
            console.info('Coeffect data:', `The ${id} coeffect needs no data`);
        } else {
            console.info('Coeffect data:', data);
        }
        console.info('Extracted value:', value);
        console.groupEnd();
    },
    logEffect(effectId, effectData) {
        console.groupCollapsed(`Applying effect: ${effectId}`);
        console.info('Effect id:', effectId);
        if (!effectData) {
            console.info('Effect data:', `The ${effectId} effect needs no data`);
        } else {
            console.info('Effect data:', effectData);
        }
        console.groupEnd();
    }
});