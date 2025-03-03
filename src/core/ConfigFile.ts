import type { Theme } from 'src/theme/layoutTheme'
import type { IJsonModel } from 'flexlayout-react'

import { JsonFile } from './JsonFile'
import { asAbsolutePath } from 'src/utils/fs/pathUtils'
import { resolve } from 'pathe'
import { CardPath } from 'src/library/CardPath'

export type ConfigFile = {
    /** this will allow you to enable typechecking for folders you manage */
    githubUsername?: string
    /** e.g.
     * - true
     *   => will use https:// for POST requests
     *   => will use wss:// for websocket connections
     * - false
     *   => will use http:// for POST requests
     *   => will use ws:// for websocket connections
     * */
    useHttps: boolean
    /** e.g.
     * @example localhost
     * @example 192.168.0.19
     * */
    comfyHost: string
    /** e.g.
     * @example 8188
     * */
    comfyPort: number
    favoriteActions?: CardPath[]
    /** list of all comfyUI setup available */
    machines?: {
        /** e.g.
         * @example localhost
         * @example 192.168.0.19
         * */
        comfyHost: string
        /** e.g.
         * @example 8188
         * */
        comfyPort: number
    }[]
    /** 'light' or 'dark'; default to dark */
    theme?: Theme
    /** defaults to 48px */
    galleryImageSize?: number
    /** defaults to 50 */
    galleryMaxImages?: number
    /** defaults to 50 */
    galleryBgColor?: string
    /** defaults to 5 */
    checkUpdateEveryMinutes?: number
    layouts?: { [perspectiveName: string]: IJsonModel }
    // bad place to store that
    stars?: { [actionPackName: string]: { at: Timestamp; stars: number } }
    packs?: { [actionPackName: string]: { installed: boolean } }
}

export const mkConfigFile = (): JsonFile<ConfigFile> => {
    return new JsonFile<ConfigFile>({
        path: asAbsolutePath(resolve('CONFIG.json')),
        maxLevel: 3,
        init: (): ConfigFile => ({
            comfyHost: 'localhost',
            comfyPort: 8188,
            useHttps: false,
            galleryImageSize: 48,
            theme: 'dark',
        }),
    })
}
