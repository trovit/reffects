// Type definitions for reffects
// Project: reffects
// Definitions by: Gabriele Lippi - https://www.github.com/glippi
interface Event {
    id: string;
    payload?: object;
}

interface Effect {
    id: string;
    data: object;
}

interface Coeffect{
    id: string;
    data?: object;
}

type EventHandler = (coeffect?: Coeffect, payload?: object) => Effect;

type EffectHandler = Function;

type CoeffectHandler = Function;

export function dispatch(event: Event): void;
export function dispatchMany(events: Event[]): void;
export function dispatchLater(event: Event): void;
export function registerEventHandler(eventId: string, handler: EventHandler, coeffectDescriptions?: string[]): void;
export function registerCoeffectHandler(coeffectId: string, handler: CoeffectHandler): void;
export function registerEffectHandler(effectId: string, handler: EffectHandler): void;
export function registerEventsDelegation(originalEvents: string[], targetEvent: string): void;
export function coeffect(id: string, data?: object): Coeffect;
export function getEffectHandler(effectId: string): EffectHandler; 
export function getCoeffectHandler(coeffectId: string): CoeffectHandler;
export function getEventHandler(eventId: string): EventHandler;
