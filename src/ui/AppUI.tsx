import { observer } from 'mobx-react-lite'
import { useMemo } from 'react'

import { AppLayoutUI } from './AppLayoutUI'
import { stContext } from './stContext'
import { ComfyClient } from '../core/ComfyClient'
import { ToastContainer } from 'react-toastify'
import { ensureMonacoReady } from './Monaco'
import { FluentProvider, webDarkTheme } from '@fluentui/react-components'
import { GithubCorner } from './GithubCorner'

export const AppUI = observer(function AppUI_() {
    const monaco = ensureMonacoReady()
    const client = useMemo(() => {
        if (monaco == null) return null
        return new ComfyClient({
            serverIP: 'localhost',
            serverPort: 8188,
            spec: {},
        })
    }, [monaco])

    if (monaco == null) return <div>loading monaco</div>

    // if (backend.client)
    return (
        <FluentProvider theme={webDarkTheme}>
            <stContext.Provider value={client}>
                <GithubCorner />
                <ToastContainer />
                <AppLayoutUI />
            </stContext.Provider>
        </FluentProvider>
    )
})
