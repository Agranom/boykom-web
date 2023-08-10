export class StringUtils {
    static urlBase64ToUint8Array(base64String: string | undefined): Uint8Array | null {
        if (!base64String) {
            return null;
        }
        const padding = "=".repeat((4 - base64String.length % 4) % 4)
        // eslint-disable-next-line
        const base64 = (base64String + padding).replace(/\-/g, "+").replace(/_/g, "/")

        const rawData = window.atob(base64)
        const outputArray = new Uint8Array(rawData.length)

        for (let i = 0; i < rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i)
        }
        return outputArray
    }
}
